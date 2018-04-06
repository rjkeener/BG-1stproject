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
class Hook_preview_video
{
    /**
     * Find whether this preview hook applies.
     *
     * @return array Triplet: Whether it applies, the attachment ID type, whether the forum DB is used [optional]
     */
    public function applies()
    {
        $applies = (get_page_name() == 'cms_galleries') && ((get_param_string('type', '') == 'add_other') || (get_param_string('type', '') == '_edit_other'));
        return array($applies, null, false);
    }

    /**
     * Run function for preview hooks.
     *
     * @return array A pair: The preview, the updated post Comcode
     */
    public function run()
    {
        require_code('uploads');
        require_code('galleries');
        require_code('galleries2');

        $cat = post_param_string('cat');

        require_code(_get_module_path(get_module_zone('cms_galleries'), 'cms_galleries'));
        if (class_exists('Mx_' . filter_naughty_harsh('cms_galleries'))) {
            $object = object_factory('Mx_' . filter_naughty_harsh('cms_galleries'));
        } else {
            $object = object_factory('Module_' . filter_naughty_harsh('cms_galleries'));
        }
        $object->alt_crud_module = class_exists('Mx_cms_galleries_alt') ? new Mx_cms_galleries_alt() : new Module_cms_galleries_alt();
        list($width, $height, $length) = $object->alt_crud_module->get_special_video_info();

        $filename = '';
        $thumb_url = '';
        $url = post_param_multi_source_upload('video', 'uploads/auto_thumbs', false, false, $filename, $thumb_url);

        $preview = show_gallery_video_media($url, $thumb_url, $width, $height, $length, get_member());

        return array($preview, null);
    }
}