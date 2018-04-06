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
 * @package    core_adminzone_dashboard
 */

/**
 * Hook class.
 */
class Hook_checklist_open_site
{
    /**
     * Find items to include on the staff checklist.
     *
     * @return array An array of tuples: The task row to show, the number of seconds until it is due (or null if not on a timer), the number of things to sort out (or null if not on a queue), The name of the config option that controls the schedule (or null if no option).
     */
    public function run()
    {
        $url = build_url(array('page' => 'admin_config', 'type' => 'category', 'id' => 'SITE'), get_module_zone('admin_config'), null, false, false, false, 'group_CLOSED_SITE');
        $task = do_lang_tempcode('NAG_OPEN_WEBSITE', escape_html_tempcode($url));

        $status = (get_option('site_closed') == '1') ? 0 : 1;
        $_status = ($status == 0) ? do_template('BLOCK_MAIN_STAFF_CHECKLIST_ITEM_STATUS_0') : do_template('BLOCK_MAIN_STAFF_CHECKLIST_ITEM_STATUS_1');

        $tpl = do_template('BLOCK_MAIN_STAFF_CHECKLIST_ITEM', array('_GUID' => '83cfd2a7553a4820f2930484bfa85e47', 'URL' => '', 'STATUS' => $_status, 'TASK' => $task));

        return array(array($tpl, ($status == 0) ? -1 : 0, 1, null));
    }
}
