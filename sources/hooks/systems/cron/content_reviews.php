<?php /*

 Composr
 Copyright (c) ocProducts, 2004-2016

 See text/EN/licence.txt for full licencing information.


 NOTE TO PROGRAMMERS:
   Do not edit this file. If you need to make changes, save your changed file to the appropriate *_custom folder
   **** If you ignore this advice, then your website upgrades (e.g. for bug fixes) will likely kill your changes ****

*/

/**
 * @license    http://opensource.org/licenses/cpal_1.0 Common Public Attribution License
 * @copyright  ocProducts Ltd
 * @package    content_reviews
 */

/**
 * Hook class.
 */
class Hook_cron_content_reviews
{
    /**
     * Run function for CRON hooks. Searches for tasks to perform.
     */
    public function run()
    {
        if (!addon_installed('content_reviews')) {
            return;
        }

        $query = 'SELECT * FROM ' . get_table_prefix() . 'content_reviews WHERE review_notification_happened=0 AND next_review_time<=' . strval(time());
        $pending_content_reviews = $GLOBALS['SITE_DB']->query($query);
        foreach ($pending_content_reviews as $pending_content_review) {
            $content_type = $pending_content_review['content_type'];
            $content_id = $pending_content_review['content_id'];

            // Mark as handled
            $GLOBALS['SITE_DB']->query_update('content_reviews', array('review_notification_happened' => 1), array('content_type' => $content_type, 'content_id' => $content_id), '', 1);

            require_code('content');

            require_lang('content_reviews');

            $auto_action = $pending_content_review['auto_action'];

            // Get title / check not deleted, cleanup if is
            list($title, $submitter) = content_get_details($content_type, $content_id);
            if (is_null($title)) {
                $GLOBALS['SITE_DB']->query_delete('content_reviews', array('content_type' => $content_type, 'content_id' => $content_id), '', 1); // The actual content was deleted, I guess
                continue;
            }

            // Prepare notification
            if ((!file_exists(get_file_base() . '/sources/hooks/systems/content_meta_aware/' . filter_naughty_harsh($content_type) . '.php')) && (!file_exists(get_file_base() . '/sources_custom/hooks/systems/content_meta_aware/' . filter_naughty_harsh($content_type) . '.php'))) {
                continue; // Weird :S
            }
            require_code('content');
            $object = get_content_object($content_type);
            if (is_null($object)) {
                continue; // Weird :S
            }
            $info = $object->info();
            $auto_action_str = do_lang('CONTENT_REVIEW_AUTO_ACTION_' . $auto_action);
            list($zone, $attributes,) = page_link_decode($info['edit_page_link_pattern']);
            foreach ($attributes as $key => $val) {
                if ($val == '_WILD') {
                    $attributes[$key] = $content_id;
                }
            }
            $edit_url = build_url($attributes + array('validated' => 1), $zone, null, false, false, true);
            require_code('notifications');
            $subject = do_lang('NOTIFICATION_SUBJECT_CONTENT_REVIEWS' . (($auto_action == 'delete') ? '_delete' : ''), $title, $auto_action_str);
            $message = do_notification_lang('NOTIFICATION_BODY_CONTENT_REVIEWS' . (($auto_action == 'delete') ? '_delete' : ''), $title, $auto_action_str, $edit_url->evaluate());

            // Do auto-action
            switch ($auto_action) {
                case 'unvalidate':
                    if (!is_null($info['validated_field'])) {
                        $info['connection']->query_update($info['table'], array($info['validated_field'] => 0), get_content_where_for_str_id($content_id, $info), '', 1);
                    }
                    break;

                case 'delete':
                    require_code('resource_fs');
                    $object_fs = get_resource_commandr_fs_object($content_type);
                    if (!is_null($object_fs)) {
                        $filename = $object_fs->convert_id_to_filename($content_type, $content_id);
                        if (!is_null($filename)) {
                            $subpath = $object_fs->search($content_type, $content_id, true);
                            $object_fs->resource_delete($content_type, $filename, dirname($subpath));
                        }
                    }
                    break;

                case 'leave':
                    // Nothing to do
                    break;
            }

            // Dispatch notification
            dispatch_notification('content_reviews', $content_type, $subject, $message, null, null, 4, false);
            if ((!is_null($submitter)) && (!notifications_enabled('content_reviews', $content_type, $submitter))) {
                dispatch_notification('content_reviews__own', $content_type, $subject, $message, array($submitter), null, 4, false);
            }
        }
    }
}
