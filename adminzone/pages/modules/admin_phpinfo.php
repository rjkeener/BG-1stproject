<?php /*

 Composr
 Copyright (c) ocProducts, 2004-2016

 See text/EN/licence.txt for full licencing information.


 NOTE TO PROGRAMMERS:
   Do not edit this file. If you need to make changes, save your changed file to the appropriate *_custom folder
   **** If you ignore this advice, then your website upgrades (e.g. for bug fixes) will likely kill your changes ****

*/

/*EXTRA FUNCTIONS: shell_exec|get_current_user*/

/**
 * @license    http://opensource.org/licenses/cpal_1.0 Common Public Attribution License
 * @copyright  ocProducts Ltd
 * @package    phpinfo
 */

/**
 * Module page class.
 */
class Module_admin_phpinfo
{
    /**
     * Find details of the module.
     *
     * @return ?array Map of module info (null: module is disabled).
     */
    public function info()
    {
        $info = array();
        $info['author'] = 'Chris Graham';
        $info['organisation'] = 'ocProducts';
        $info['hacked_by'] = null;
        $info['hack_version'] = null;
        $info['version'] = 2;
        $info['locked'] = false;
        return $info;
    }

    /**
     * Find entry-points available within this module.
     *
     * @param  boolean $check_perms Whether to check permissions.
     * @param  ?MEMBER $member_id The member to check permissions as (null: current user).
     * @param  boolean $support_crosslinks Whether to allow cross links to other modules (identifiable via a full-page-link rather than a screen-name).
     * @param  boolean $be_deferential Whether to avoid any entry-point (or even return null to disable the page in the Sitemap) if we know another module, or page_group, is going to link to that entry-point. Note that "!" and "browse" entry points are automatically merged with container page nodes (likely called by page-groupings) as appropriate.
     * @return ?array A map of entry points (screen-name=>language-code/string or screen-name=>[language-code/string, icon-theme-image]) (null: disabled).
     */
    public function get_entry_points($check_perms = true, $member_id = null, $support_crosslinks = true, $be_deferential = false)
    {
        return array(
            '!' => array('PHPINFO', 'menu/adminzone/tools/phpinfo'),
        );
    }

