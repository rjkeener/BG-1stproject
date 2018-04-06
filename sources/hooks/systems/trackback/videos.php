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
class Hook_trackback_videos
{
    /**
     * Run function for trackback hooks. They see if content of an ID relating to this content has trackback enabled.
     *
     * @param  ID_TEXT $id The ID
     * @return boolean Whether trackback is enabled
     */
    public function run($id)
    {
        $rows = $GLOBALS['SITE_DB']->query_select('videos', array('allow_trackbacks'), array('id' => intval($id)), '', 1);
        if (!array_key_exists(0, $rows)) {
            return false;
        }
        return $rows[0]['allow_trackbacks'] == 1;
    }
}