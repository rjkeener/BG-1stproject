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
 * @package    downloads
 */

/**
 * Hook class.
 */
class Hook_task_import_filesystem_downloads
{
    /**
     * Run the task hook.
     *
     * @param  AUTO_LINK $destination The category to import to
     * @param  PATH $server_path The import path
     * @param  boolean $subfolders Whether to import subfolders
     * @return ?array A tuple of at least 2: Return mime-type, content (either Tempcode, or a string, or a filename and file-path pair to a temporary file), map of HTTP headers if transferring immediately, map of ini_set commands if transferring immediately (null: show standard success message)
     */
    public function run($destination, $server_path, $subfolders)
    {
        require_code('downloads2');
        require_lang('downloads');

        if (substr($server_path, -1) == '/') {
            $server_path = substr($server_path, 0, strlen($server_path) - 1);
        }
        $base_path = get_custom_file_base() . '/' . $server_path;
        $base_url = get_custom_base_url() . '/' . $server_path;

        if (!file_exists($base_path)) {
            return array(null, do_lang_tempcode('DIRECTORY_NOT_FOUND', escape_html($server_path)));
        }

        log_it('FILESYSTEM_DOWNLOADS');

        /*  Needless because it's relative to Composr directory anyway
        // Failsafe check
        if ((file_exists($base_path . '/dev')) && (file_exists($base_path . '/etc')) && (file_exists($base_path . '/sbin'))) {
            return array(null, do_lang_tempcode('POINTS_TO_ROOT_SCARY', escape_html($server_path)));
        }
        if ((file_exists($base_path . '/Program files')) && ((file_exists($base_path . '/Users')) || (file_exists($base_path . '/Documents and settings'))) && (file_exists($base_path . '/Windows'))) {
            return array(null, do_lang_tempcode('POINTS_TO_ROOT_SCARY', escape_html($server_path)));
        }
        */

        // Actually start the scanning
        $num_added = $this->filesystem_recursive_downloads_scan($base_path, $base_url, $destination, $subfolders);

        $ret = do_lang_tempcode('SUCCESS_ADDED_DOWNLOADS', escape_html(integer_format($num_added)));
        return array('text/html', $ret);
    }

    /**
     * Worker function to do a filesystem import.
     *
     * @param  PATH $server_path Filesystem-based path from where we are reading files
     * @param  URLPATH $server_url URL-based path from where we are reading files
     * @param  AUTO_LINK $dest_cat The destination downloading category
     * @param  boolean $make_subfolders Whether we add hierarchically (as opposed to a flat category fill)
     * @return integer Number of downloads added
     */
    public function filesystem_recursive_downloads_scan($server_path, $server_url, $dest_cat, $make_subfolders)
    {
        $num_added = 0;

        require_code('files');

        $dh = @opendir($server_path);
        if ($dh !== false) {
            while (($entry = readdir($dh)) !== false) {
                if (!should_ignore_file($entry, IGNORE_ACCESS_CONTROLLERS | IGNORE_HIDDEN_FILES)) {
                    $full_path = $server_path . '/' . $entry;
                    $full_url = $server_url . '/' . rawurlencode($entry);

                    // Is the entry a directory?
                    if (is_dir($full_path)) {
                        if ($make_subfolders) {
                            // Do we need to make new category, or is it already existent?
                            $category_id = $GLOBALS['SITE_DB']->query_select_value_if_there('download_categories', 'id', array('parent_id' => $dest_cat, $GLOBALS['SITE_DB']->translate_field_ref('category') => $entry));
                            if (is_null($category_id)) {
                                // Add the directory
                                $category_id = add_download_category(titleify($entry), $dest_cat, '', '', '');
                                require_code('permissions2');
                                set_global_category_access('downloads', $category_id);
                            }
                            // Call this function again to recurse it
                            $num_added += $this->filesystem_recursive_downloads_scan($full_path, $full_url, $category_id, true);
                        } else {
                            $num_added += $this->filesystem_recursive_downloads_scan($full_path, $full_url, $dest_cat, false);
                        }
                    } elseif (!is_link($full_path)) {
                        // Test to see if the file is already in our database
                        $test = $GLOBALS['SITE_DB']->query_select_value_if_there('download_downloads', 'url', array('url' => $full_url));
                        if (is_null($test)) {
                            // First let's see if we are allowed to add this (accessible by URL already)
                            $myfile = @fopen($full_path, 'rb');
                            if ($myfile !== false) {
                                $shouldbe = fread($myfile, 8000);
                                fclose($myfile);
                            } else {
                                $shouldbe = null;
                            }
                            global $HTTP_MESSAGE;
                            $actuallyis = http_download_file($full_url, 8000, false);
                            if (($HTTP_MESSAGE == '200') && (!is_null($shouldbe)) && (strcmp($shouldbe, $actuallyis) == 0)) {
                                // Ok, add it
                                $filesize = filesize($full_path);
                                add_download($dest_cat, titleify($entry), $full_url, '', $GLOBALS['FORUM_DRIVER']->get_username(get_member()), '', null, 1, 1, 1, 1, '', $entry, $filesize, 0, 0);
                                $num_added++;
                            }
                        }
                    }
                }
            }
        }

        return $num_added;
    }
}