    /**
     * Execute the module.
     *
     * @return Tempcode The result of execution.
     */
    public function run()
    {
        if (!is_null($GLOBALS['CURRENT_SHARE_USER'])) {
            warn_exit(do_lang_tempcode('SHARED_INSTALL_PROHIBIT'));
        }

        // Various checks
        $hooks = find_all_hooks('systems', 'checks');
        $found_issues = false;
        foreach (array_keys($hooks) as $hook) {
            require_code('hooks/systems/checks/' . filter_naughty_harsh($hook));
            $ob = object_factory('Hook_check_' . filter_naughty_harsh($hook));
            $warning = $ob->run();
            foreach ($warning as $_warning) {
                attach_message($_warning, 'warn');
                $found_issues = true;
            }
        }
        if (!$found_issues) {
            attach_message(do_lang_tempcode('menus:NO_SERVER_ISSUES_FOUND'), 'inform', true);
        }

        require_lang('menus');

        get_screen_title('PHPINFO');

        require_css('phpinfo');

        $GLOBALS['SCREEN_TEMPLATE_CALLED'] = '';
        $GLOBALS['TITLE_CALLED'] = true;

        require_lang('menus');
        set_helper_panel_text(comcode_lang_string('DOC_PHPINFO'));

        ob_start();
        if (php_function_allowed('phpinfo')) {
            // PHP-info...

            phpinfo();
        } else {
            // Alternative to PHP-info...

            var_dump(PHP_VERSION);
            var_dump($_SERVER);
            var_dump($_ENV);
            var_dump($_COOKIE);
            if (function_exists('ini_get_all')) {
                var_dump(ini_get_all());
            }
            if (function_exists('get_loaded_extensions')) {
                var_dump(get_loaded_extensions());
            }
            if (function_exists('phpcredits')) {
                var_dump(phpcredits());
            }
        }

        // Gather and cleanup the above...

        require_code('xhtml');
        $out = xhtmlise_html(ob_get_contents());
        ob_end_clean();

        $out = preg_replace('#<!DOCTYPE[^>]*>#s', '', preg_replace('#</body[^>]*>#', '', preg_replace('#<body[^>]*>#', '', preg_replace('#</html[^>]*>#', '', preg_replace('#<html[^>]*>#', '', $out)))));
        $matches = array();
        if (preg_match('#<style[^>]*>#', $out, $matches) != 0) {
            $offset = strpos($out, $matches[0]) + strlen($matches[0]);
            $end = strpos($out, '</style>', $offset);
            if ($end !== false) {
                $style = substr($out, $offset - strlen($matches[0]), $end - $offset + strlen('</style>') + strlen($matches[0]));
                //attach_to_screen_header(make_string_tempcode($style));      Actually this just makes an unnecessary mess

                $out = substr($out, 0, $offset) . substr($out, $end);
            }
        }
        $out = preg_replace('#<head[^>]*>.*</head[^>]*>#s', '', $out);

        $out = str_replace(' width="600"', ' width="100%"', $out);
        $url_parts = parse_url(get_base_url());
        $out = str_replace('<img border="0" src="/', '<img border="0" style="padding-top: 20px" src="http://' . escape_html($url_parts['host']) . '/', $out);

        // Current run-time details...

        $out .= '<h2>Run-time details</h2>';
        $out .= '<p><strong>Your IP address</strong>: ' . escape_html(get_ip_address()) . '</p>';
        if ((php_function_allowed('posix_getuid')) && (php_function_allowed('posix_getpwuid'))) {
            $user = posix_getuid();
            $suexec = ($user == fileowner(get_file_base() . '/index.php'));
            $dets = posix_getpwuid($user);
            $out .= '<p><strong>Running as user</strong>: ' . escape_html($dets['name']) . ' (' . ($suexec ? 'suEXEC or similar' : 'Not suEXEC') . ')</p>';
        } elseif (php_function_allowed('shell_exec')) {
            $test = @shell_exec('whoami');
            if (!empty($test)) {
                if (php_function_allowed('get_current_user')) {
                    $suexec = ($test == get_current_user());
                } else {
                    $suexec = null;
                }
                $out .= '<p><strong>Running as user</strong>: ' . escape_html($test) . (is_null($suexec) ? '' : (' (' . ($suexec ? 'suEXEC or similar' : 'Not suEXEC') . ')')) . '</p>';
            }
        } else {
            $tmp = cms_tempnam();
            $user = @fileowner($tmp);
            @unlink($tmp);
            $suexec = ($user == fileowner(get_file_base() . '/index.php'));
            $out .= '<p><strong>Running as user</strong>: ' . escape_html((($suexec) && (php_function_allowed('get_current_user'))) ? get_current_user() : ('#' . strval($user))) . ' (' . ($suexec ? 'suEXEC or similar' : 'Not suEXEC') . ')</p>';
        }
        if (php_function_allowed('php_sapi_name')) {
            $out .= '<p><strong>PHP configured as</strong>: ' . escape_html(php_sapi_name()) . '</p>';
        }

        require_code('global4');
        $out .= '<p><strong>Normative performance</strong>: ' . float_format(find_normative_performance(), 0) . '%</p>';

        if (function_exists('mysqli_get_server_version') && get_db_type() == 'mysqli') {
            $__mysql_version = @mysqli_get_server_version($GLOBALS['SITE_DB']->connection_read[0]);
            if ($__mysql_version !== false) {
                $_mysql_version = strval($__mysql_version);
                $mysql_version = strval(intval(substr($_mysql_version, 0, strlen($_mysql_version) - 4))) . '.' . strval(intval(substr($_mysql_version, -4, 2))) . '.' . strval(intval(substr($_mysql_version, -2, 2)));
                $out .= '<p><strong>MySQL version</strong>: ' . $mysql_version . '</p>';
            }
        }

        if (function_exists('pg_version') && get_db_type() == 'postgresql') {
            $postgresql_version = @pg_version($GLOBALS['SITE_DB']->connection_read);
            if ($postgresql_version !== false) {
                $out .= '<p><strong>PostgreSQL server version</strong>: ' . escape_html($postgresql_version['server']) . '</p>';
                $out .= '<p><strong>PostgreSQL client version</strong>: ' . escape_html($postgresql_version['client']) . '</p>';
                $out .= '<p><strong>PostgreSQL protocol version</strong>: ' . escape_html($postgresql_version['protocol']) . '</p>';
            }
        }

        if (strpos(get_db_type(), 'sqlserver') !== false) {
            $sqlserver_version = $GLOBALS['SITE_DB']->query('SELECT @@version AS version');
            if (isset($sqlserver_version[0]['version'])) {
                $out .= '<p><strong>SQL Server version</strong>: ' . escape_html($sqlserver_version[0]['version']) . '</p>';
            }
        }

        if (php_function_allowed('shell_exec')) {
            $commands = array(
                'uptime',
                'cat /proc/cpuinfo',
                'cat /proc/meminfo',
                'cat /proc/diskstats',
                'iotop',
                'iostat',
                'top -l 1 -s 0',
                'ps -Af',
            );

            foreach ($commands as $command) {
                $output = @shell_exec($command);
                if (!empty($output)) {
                    $out .= '<p style="margin-bottom: 0"><strong>' . escape_html($command) . '</strong>:</p><p style="margin-top: 0; font-family: courier; white-space: pre; overflow: auto; width: 100%">' . escape_html($output) . '</p>';
                }
            }
        }

        // Output...

        require_code('xhtml');
        $ret = make_string_tempcode(xhtmlise_html($out));
        return $ret;
    }
}