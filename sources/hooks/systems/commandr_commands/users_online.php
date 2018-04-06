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
 * @package    commandr
 */

/**
 * Hook class.
 */
class Hook_commandr_command_users_online
{
    /**
     * Run function for Commandr hooks.
     *
     * @param  array $options The options with which the command was called
     * @param  array $parameters The parameters with which the command was called
     * @param  object $commandr_fs A reference to the Commandr filesystem object
     * @return array Array of stdcommand, stdhtml, stdout, and stderr responses
     */
    public function run($options, $parameters, &$commandr_fs)
    {
        if ((array_key_exists('h', $options)) || (array_key_exists('help', $options))) {
            return array('', do_command_help('users_online', array('h'), array()), '', '');
        } else {
            $count = 0;
            require_code('users2');
            $members = get_users_online(true, null, $count);
            if (is_null($members)) {
                return array('', '', do_lang('TOO_MANY_USERS_ONLINE'), '');
            }
            $out = new Tempcode();
            $guests = 0;

            $valid_members = array();
            foreach ($members as $member) {
                if ((is_guest($member['member_id'])) || (is_null($member['cache_username']))) {
                    $guests++;
                } else {
                    $valid_members[$member['cache_username']] = $member['member_id'];
                }
            }

            return array('', do_template('COMMANDR_USERS_ONLINE', array('_GUID' => 'fcf779ef175895d425b706e40fb3252a', 'MEMBERS' => $valid_members, 'GUESTS' => integer_format($guests))), '', '');
        }
    }
}
