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
class Hook_config_bottom_show_commandr_button
{
    /**
     * Gets the details relating to the config option.
     *
     * @return ?array The details (null: disabled)
     */
    public function get_details()
    {
        return array(
            'human_name' => 'COMMANDR_BUTTON',
            'type' => 'tick',
            'category' => 'THEME',
            'group' => 'FOOTER_LINKS',
            'explanation' => 'CONFIG_OPTION_bottom_show_commandr_button',
            'shared_hosting_restricted' => '0',
            'list_options' => '',

            'addon' => 'commandr',
        );
    }

    /**
     * Gets the default value for the config option.
     *
     * @return ?string The default value (null: option is disabled)
     */
    public function get_default()
    {
        return (get_file_base() != get_custom_file_base()) ? '0' : '1';
    }
}
