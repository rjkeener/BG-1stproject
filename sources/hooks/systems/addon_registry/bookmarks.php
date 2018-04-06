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
 * @package    bookmarks
 */

/**
 * Hook class.
 */
class Hook_addon_registry_bookmarks
{
    /**
     * Get a list of file permissions to set
     *
     * @param  boolean $runtime Whether to include wildcards represented runtime-created chmoddable files
     * @return array File permissions to set
     */
    public function get_chmod_array($runtime = false)
    {
        return array();
    }

    /**
     * Get the version of Composr this addon is for
     *
     * @return float Version number
     */
    public function get_version()
    {
        return cms_version_number();
    }

    /**
     * Get the description of the addon
     *
     * @return string Description of the addon
     */
    public function get_description()
    {
        return 'Allow members to bookmark screens of the website. As the bookmarks are tied to their member profile they can access them from any computer they can log in on.';
    }

    /**
     * Get a list of tutorials that apply to this addon
     *
     * @return array List of tutorials
     */
    public function get_applicable_tutorials()
    {
        return array(
            'tut_members',
        );
    }

    /**
     * Get a mapping of dependency types
     *
     * @return array File permissions to set
     */
    public function get_dependencies()
    {
        return array(
            'requires' => array(),
            'recommends' => array(),
            'conflicts_with' => array(),
        );
    }

    /**
     * Explicitly say which icon should be used
     *
     * @return URLPATH Icon
     */
    public function get_default_icon()
    {
        return 'themes/default/images/icons/48x48/menu/site_meta/bookmarks.png';
    }

    /**
     * Get a list of files that belong to this addon
     *
     * @return array List of files
     */
    public function get_file_list()
    {
        return array(
            'themes/default/images/icons/24x24/menu/site_meta/bookmarks.png',
            'themes/default/images/icons/48x48/menu/site_meta/bookmarks.png',
            'sources/bookmarks.php',
            'data/bookmarks.php',
            'sources/hooks/systems/addon_registry/bookmarks.php',
            'sources/hooks/modules/admin_import_types/bookmarks.php',
            'themes/default/templates/BOOKMARKS_SCREEN.tpl',
            'themes/default/javascript/bookmarks.js',
            'lang/EN/bookmarks.ini',
            'site/pages/modules/bookmarks.php',
            'themes/default/css/bookmarks.css',
            'sources/hooks/systems/sitemap/bookmarks.php',
            'sources/hooks/systems/page_groupings/bookmarks.php',
            'sources/hooks/systems/commandr_fs_extended_member/bookmarks.php',
        );
    }

    /**
     * Get mapping between template names and the method of this class that can render a preview of them
     *
     * @return array The mapping
     */
    public function tpl_previews()
    {
        return array(
            'templates/BOOKMARKS_SCREEN.tpl' => 'bookmarks_screen'
        );
    }

    /**
     * Get a preview(s) of a (group of) template(s), as a full standalone piece of HTML in Tempcode format.
     * Uses sources/lorem.php functions to place appropriate stock-text. Should not hard-code things, as the code is intended to be declaritive.
     * Assumptions: You can assume all Lang/CSS/JavaScript files in this addon have been pre-required.
     *
     * @return array Array of previews, each is Tempcode. Normally we have just one preview, but occasionally it is good to test templates are flexible (e.g. if they use IF_EMPTY, we can test with and without blank data).
     */
    public function tpl_preview__bookmarks_screen()
    {
        require_lang('zones');

        $bookmarks = array(
            array(
                'CAPTION' => lorem_word(),
                'ID' => placeholder_id(),
                'FOLDER' => lorem_word_2(),
                'PAGE_LINK' => placeholder_url(),
            )
        );

        return array(
            lorem_globalise(do_lorem_template('BOOKMARKS_SCREEN', array(
                'TITLE' => lorem_title(),
                'FORM_URL' => placeholder_url(),
                'FORM' => placeholder_form(),
                'BOOKMARKS' => $bookmarks,
            )), null, '', true)
        );
    }
}
