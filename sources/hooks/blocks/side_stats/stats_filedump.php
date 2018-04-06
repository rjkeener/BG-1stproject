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
 * @package    filedump
 */

/**
 * Hook class.
 */
class Hook_stats_filedump
{
    /**
     * Show a stats section.
     *
     * @return Tempcode The result of execution.
     */
    public function run()
    {
        if (!addon_installed('filedump')) {
            return new Tempcode();
        }
        if (!file_exists(get_custom_file_base() . '/uploads/filedump')) {
            return new Tempcode();
        }

        require_lang('filedump');

        require_code('files');
        require_code('files2');

        $bits = new Tempcode();

        if (get_option('filedump_show_stats_count_total_files') == '1') {
            $bits->attach(do_template('BLOCK_SIDE_STATS_SUBLINE', array('_GUID' => 'd420666251bd9e70804f97ff737c775a', 'KEY' => do_lang_tempcode('COUNT_FILES'), 'VALUE' => integer_format(count(get_directory_contents(get_custom_file_base() . '/uploads/filedump'))))));
        }
        if (get_option('filedump_show_stats_count_total_space') == '1') {
            $bits->attach(do_template('BLOCK_SIDE_STATS_SUBLINE', array('_GUID' => '995ec487ce5f445f2a74aa483a75910a', 'KEY' => do_lang_tempcode('DISK_USAGE'), 'VALUE' => clean_file_size(get_directory_size(get_custom_file_base() . '/uploads/filedump')))));
        }
        if ($bits->is_empty_shell()) {
            return new Tempcode();
        }
        $section = do_template('BLOCK_SIDE_STATS_SECTION', array('_GUID' => 'cd479a1301ea539c82d99ad7367d7d54', 'SECTION' => do_lang_tempcode('FILEDUMP'), 'CONTENT' => $bits));

        return $section;
    }
}