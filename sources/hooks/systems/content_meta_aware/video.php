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
 * @package    galleries
 */

/**
 * Hook class.
 */
class Hook_content_meta_aware_video
{
    /**
     * Get content type details. Provides information to allow task reporting, randomisation, and add-screen linking, to function.
     *
     * @param  ?ID_TEXT $zone The zone to link through to (null: autodetect).
     * @return ?array Map of award content-type info (null: disabled).
     */
    public function info($zone = null)
    {
        return array(
            'support_custom_fields' => true,

            'content_type_label' => 'global:VIDEO',
            'content_type_universal_label' => 'Video',

            'connection' => $GLOBALS['SITE_DB'],
            'where' => 'cat NOT LIKE \'' . db_encode_like('download\_%') . '\'',
            'table' => 'videos',
            'id_field' => 'id',
            'id_field_numeric' => true,
            'parent_category_field' => 'cat',
            'parent_category_meta_aware_type' => 'gallery',
            'is_category' => false,
            'is_entry' => true,
            'category_field' => 'cat', // For category permissions
            'category_type' => 'galleries', // For category permissions
            'parent_spec__table_name' => 'galleries',
            'parent_spec__parent_name' => 'parent_id',
            'parent_spec__field_name' => 'name',
            'category_is_string' => true,

            'title_field' => 'title',
            'title_field_dereference' => true,
            'description_field' => 'description',
            'thumb_field' => 'thumb_url',
            'thumb_field_is_theme_image' => false,
            'alternate_icon_theme_image' => null,

            'view_page_link_pattern' => '_SEARCH:galleries:video:_WILD',
            'edit_page_link_pattern' => '_SEARCH:cms_galleries:_edit_other:_WILD',
            'view_category_page_link_pattern' => '_SEARCH:galleries:browse:_WILD',
            'add_url' => (function_exists('has_submit_permission') && has_submit_permission('mid', get_member(), get_ip_address(), 'cms_galleries')) ? (get_module_zone('cms_galleries') . ':cms_galleries:add_other') : null,
            'archive_url' => ((!is_null($zone)) ? $zone : get_module_zone('galleries')) . ':galleries',

            'support_url_monikers' => true,

            'views_field' => 'video_views',
            'order_field' => null,
            'submitter_field' => 'submitter',
            'author_field' => null,
            'add_time_field' => 'add_date',
            'edit_time_field' => 'edit_date',
            'date_field' => 'add_date',
            'validated_field' => 'validated',

            'seo_type_code' => 'video',

            'feedback_type_code' => 'videos',

            'permissions_type_code' => 'galleries', // null if has no permissions

            'search_hook' => 'videos',
            'rss_hook' => 'galleries',
            'attachment_hook' => null,
            'unvalidated_hook' => 'videos',
            'notification_hook' => 'gallery_entry',
            'sitemap_hook' => 'video',

            'addon_name' => 'galleries',

            'cms_page' => 'cms_galleries',
            'module' => 'galleries',

            'commandr_filesystem_hook' => 'galleries',
            'commandr_filesystem__is_folder' => false,

            'support_revisions' => false,

            'support_privacy' => true,

            'support_content_reviews' => true,

            'actionlog_regexp' => '\w+_VIDEO',
        );
    }

    /**
     * Run function for content hooks. Renders a content box for an award/randomisation.
     *
     * @param  array $row The database row for the content
     * @param  ID_TEXT $zone The zone to display in
     * @param  boolean $give_context Whether to include context (i.e. say WHAT this is, not just show the actual content)
     * @param  boolean $include_breadcrumbs Whether to include breadcrumbs (if there are any)
     * @param  ?ID_TEXT $root Virtual root to use (null: none)
     * @param  boolean $attach_to_url_filter Whether to copy through any filter parameters in the URL, under the basis that they are associated with what this box is browsing
     * @param  ID_TEXT $guid Overridden GUID to send to templates (blank: none)
     * @return Tempcode Results
     */
    public function run($row, $zone, $give_context = true, $include_breadcrumbs = true, $root = null, $attach_to_url_filter = false, $guid = '')
    {
        require_code('galleries');

        return render_video_box($row, $zone, $give_context, $include_breadcrumbs, is_null($root) ? null : $root, $guid);
    }
}
