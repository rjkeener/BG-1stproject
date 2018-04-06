"use strict";if(typeof window.notifications_time_barrier=='undefined')
{window.notifications_already_presented={};window.NOTIFICATION_POLL_FREQUENCY=15;window.notifications_time_barrier=0;}
function notification_poller_init(time_barrier)
{require_javascript('sound',window.SoundManager);window.notifications_time_barrier=time_barrier;window.setInterval(window.poll_for_notifications,window.NOTIFICATION_POLL_FREQUENCY*1000);var web_notifications_button=document.getElementById('web_notifications_button');if(web_notifications_button)
add_event_listener_abstract(web_notifications_button,'click',explicit_notifications_enable_request);}
function notifications_mark_all_read(event)
{var url='https://csm.wearebeatgrid.com/data/notifications.php?type=poller&type=mark_all_read';if(typeof window.max_notifications_to_show!='undefined')url+='&max='+window.max_notifications_to_show;url+='&time_barrier='+window.encodeURIComponent(window.notifications_time_barrier);url+='&forced_update=1';url+=keep_stub();do_ajax_request(url,window._poll_for_notifications);_toggle_messaging_box(event,'web_notifications',true);return false;}
function poll_for_notifications(forced_update,delay)
{if(typeof forced_update=='undefined')forced_update=false;if(typeof delay=='undefined')delay=false;if(delay)
{window.setTimeout(function(){poll_for_notifications(forced_update);},1000);return;}
var url='https://csm.wearebeatgrid.com/data/notifications.php?type=poller&type=poller';if(typeof window.max_notifications_to_show!='undefined')url+='&max='+window.max_notifications_to_show;url+='&time_barrier='+window.encodeURIComponent(window.notifications_time_barrier);if(forced_update)url+='&forced_update=1';url+=keep_stub();do_ajax_request(url,window._poll_for_notifications);}
function _poll_for_notifications(raw_ajax_result)
{if(typeof raw_ajax_result.getElementsByTagName=='undefined')
return;var time_node=raw_ajax_result.getElementsByTagName('time')[0];window.notifications_time_barrier=window.parseInt(get_inner_html(time_node));var alerts;alerts=raw_ajax_result.getElementsByTagName('web_notification');for(var i=0;i<alerts.length;i++)
{display_alert(alerts[i]);}
alerts=raw_ajax_result.getElementsByTagName('pt');for(var i=0;i<alerts.length;i++)
{display_alert(alerts[i]);}
var spot,display,button,unread;spot=document.getElementById('web_notifications_spot');if(spot)
{display=raw_ajax_result.getElementsByTagName('display_web_notifications');button=document.getElementById('web_notifications_button');if((typeof display[0]!='undefined')&&(display[0]))
{unread=raw_ajax_result.getElementsByTagName('unread_web_notifications');set_inner_html(spot,get_inner_html(display[0]));set_inner_html(button.childNodes[0],get_inner_html(unread[0]));button.className='count_'+get_inner_html(unread[0]);}}
spot=document.getElementById('pts_spot');if(spot)
{display=raw_ajax_result.getElementsByTagName('display_pts');button=document.getElementById('pts_button');if((typeof display[0]!='undefined')&&(display[0]))
{unread=raw_ajax_result.getElementsByTagName('unread_pts');set_inner_html(spot,get_inner_html(display[0]));set_inner_html(button.childNodes[0],get_inner_html(unread[0]));button.className='count_'+get_inner_html(unread[0]);}}}
function display_alert(notification)
{var id=notification.getAttribute('id');if(typeof window.notifications_already_presented[id]!='undefined')return;var sound=notification.getAttribute('sound');if(!sound)sound=(window.parseInt(notification.getAttribute('priority'))<3)?'on':'off';if(read_cookie('sound','off')==='off')sound='off';var notification_code=notification.getAttribute('notification_code');if(sound=='on'&&typeof window.detect_change=='undefined'||notification_code!='ticket_reply'&&notification_code!='ticket_reply_staff')
{if(typeof window.soundManager!='undefined')
{var go_func=function(){var sound_url='data/sounds/message_received.mp3';var base_url=((sound_url.indexOf('data_custom')==-1)&&(sound_url.indexOf('uploads/')==-1))?'':'https://csm.wearebeatgrid.com';var sound_object=window.soundManager.createSound({url:base_url+'/'+sound_url});if(sound_object&&document.hasFocus())sound_object.play();};if(!window.soundManager.setupOptions.url)
{window.soundManager.setup({onready:go_func,url:get_base_url()+'/data/soundmanager',debugMode:false});}else
{go_func();}}}
window.notifications_already_presented[id]=true;}
function explicit_notifications_enable_request()
{}
function toggle_top_personal_stats(event)
{if(typeof event=='undefined')event=window.event;_toggle_messaging_box(event,'pts',true);_toggle_messaging_box(event,'web_notifications',true);return _toggle_messaging_box(event,'top_personal_stats');}
function toggle_web_notifications(event)
{if(typeof event=='undefined')event=window.event;_toggle_messaging_box(event,'top_personal_stats',true);_toggle_messaging_box(event,'pts',true);return _toggle_messaging_box(event,'web_notifications');}
function toggle_pts(event)
{if(typeof event=='undefined')event=window.event;_toggle_messaging_box(event,'top_personal_stats',true);_toggle_messaging_box(event,'web_notifications',true);return _toggle_messaging_box(event,'pts');}
function _toggle_messaging_box(event,name,hide)
{if(typeof hide=='undefined')hide=false;var e=document.getElementById(name+'_rel');if(!e)return;event.within_message_box=true;cancel_bubbling(event);var body=document.body;if(e.parentNode!=body)
{e.parentNode.removeChild(e);body.appendChild(e);add_event_listener_abstract(e,'click',function(event){if(typeof event=='undefined')event=window.event;event.within_message_box=true;});add_event_listener_abstract(body,'click',function(event){if(typeof event=='undefined')event=window.event;if(typeof event.within_message_box!='undefined')return;_toggle_messaging_box(event,'top_personal_stats',true);_toggle_messaging_box(event,'web_notifications',true);_toggle_messaging_box(event,'pts',true);});}
var button=document.getElementById(name+'_button');button.title='';var set_position=function(){var button_x=find_pos_x(button,true);var button_width=find_width(button);var x=(button_x+button_width-find_width(e));if(x<0)
{var span=e.getElementsByTagName('span')[0];span.style.marginLeft=(button_x+button_width/4)+'px';x=0;}
e.style.left=x+'px';e.style.top=(find_pos_y(button,true)+find_height(button))+'px';try
{e.style.opacity='1.0';}
catch(ex){}};window.setTimeout(set_position,0);if((e.style.display=='none')&&(!hide))
{var tooltips=document.querySelectorAll('body>.tooltip');if(typeof tooltips[0]!='undefined')
tooltips[0].style.display='none';e.style.display='inline';}else
{e.style.display='none';}
try
{e.style.opacity='0.0';}
catch(ex){}
return false;}