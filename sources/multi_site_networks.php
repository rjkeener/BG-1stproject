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
 * @package    msn
 */

/**
 * Get a netlink block / direct to a netlink site.
 *
 * @param  URLPATH $redir_url The URL we grab our netlink from. If this is not blank, instead of getting a netlink block, we direct to a netlink site.
 * @return Tempcode The netlink block
 */
function do_netlink($redir_url = '')
{
    header('Content-type: text/plain; charset=' . get_charset());

    // If we are redirecting
    if ($redir_url != '') {
        if ((strpos($redir_url, "\n") !== false) || (strpos($redir_url, "\r") !== false)) {
            log_hack_attack_and_exit('HEADER_SPLIT_HACK');
        }
        header('Location: ' . escape_header($redir_url));
        exit();
    }

    // Ok we're displaying a netlink, which will be dumped right into the body of the reading site
    //  - this isn't actually a weburl that is actually displayed, its loaded by Composr and embedded-inline

    // For all the names in our network
    require_code('textfiles');
    $lines = explode("\n", read_text_file('netlink', null, true));
    if (count($lines) == 0) {
        return new Tempcode();
    }
    $content = new Tempcode();
    $has_selected = false;
    foreach ($lines as $line) {
        $parts = explode('=', $line, 2);
        if (count($parts) != 2) {
            continue;
        }
        $name = rtrim($parts[0]);
        $url = trim($parts[1]);

        // Are we looking at the source site in the network?
        $selected = (strtolower($url) == strtolower(get_param_string('source', '')));
        if ($selected) {
            $has_selected = true;
        }

        $content->attach(form_input_list_entry(base64_encode($url), $selected, $name));
    }
    if (!$has_selected) {
        $content_temp = new Tempcode();
        $content_temp->attach(form_input_list_entry('', true, ''));
        $content_temp->attach($content);
        $content = $content_temp;
    }

    return do_template('NETLINK', array('_GUID' => '180321222dc5dc99a231597c803f0726', 'CONTENT' => $content));
}
