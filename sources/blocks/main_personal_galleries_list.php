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
 * Block class.
 */
class Block_main_personal_galleries_list
{
    /**
     * Find details of the block.
     *
     * @return ?array Map of block info (null: block is disabled).
     */
    public function info()
    {
        if (get_forum_type() != 'cns') {
            return null;
        }

        $info = array();
        $info['author'] = 'Chris Graham';
        $info['organisation'] = 'ocProducts';
        $info['hacked_by'] = null;
        $info['hack_version'] = null;
        $info['version'] = 2;
        $info['locked'] = false;
        $info['parameters'] = array('member_id', 'max', 'start');
        return $info;
    }

    /**
     * Execute the block.
     *
     * @param  array $map A map of parameters.
     * @return Tempcode The result of execution.
     */
    public function run($map)
    {
        $block_id = get_block_id($map);

        require_lang('galleries');

        $member_id = array_key_exists('member_id', $map) ? intval($map['member_id']) : get_member();
        $member_id_viewing = get_member();

        $max = get_param_integer($block_id . '_max', array_key_exists('max', $map) ? intval($map['max']) : 12);
        $start = get_param_integer($block_id . '_start', array_key_exists('start', $map) ? intval($map['start']) : 0);

        $text_id = do_lang_tempcode('GALLERIES');

        require_code('galleries');
        require_css('galleries');

        // Find galleries
        $galleries = new Tempcode();
        $query = ' FROM ' . get_table_prefix() . 'galleries';
        $query .= ' WHERE name LIKE \'' . db_encode_like('member\_' . strval($member_id) . '\_%') . '\'';// . ' OR g_owner=' . strval($member_id); g_owner may be set for boring stuff, so don't use for now
        $rows = $GLOBALS['SITE_DB']->query('SELECT *' . $query, $max, $start, false, true);
        $max_rows = $GLOBALS['SITE_DB']->query_value_if_there('SELECT COUNT(*)' . $query, false, true);

        // Render galleries
        foreach ($rows as $i => $row) {
            $galleries->attach(render_gallery_box($row, 'root', false, get_module_zone('galleries'), false, false, false, false, false, 'main_personal_galleries_list'));
            $this->attach_gallery_subgalleries($row['name'], $galleries, $member_id, $member_id_viewing);
        }

        // Management links
        $add_gallery_url = new Tempcode();
        $add_image_url = new Tempcode();
        $add_video_url = new Tempcode();
        if ($member_id == get_member()) {
            if (count($rows) == 0) { // No gallery yet, so create via implication
                $test = $GLOBALS['SITE_DB']->query_select('galleries', array('accept_images', 'accept_videos', 'name'), array('is_member_synched' => 1));
                if (array_key_exists(0, $test)) {
                    if ($test[0]['accept_images'] == 1) {
                        $add_image_url = build_url(array('page' => 'cms_galleries', 'type' => 'add', 'cat' => 'member_' . strval($member_id) . '_' . $test[0]['name']), get_module_zone('cms_galleries'));
                    }
                    if ($test[0]['accept_videos'] == 1) {
                        $add_video_url = build_url(array('page' => 'cms_galleries', 'type' => 'add_other', 'cat' => 'member_' . strval($member_id) . '_' . $test[0]['name']), get_module_zone('cms_galleries'));
                    }
                }
            } else { // Or invite them to explicitly add a gallery (they can add images/videos from their existing gallery now)
                if ((has_actual_page_access(null, 'cms_galleries', null, null)) && (has_submit_permission('cat_mid', get_member(), get_ip_address(), 'cms_galleries'))) {
                    $add_gallery_url = build_url(array('page' => 'cms_galleries', 'type' => 'add_category', 'parent_id' => $rows[0]['name']), get_module_zone('cms_galleries'));
                }
                if (count($rows) == 1) {
                    if ($rows[0]['accept_images'] == 1) {
                        $add_image_url = build_url(array('page' => 'cms_galleries', 'type' => 'add', 'cat' => $rows[0]['name']), get_module_zone('cms_galleries'));
                    }
                    if ($rows[0]['accept_videos'] == 1) {
                        $add_video_url = build_url(array('page' => 'cms_galleries', 'type' => 'add_other', 'cat' => $rows[0]['name']), get_module_zone('cms_galleries'));
                    }
                }
            }
        }

        require_code('templates_pagination');
        $pagination = pagination($text_id, $start, $block_id . '_start', $max, $block_id . '_max', $max_rows);

        return do_template('BLOCK_MAIN_PERSONAL_GALLERIES_LIST', array(
            '_GUID' => '90b11d3c01ff551be42a0472d27dd207',
            'BLOCK_PARAMS' => block_params_arr_to_str(array('block_id' => $block_id) + $map),
            'GALLERIES' => $galleries,
            'PAGINATION' => $pagination,
            'MEMBER_ID' => strval($member_id),
            'ADD_GALLERY_URL' => $add_gallery_url,
            'ADD_IMAGE_URL' => $add_image_url,
            'ADD_VIDEO_URL' => $add_video_url,

            'START' => strval($start),
            'MAX' => strval($max),
            'START_PARAM' => $block_id . '_start',
            'MAX_PARAM' => $block_id . '_max',
            'EXTRA_GET_PARAMS' => (get_param_integer($block_id . '_max', null) === null) ? null : ('&' . $block_id . '_max=' . urlencode(strval($max))),
        ));
    }

    /**
     * Show subgalleries belonging to member.
     *
     * @param  ID_TEXT $gallery_name Gallery name
     * @param  Tempcode $galleries The output goes in here (passed by reference)
     * @param  MEMBER $member_id The ID of the member who is being viewed
     * @param  MEMBER $member_id_viewing The ID of the member who is doing the viewing
     */
    public function attach_gallery_subgalleries($gallery_name, &$galleries, $member_id, $member_id_viewing)
    {
        // Not done via main_multi_content block due to need to custom query
        $rows = $GLOBALS['SITE_DB']->query_select('galleries', array('*'), array('parent_id' => $gallery_name), 'ORDER BY add_date DESC');
        foreach ($rows as $i => $row) {
            $galleries->attach(render_gallery_box($row, 'root', false, get_module_zone('galleries'), true, false, false, false));
            $this->attach_gallery_subgalleries($row['name'], $galleries, $member_id, $member_id_viewing);
        }
    }
}
