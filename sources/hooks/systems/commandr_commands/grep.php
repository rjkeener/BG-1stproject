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
class Hook_commandr_command_grep
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
            return array('', do_command_help('grep', array('h'), array(true, true)), '', '');
        } else {
            if (!array_key_exists(0, $parameters)) {
                return array('', '', '', do_lang('MISSING_PARAM', '1', 'grep'));
            }
            if (!array_key_exists(1, $parameters)) {
                return array('', '', '', do_lang('MISSING_PARAM', '2', 'grep'));
            }
            $_parameters = $commandr_fs->_pwd_to_array($parameters[1]);

            if (!$commandr_fs->_is_file($_parameters)) {
                if ($parameters[1] == '<comcode_pages>') {
                    $output = '';

                    $zones = find_all_zones(false, false, true);
                    foreach ($zones as $zone) {
                        $pages = find_all_pages_wrap($zone, true, false, FIND_ALL_PAGES__ALL, 'comcode');
                        foreach ($pages as $page => $type) {
                            $contents = file_get_contents(get_custom_file_base() . '/' . $zone . '/pages/' . $type . '/' . $page);
                            if (preg_match('#' . $parameters[0] . '#', $contents) != 0) {
                                $output .= $zone . ':' . basename($page, '.txt') . "\n";
                            }
                        }
                    }

                    return array('', '', $output, '');
                }

                return array('', '', '', do_lang('NOT_A_FILE', '2'));
            }

            $_lines = unixify_line_format($commandr_fs->read_file($_parameters));
            $lines = explode("\n", $_lines);
            if (($parameters[0] == '') || (($parameters[0][0] != '#') && ($parameters[0][0] != '/'))) {
                $parameters[0] = '#' . $parameters[0] . '#';
            }
            $matches = preg_grep($parameters[0], $lines);
            $output = '';
            foreach ($matches as $value) {
                $output .= $value . "\n";
            }

            return array('', '', $output, '');
        }
    }
}
