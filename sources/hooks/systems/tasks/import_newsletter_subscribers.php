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
 * @package    newsletter
 */

/**
 * Hook class.
 */
class Hook_task_import_newsletter_subscribers
{
    /**
     * Run the task hook.
     *
     * @param  LANGUAGE_NAME $_language The language for subscribers
     * @param  AUTO_LINK $newsletter_id The newsletter being imported into
     * @param  integer $_level The level to import into
     * @param  PATH $path The path of the file to import
     * @return ?array A tuple of at least 2: Return mime-type, content (either Tempcode, or a string, or a filename and file-path pair to a temporary file), map of HTTP headers if transferring immediately, map of ini_set commands if transferring immediately (null: show standard success message)
     */
    public function run($_language, $newsletter_id, $_level, $path)
    {
        require_lang('cns');
        require_lang('newsletter');
        require_code('newsletter');

        $done_special_notice = false;

        $GLOBALS['NO_QUERY_LIMIT'] = true;

        if (filesize($path) < 1024 * 1024 * 3) { // Cleanup possible line ending problems, but only if file not too big
            $fixed_contents = unixify_line_format(file_get_contents($path));
            require_code('files');
            cms_file_put_contents_safe($path, $fixed_contents, FILE_WRITE_FAILURE_SILENT | FILE_WRITE_FIX_PERMISSIONS);
        }

        safe_ini_set('auto_detect_line_endings', '1');
        $myfile = fopen($path, 'rt');
        $del = ',';
        $csv_test_line = fgetcsv($myfile, 4096, $del);
        if ((count($csv_test_line) == 1) && (strpos($csv_test_line[0], ';') !== false)) {
            $del = ';';
        }
        rewind($myfile);

        set_mass_import_mode();

        $email_index = 0;
        $forename_index = null;
        $surname_index = null;
        $username_index = null;
        $hash_index = null;
        $salt_index = null;
        $language_index = null;
        $code_confirm_index = null;
        $join_time_index = null;
        $level_index = null;

        $count = 0;
        $count2 = 0;

        $j = 0;

        $has_interest_levels = (get_option('interest_levels') == '1');

        do {
            $i = 0;
            $_csv_data = array();
            while (($csv_line = fgetcsv($myfile, 4096, $del)) !== false) {
                $_csv_data[] = $csv_line;
                $i++;
                if ($i == 500) {
                    break;
                }
            }

            // Process data
            foreach ($_csv_data as $csv_line) {
                if (($j == 0) && (count($csv_line) >= 1) && (!is_null($csv_line[$email_index])) && (strpos($csv_line[$email_index], '@') === false)) {
                    foreach ($csv_line as $j => $val) {
                        if (in_array(strtolower($val), array('e-mail', 'email', 'email address', 'e-mail address', strtolower(do_lang('EMAIL_ADDRESS')), 'to'))) {
                            $email_index = $j;
                        }
                        if (in_array(strtolower($val), array('forename', 'forenames', 'first name', strtolower(do_lang('FORENAME'))))) {
                            $forename_index = $j;
                        }
                        if (in_array(strtolower($val), array('surname', 'surnames', 'last name', strtolower(do_lang('SURNAME'))))) {
                            $surname_index = $j;
                        }
                        if (in_array(strtolower($val), array('username', strtolower(do_lang('NAME'))))) {
                            $username_index = $j;
                        }
                        if (in_array(strtolower($val), array('hash', 'password', 'pass', 'pword', 'pw', 'p/w', 'code', 'secret', strtolower(do_lang('PASSWORD_HASH'))))) {
                            $hash_index = $j;
                        }
                        if (in_array(strtolower($val), array('salt', strtolower(do_lang('SALT'))))) {
                            $salt_index = $j;
                        }
                        if (in_array(strtolower($val), array('lang', 'language', strtolower(do_lang('LANGUAGE'))))) {
                            $hash_index = $j;
                        }
                        if (in_array(strtolower($val), array('confirm code', strtolower(do_lang('CONFIRM_CODE'))))) {
                            $code_confirm_index = $j;
                        }
                        if ((stripos($val, 'time') !== false) || (stripos($val, 'date') !== false) || (strtolower($val) == do_lang('JOIN_DATE'))) {
                            $join_time_index = $j;
                        }
                        if (in_array(strtolower($val), array('level', 'subscription level', strtolower(do_lang('SUBSCRIPTION_LEVEL'))))) {
                            $level_index = $j;
                        }
                    }
                    $j++;
                    continue;
                }

                $j++;

                if ((count($csv_line) >= 1) && (!is_null($csv_line[$email_index])) && (strpos($csv_line[$email_index], '@') !== false)) {
                    $email = $csv_line[$email_index];
                    $forename = ((!is_null($forename_index)) && (array_key_exists($forename_index, $csv_line))) ? $csv_line[$forename_index] : '';
                    if ($forename == $email) {
                        $forename = ucfirst(strtolower(preg_replace('#^(\w+)([^\w].*)?$#', '\\1', $forename)));
                        if (in_array($forename, array('Sales', 'Info', 'Business', 'Enquiries', 'Admin', 'Webmaster'))) {
                            $forename = '';
                        }
                    }
                    $surname = ((!is_null($surname_index)) && (array_key_exists($surname_index, $csv_line))) ? $csv_line[$surname_index] : '';
                    $username = ((!is_null($username_index)) && (array_key_exists($username_index, $csv_line))) ? $csv_line[$username_index] : '';
                    $hash = ((!is_null($hash_index)) && (array_key_exists($hash_index, $csv_line))) ? $csv_line[$hash_index] : '';
                    $salt = ((!is_null($salt_index)) && (array_key_exists($salt_index, $csv_line))) ? $csv_line[$salt_index] : '';
                    $language = ((!is_null($language_index)) && (array_key_exists($language_index, $csv_line)) && ((file_exists(get_custom_file_base() . '/lang/' . $csv_line[$language_index])) || (file_exists(get_custom_file_base() . '/lang_custom/' . $csv_line[$language_index])))) ? $csv_line[$language_index] : $_language;
                    if ($language == '') {
                        $language = $_language;
                    }
                    $code_confirm = ((!is_null($code_confirm_index)) && (array_key_exists($code_confirm_index, $csv_line))) ? intval($csv_line[$code_confirm_index]) : 0;
                    $join_time = ((!is_null($join_time_index)) && (!empty($csv_line[$join_time_index]))) ? strtotime($csv_line[$join_time_index]) : time();
                    if ($join_time === false) {
                        $join_time = time();
                    }
                    if ($_level == 0) {
                        $level = 0;
                    } else {
                        $level = ((!is_null($level_index)) && (!empty($csv_line[$level_index]))) ? intval($csv_line[$level_index]) : $_level;
                        if ($level == 0) {
                            $level = $_level;
                        }
                    }

                    if ($newsletter_id == -1) {
                        $test = $GLOBALS['FORUM_DB']->query_select_value_if_there('f_members', 'id', array('m_email_address' => $email));
                        if (is_null($test)) {
                            if ($level != 0) {
                                if (!$done_special_notice) {
                                    attach_message(do_lang_tempcode('NEWSLETTER_WONT_IMPORT_MEMBERS'), 'notice');
                                    $done_special_notice = true;
                                }
                            }
                        } else {
                            if ($level == 0) {
                                $GLOBALS['FORUM_DB']->query_update('f_members', array('m_allow_emails_from_staff' => 0), array('m_email_address' => $email), '', 1);
                                $count++;
                            } else {
                                $GLOBALS['FORUM_DB']->query_update('f_members', array('m_allow_emails_from_staff' => 1), array('m_email_address' => $email), '', 1);
                            }
                        }
                    } else {
                        $test = $GLOBALS['SITE_DB']->query_select_value_if_there('newsletter_subscribers', 'id', array('email' => $email));
                        if (is_null($test)) {
                            add_newsletter_subscriber($email, $join_time, $code_confirm, $hash, $salt, $language, $forename, $surname);

                            if ($level != 0) {
                                $count++;
                            }
                        } else {
                            if (($forename != '') || ($surname != '')) {
                                edit_newsletter_subscriber($test, null, null, null, null, null, null, $forename, $surname);
                            }

                            if ($level == 0) {
                                $count++;
                            }
                        }

                        // In case $email is already a subscriber, we delete first
                        if (($has_interest_levels) || ($level == 0)) {
                            $GLOBALS['SITE_DB']->query_delete('newsletter_subscribe', array(
                                'newsletter_id' => $newsletter_id,
                                'email' => $email,
                            ), '', 1);
                        }
                        if ($level == 0) { // Allow deletion CSV via setting subscription level to 0
                            $cnt = $GLOBALS['SITE_DB']->query_select_value('newsletter_subscribe', 'COUNT(*)', array('email' => $email));
                            if ($cnt == 0) { // No newsletters for them now, so remove entirely
                                $GLOBALS['SITE_DB']->query_delete('newsletter_subscribers', array(
                                    'email' => $email,
                                ), '', 1);
                            }
                        } else { // We only reinsert if NOT deletion.
                            $GLOBALS['SITE_DB']->query_insert('newsletter_subscribe', array(
                                'newsletter_id' => $newsletter_id,
                                'the_level' => $level,
                                'email' => $email,
                            ), false, true/*in case already exists*/);
                        }
                    }

                    $count2++;
                }
            }
        } while (count($_csv_data) != 0);

        fclose($myfile);

        if ($level == 0) {
            $message = do_lang_tempcode('NEWSLETTER_REMOVED_THIS', escape_html(integer_format($count)), escape_html(integer_format($count2)));
        } else {
            $message = do_lang_tempcode('NEWSLETTER_IMPORTED_THIS', escape_html(integer_format($count)), escape_html(integer_format($count2)));
        }

        log_it('IMPORT_NEWSLETTER_SUBSCRIBERS');

        @unlink($path);
        return array('text/html', $message);
    }
}