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
 * @package    core_feedback_features
 */

/**
 * Hook class.
 */
class Hook_notification_comment_posted extends Hook_Notification
{
    /**
     * Find whether a handled notification code supports categories.
     * (Content types, for example, will define notifications on specific categories, not just in general. The categories are interpreted by the hook and may be complex. E.g. it might be like a regexp match, or like FORUM:3 or TOPIC:100)
     *
     * @param  ID_TEXT $notification_code Notification code
     * @return boolean Whether it does
     */
    public function supports_categories($notification_code)
    {
        return true;
    }

    /**
     * Standard function to create the standardised category tree
     *
     * @param  ID_TEXT $notification_code Notification code
     * @param  ?ID_TEXT $id The ID of where we're looking under (null: N/A)
     * @return array Tree structure
     */
    public function create_category_tree($notification_code, $id)
    {
        $categories = parent::create_category_tree($notification_code, $id);

        $notification_category = get_param_string('id', null);
        if (!is_null($notification_category)) {
            $found = false;
            foreach ($categories as $i => $c) {
                if ($c['id'] == $notification_category) {
                    $found = true;
                }
            }
            if (!$found) {
                $categories[] = array('id' => $notification_category, 'title' => do_lang('UNKNOWN'));
            }
        }

        // See if we can get better titles
        require_code('feedback');
        $num_done = 0;
        foreach ($categories as $i => $c) {
            $matches = array();
            if (preg_match('#^([^\_]*)\_(.*)$#', preg_replace('#^catalogues__[' . URL_CONTENT_REGEXP . ']+_#', 'catalogues_', $c['id']), $matches) != 0) {
                $details = get_details_behind_feedback_code($matches[1], $matches[2]);
                $new_title = $details[0];
                if ((!is_null($new_title)) && ($new_title != '')) {
                    $categories[$i]['title'] = $new_title;
                    $num_done++;
                    if ($num_done > 200) { // Reasonable limit
                        unset($categories[$i]);
                    }
                } else {
                    unset($categories[$i]);
                }
            }
        }
        sort_maps_by($categories, 'title');

        return $categories;
    }

    /**
     * Find the initial setting that members have for a notification code (only applies to the member_could_potentially_enable members).
     *
     * @param  ID_TEXT $notification_code Notification code
     * @param  ?SHORT_TEXT $category The category within the notification code (null: none)
     * @return integer Initial setting
     */
    public function get_initial_setting($notification_code, $category = null)
    {
        return A_NA;
    }

    /**
     * Find the setting that members have for a notification code if they have done some action triggering automatic setting (e.g. posted within a topic).
     *
     * @param  ID_TEXT $notification_code Notification code
     * @param  ?SHORT_TEXT $category The category within the notification code (null: none)
     * @return integer Automatic setting
     */
    public function get_default_auto_setting($notification_code, $category = null)
    {
        return A__STATISTICAL;
    }

    /**
     * Get a list of all the notification codes this hook can handle.
     * (Addons can define hooks that handle whole sets of codes, so hooks are written so they can take wide authority)
     *
     * @return array List of codes (mapping between code names, and a pair: section and labelling for those codes)
     */
    public function list_handled_codes()
    {
        $list = array();
        $list['comment_posted'] = array(do_lang('MESSAGES'), do_lang('NOTIFICATION_TYPE_comment_posted'));
        return $list;
    }

    /**
     * Get a list of members who have enabled this notification (i.e. have permission to AND have chosen to or are defaulted to).
     *
     * @param  ID_TEXT $notification_code Notification code
     * @param  ?SHORT_TEXT $category The category within the notification code (null: none)
     * @param  ?array $to_member_ids List of member IDs we are restricting to (null: no restriction). This effectively works as a intersection set operator against those who have enabled.
     * @param  integer $start Start position (for pagination)
     * @param  integer $max Maximum (for pagination)
     * @return array A pair: Map of members to their notification setting, and whether there may be more
     */
    public function list_members_who_have_enabled($notification_code, $category = null, $to_member_ids = null, $start = 0, $max = 300)
    {
        list($_members, $maybe_more) = $this->_all_members_who_have_enabled($notification_code, $category, $to_member_ids, $start, $max);
        if (!is_null($category)) { // Check permissions for content
            $matches = array();
            if (preg_match('#^catalogues\_\_(.*)\_(\d+)$#', $category, $matches) != 0) {
                list($type_id, $id) = array($matches[1], $matches[2]);
            } else {
                list($type_id, $id) = explode('_', $category, 2);
            }
            $members = array();
            foreach ($_members as $member => $setting) {
                require_code('content');
                if (may_view_content_behind($member, $type_id, $id, 'feedback_type_code')) {
                    $members[$member] = $setting;
                }
            }
        } else {
            $members = $_members;
        }

        return array($members, $maybe_more);
    }
}