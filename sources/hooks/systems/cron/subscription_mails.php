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
 * @package    ecommerce
 */

/**
 * Hook class.
 */
class Hook_cron_subscription_mails
{
    /**
     * Run function for CRON hooks. Searches for tasks to perform.
     */
    public function run()
    {
        if (get_forum_type() != 'cns') {
            return;
        }

        $time = time();
        $last_time = intval(get_value('last_subscription_mail_send', null, true));
        if ($last_time > $time - 30 * 60) {
            return; // Every 30 minutes
        }

        require_code('ecommerce_subscriptions');
        $_subscribers_1 = collapse_1d_complexity('s_member_id', $GLOBALS['SITE_DB']->query_select('subscriptions', array('DISTINCT s_member_id')));
        $_subscribers_2 = collapse_1d_complexity('member_id', $GLOBALS['FORUM_DB']->query_select('f_group_member_timeouts', array('DISTINCT member_id')));
        $_subscribers = array_merge($_subscribers_1, $_subscribers_2);
        $subscribers = array();
        foreach ($_subscribers as $subscriber) {
            $subscribers[$subscriber] = find_member_subscriptions($subscriber, true);
        }

        $dbs_bak = $GLOBALS['NO_DB_SCOPE_CHECK'];
        $GLOBALS['NO_DB_SCOPE_CHECK'] = true;

        $mails = $GLOBALS['SITE_DB']->query_select('f_usergroup_sub_mails m JOIN ' . get_table_prefix() . 'f_usergroup_subs s ON s.id=m.m_usergroup_sub_id', array('m.*'));
        foreach ($mails as $mail) {
            $offset = $mail['m_ref_point_offset'] * 60 * 60; // Convert from hours to seconds
            foreach ($subscribers as $subscriber => $subs) {
                if (isset($subs['USERGROUP' . strval($mail['m_usergroup_sub_id'])])) {
                    $send = false;

                    $sub = $subs['USERGROUP' . strval($mail['m_usergroup_sub_id'])];
                    switch ($mail['m_ref_point']) {
                        case 'start':
                            $send = ((time() - $sub['start_time'] >= $offset) && ($last_time - $sub['start_time'] < $offset));
                            break;
                        case 'term_start':
                            $send = ((time() - $sub['term_start_time'] >= $offset) && ($last_time - $sub['term_start_time'] < $offset));
                            break;
                        case 'term_end':
                            $send = (($sub['term_end_time'] - time() <= $offset) && ($sub['term_end_time'] - $last_time > $offset));
                            break;
                        case 'expiry':
                            if (!is_null($sub['expiry_time'])) {
                                $send = (($sub['expiry_time'] - time() <= $offset) && ($sub['expiry_time'] - $last_time > $offset));
                            }
                            break;
                    }

                    // Send notification
                    if ($send) {
                        require_code('notifications');
                        dispatch_notification('paid_subscription_messages', null, get_translated_text($mail['m_subject']), get_translated_text($mail['m_body']), array($subscriber));
                    }
                }
            }
        }

        $GLOBALS['NO_DB_SCOPE_CHECK'] = $dbs_bak;

        set_value('last_subscription_mail_send', strval($time), true);
    }
}
