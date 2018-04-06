"use strict";if(typeof window.page_loaded=='undefined')
{window.page_loaded=false;window.page_fully_loaded=false;window.is_doing_a_drag=false;}
function script_load_stuff()
{if(window.page_loaded)return;var i;if(window==window.top&&!window.opener||window.name=='')window.name='_site_opener';if(typeof document.documentElement.ontouchstart!='undefined')document.body.className+=' touch_enabled';var preloader=new Image();var images=[];images.push('https://csm.wearebeatgrid.com/themes/default/images/loading.gif'.replace(/^https?:/,window.location.protocol));for(i=0;i<images.length;i++)preloader.src=images[i];handle_textarea_scrolling();if((!window.parent)||(window.parent==window))
{if(typeof window.server_timestamp!='undefined')
{set_cookie('client_time',new Date().toString(),120);set_cookie('client_time_ref',window.server_timestamp,120);}}
for(i=0;i<document.forms.length;i++)
{new_html__initialise(document.forms[i]);}
for(i=0;i<document.links.length;i++)
{new_html__initialise(document.links[i]);}
for(i=0;i<document.images.length;i++)
{new_html__initialise(document.images[i]);}
var cols=document.getElementsByClassName('col_balance_height');for(var i=0;i<cols.length;i++)
{var max=null;for(var j=0;j<cols.length;j++)
{if(cols[i].className==cols[j].className)
{var height=find_height(cols[j]);if(max===null||height>max)max=height;}
cols[i].style.height=max+'px';}}
window.mouse_x=0;window.mouse_y=0;window.mouse_listener_enabled=false;window.ctrl_pressed=false;window.alt_pressed=false;window.meta_pressed=false;window.shift_pressed=false;if(typeof window.addEventListener!='undefined')
window.addEventListener('click',capture_click_key_states,true);if(document.getElementsByTagName('base')[0])
{for(i=0;i<document.links.length;i++)
{var href=document.links[i].getAttribute('href');if((href)&&(href.substr(0,1)=='#'))
{document.links[i].setAttribute('href',window.location.href.replace(/#.*$/,'')+href);}}}
var stuck_navs=get_elements_by_class_name(document,'stuck_nav');if(stuck_navs.length>0)
{add_event_listener_abstract(window,'scroll',function(){for(var i=0;i<stuck_navs.length;i++)
{var stuck_nav=stuck_navs[i];var stuck_nav_height=(typeof stuck_nav.real_height=='undefined')?find_height(stuck_nav,true):stuck_nav.real_height;stuck_nav.real_height=stuck_nav_height;var pos_y=find_pos_y(stuck_nav.parentNode,true);var footer_height=find_height(document.getElementsByTagName('footer')[0]);var panel_bottom=document.getElementById('panel_bottom');if(panel_bottom)footer_height+=find_height(panel_bottom);panel_bottom=document.getElementById('global_messages_2');if(panel_bottom)footer_height+=find_height(panel_bottom);if(stuck_nav_height<get_window_height()-footer_height)
{var extra_height=(get_window_scroll_y()-pos_y);if(extra_height>0)
{var width=find_width(stuck_nav,true);var height=find_height(stuck_nav,true);var stuck_nav_width=find_width(stuck_nav,true);if(!abstract_get_computed_style(stuck_nav,'width'))
{stuck_nav.parentNode.style.width=width+'px';}
stuck_nav.parentNode.style.height=height+'px';stuck_nav.style.position='fixed';stuck_nav.style.top='0px';stuck_nav.style.zIndex='1000';stuck_nav.style.width=stuck_nav_width+'px';}else
{stuck_nav.parentNode.style.width='';stuck_nav.parentNode.style.height='';stuck_nav.style.position='';stuck_nav.style.top='';stuck_nav.style.width='';}}else
{stuck_nav.parentNode.style.width='';stuck_nav.parentNode.style.height='';stuck_nav.style.position='';stuck_nav.style.top='';stuck_nav.style.width='';}}});}
add_event_listener_abstract(window,'resize',function(){clear_out_tooltips(null);});var font_size=read_cookie('font_size');if(font_size!='')
{set_font_size(font_size);}
window["__flash__removeCallback"]=function(instance,name){try{if(instance){instance[name]=null;}}catch(flashEx){}};window.has_js_state=false;window.onpopstate=function(event){window.setTimeout(function(){if(window.location.hash==''&&window.has_js_state){window.location.reload();}},0);}
if(typeof window.script_load_stuff_b!='undefined')window.script_load_stuff_b();window.page_loaded=true;add_event_listener_abstract(window,'real_load',function(){script_page_rendered();window.page_fully_loaded=true;});if((typeof window.cms_is_staff!='undefined')&&(window.cms_is_staff)&&(typeof window.script_load_stuff_staff!='undefined'))script_load_stuff_staff();}
function merge_global_messages()
{var m1=document.getElementById('global_messages');if(!m1)return;var m2=document.getElementById('global_messages_2');set_inner_html(m1,get_inner_html(m2),true);m2.parentNode.removeChild(m2);}
function new_html__initialise(element)
{switch(element.nodeName.toLowerCase())
{case'img':if(element.className=='gd_text')
{var span=document.createElement('span');if(typeof span.style.writingMode=='string')
{element.style.display='none';span.style.writingMode='tb-lr';if(span.style.writingMode!='tb-lr')
span.style.writingMode='vertical-lr';span.style.webkitWritingMode='vertical-lr';span.style.mozWritingMode='vertical-lr';span.style.whiteSpace='nowrap';if(typeof span.textContent!='undefined')
{span.textContent=element.alt;}else
{set_inner_html(span,escape_html(element.alt));}
element.parentNode.insertBefore(span,element);}else
if(typeof span.style.msTransform=='string'||typeof span.style.webkitTransform=='string'||typeof span.style.MozTransform=='string'||typeof span.style.transform=='string')
{element.style.display='none';span.style.msTransform='rotate(90deg)';span.style.webkitTransform='rotate(90deg)';span.style.MozTransform='rotate(90deg)';span.style.transform='rotate(90deg)';span.style.msTransformOrigin='bottom left';span.style.webkitTransformOrigin='bottom left';span.style.MozTransformOrigin='bottom left';span.style.transformOrigin='bottom left';span.style.top='-1em';span.style.left='0.5em';span.style.position='relative';span.style.display='inline-block';span.style.whiteSpace='nowrap';span.style.paddingRight='0.5em';element.parentNode.style.textAlign='left';element.parentNode.style.width='1em';element.parentNode.style.overflow='hidden';element.parentNode.style.verticalAlign='top';if(typeof span.textContent!='undefined')
{span.textContent=element.alt;}else
{set_inner_html(span,escape_html(element.alt));}
element.parentNode.insertBefore(span,element);var span_proxy=span.cloneNode(true);span_proxy.style.position='absolute';span_proxy.style.visibility='hidden';document.body.appendChild(span_proxy);window.setTimeout(function(){var width=find_width(span_proxy)+15;span_proxy.parentNode.removeChild(span_proxy);if(element.parentNode.nodeName.toLowerCase()=='th'||element.parentNode.nodeName.toLowerCase()=='td')
{element.parentNode.style.height=width+'px';}else
{element.parentNode.style.minHeight=width+'px';}},0);}}
if(element.className.indexOf('activate_rich_semantic_tooltip')==-1)convert_tooltip(element);break;case'a':var rel=element.getAttribute('rel');if(rel&&rel.match(/(^|\s)lightbox($|\s)/))
{element.onclick=function(element){return function(){if(element.getElementsByTagName('img').length>0||element.getElementsByTagName('video').length>0)
{open_image_into_lightbox(element);}else
{open_link_as_overlay(element);}
return false;}}(element);element.title=element.title.replace('(this link will open in a new window)','');if(element.title==' ')element.title='';}
if(typeof element['original-title']=='undefined'&&element.className.indexOf('no_tooltip')==-1)convert_tooltip(element);break;case'form':if(typeof window.load_html_edit!='undefined')
{load_html_edit(element);}
element.title='';if(element.getAttribute('target')!='_blank')
add_event_listener_abstract(element,'mouseover',function(){try{element.setAttribute('title','');element.title='';}catch(e){}});var elements,j;elements=element.elements;for(j=0;j<elements.length;j++)
{if(typeof elements[j].title!='undefined'&&typeof elements[j]['original-title']=='undefined'&&elements[j].className.indexOf('no_tooltip')==-1)convert_tooltip(elements[j]);}
elements=element.getElementsByTagName('input');for(j=0;j<elements.length;j++)
{if(elements[j].type=='image'&&typeof elements[j].title!='undefined'&&typeof elements[j]['original-title']=='undefined'&&elements[j].className.indexOf('no_tooltip')==-1)convert_tooltip(elements[j]);}
break;}}
function initialise_error_mechanism()
{window.onerror=function(msg,file,code)
{if(typeof msg.indexOf=='undefined')return null;if(document.readyState!='complete')return null;if((msg.indexOf('AJAX_REQUESTS is not defined')!=-1)||(((msg.indexOf("'null' is not an object")!=-1)||(msg.indexOf("'undefined' is not a function")!=-1))&&((typeof file=='undefined')||(file=='undefined')))||((code=='0')&&(msg.indexOf('Script error.')!=-1))||(msg.indexOf("attempt to run compile-and-go script on a cleared scope")!=-1)||(msg.indexOf('UnnamedClass.toString')!=-1)||(msg.indexOf('ASSERT: ')!=-1)||((file)&&(file.indexOf('TODO: FIXME')!=-1))||(msg.indexOf('TODO: FIXME')!=-1)||(msg.indexOf('Location.toString')!=-1)||(msg.indexOf('Error loading script')!=-1)||(msg.indexOf('NS_ERROR_FAILURE')!=-1)||(msg.indexOf('can only be used in extension processes')!=-1)||(msg.indexOf('extension.')!=-1)||false)
return null;if((typeof window.done_one_error=='undefined')||(!window.done_one_error))
{window.done_one_error=true;var alert='An error occurred when loading this screen onto the web browser. You are being notified of this as you are staff. If you believe this is a bug in BeatGrid, please contact the developers with full details. More details are available in your browser\'s error console. The error was:\n\n'+code+': '+msg+'\n'+file;if(window.document.body)
window.fauxmodal_alert(alert,null,'An error has occurred');}
return false;};add_event_listener_abstract(window,'beforeunload',function(){window.onerror=null;});}
if((typeof window.take_errors!='undefined')&&(window.take_errors))initialise_error_mechanism();if(typeof window.unloaded=='undefined')
{window.unloaded=false;}
add_event_listener_abstract(window,'beforeunload',function(){window.unloaded=true;});function staff_unload_action()
{undo_staff_unload_action();if(document.activeElement&&typeof document.activeElement.href!='undefined'&&document.activeElement.href!=null)
{var url=document.activeElement.href.replace(/.*:\/\/[^\/:]+/,'');if(url.indexOf('download')!=-1||url.indexOf('export')!=-1)
return;}
if((typeof document.querySelector!='undefined')&&document.querySelector('meta[http-equiv="Refresh"]'))
{return;}
var bi=document.getElementById('main_website_inner');if(bi)
{bi.className+=' site_unloading';if(typeof window.fade_transition!='undefined')
{fade_transition(bi,20,30,-4);}}
var div=document.createElement('div');div.className='unload_action';div.style.width='100%';div.style.top=(get_window_height()/2-160)+'px';div.style.position='fixed';div.style.zIndex=10000;div.style.textAlign='center';set_inner_html(div,'<div aria-busy="true" class="loading_box box"><h2>Loading&hellip;</h2><img id="loading_image" alt="" src="'+'data:image/gif;base64,R0lGODlhFAAUANU9ANVoZshVVfO3trY6OfaWlqcmJu+ZmP3s6ulpZ/7h4edZVvXVx+2JifnZ2fXCweQzMdtxcfbMzOF9eu+hoK4cGuqEhOVIRsJMS/fW1rxDQv7w7uM/Pe6Ed+ylmfze3rMmJPOurut6evGxoupycud/f/ni3vrc3P3Qy288PPrLxfvm4+hgXvbd2a0vL++Pj/7Z1qEdHfGnp/y/uLgwLLQhHexxaeePhOZQTuB3d/uenuWTjc9eXVETE////wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFMgA9ACwAAAAAFAAUAAAGn8CecEgsGo/IpHLJFKJ40Kh0Gn2WTtis9pTqOlIiqCxHLhPOLheDUSGRbGLymZBWV9oSHA4iEaPVbCR5exAAADsAUAJrbYKEhoc7AQE7UCKOj5GTARcXGRdQHRCFkZKcnhkZA6tQOpqnqKsDLbQzUBKTnamytC0FvzAfUACpqqu9vwUwyzAUULEDM9IfHzQ0FNjYNDxPVN5SKE3i4+RCQQAh+QQFMgA9ACwBAAUABgAGAAAGGECNUHN4HRJIQe+YUC49oJ5UFZX2HFZpEAAh+QQFMgA9ACwBAAUACwALAAAGPMCesKcpFg+vYS/B9HhASqfTBB16TKZGI6bMNjCYiVKFiUQcOmWv5BCAKuoeKzYBxHsLxl3Yuex7AX89QQAh+QQFMgA9ACwBAAUAEAALAAAGTMCecDjUGDWHw4nI9JiejRiTaGpYMYbpsIHBRBw6rTDyFQgq4p5DAIrFJGJ2bGJwQdKGOoOUdjEqISMIGWIigQgICmk9HDUIKwoDi0EAIfkEBTIAPQAsBgAFAA0ACwAABkDAnnAo1PQOhxJx2cBgWMthJOJwdKI9h0AAkmBBsYkBghW7GAAsoxIa7bBtBAI7QqxWt1l0pbjdLC1YfRYbWEJBACH5BAUyAD0ALAkABQAKAAsAAAYuwJ5wOFQRj0jiItmLCZIGlwFZCY04RCsCsUIQVwrFzTIUjzebwtCCfjzWbTcxCAAh+QQFyAA9ACwPAAwABAAEAAAGDMCe8CZ8bHqPpPIRBAA7'.replace(/^https?:/,window.location.protocol)+'" /></div>');window.setTimeout(function(){if(document.getElementById('loading_image'))document.getElementById('loading_image').src+='';},100);document.body.appendChild(div);add_event_listener_abstract(window,'pageshow',undo_staff_unload_action);add_event_listener_abstract(window,'keydown',undo_staff_unload_action);add_event_listener_abstract(window,'click',undo_staff_unload_action);}
function undo_staff_unload_action()
{var pre=get_elements_by_class_name(document.body,'unload_action');for(var i=0;i<pre.length;i++)
{pre[i].parentNode.removeChild(pre[i]);}
var bi=document.getElementById('main_website_inner');if(bi)
{if((typeof window.fade_transition_timers!='undefined')&&(window.fade_transition_timers[bi.fader_key]))
{window.clearTimeout(window.fade_transition_timers[bi.fader_key]);window.fade_transition_timers[bi.fader_key]=null;}
bi.className=bi.className.replace(/ site_unloading/g,'');}}
function placeholder_focus(ob,def)
{if(typeof def=='undefined')def=ob.defaultValue;if(ob.value==def)
{ob.value='';}
ob.className=ob.className.replace('field_input_non_filled','field_input_filled');}
function placeholder_blur(ob,def)
{if(typeof def=='undefined')def=ob.defaultValue;if(ob.value=='')
{ob.value=def;}
if(ob.value==def)
{ob.className=ob.className.replace('field_input_filled','field_input_non_filled');}}
function set_font_size(size)
{var old_size=read_cookie('font_size');var old_sizer=document.getElementById('font_size_'+old_size);if(old_sizer)old_sizer.className=old_sizer.className.replace(/ selected/g,'');document.body.style.fontSize=size+'px';set_cookie('font_size',size,120);var new_sizer=document.getElementById('font_size_'+size);if(new_sizer)new_sizer.className+=' selected';}
function check_field_for_blankness(field,event)
{if(!field)return true;if(typeof field.nodeName=='undefined')return true;var value;if(field.nodeName.toLowerCase()=='select')
{value=field.options[field.selectedIndex].value;}else
{value=field.value;}
var ee=document.getElementById('error_'+field.id);if((value.replace(/\s/g,'')=='')||(value=='****')||(value==field.alt)||(value=='Make your post civil and relevant.')||(value=='To reply to an existing post use the reply/quote button under it. Type fresh posts here when not replying to any existing post.\n\nMake your post civil and relevant.'))
{if(event)
{cancel_bubbling(event);}
if(ee!==null)
{ee.style.display='block';set_inner_html(ee,'This is a required field and cannot be left blank');}
window.fauxmodal_alert('Please check back over the form - you did not fill in all fields on the form correctly');return false;}
if(ee!==null)
{ee.style.display='none';}
return true;}
function disable_button_just_clicked(input,permanent)
{if(typeof permanent=='undefined')permanent=false;if(input.nodeName.toLowerCase()=='form')
{for(var i=0;i<input.elements.length;i++)
if((input.elements[i].type=='submit')||(input.elements[i].type=='button')||(input.elements[i].type=='image')||(input.elements[i].nodeName.toLowerCase()=='button'))
disable_button_just_clicked(input.elements[i]);return;}
if(input.form.target=='_blank')return;window.setTimeout(function(){input.disabled=true;input.under_timer=true;},20);input.style.cursor='wait';if(!permanent)
{var timeout=null;var goback=function(){if(timeout!=null)
{window.clearTimeout(timeout);timeout=null;}
if(input.under_timer)
{input.disabled=false;input.under_timer=false;input.style.cursor='default';}};timeout=window.setTimeout(goback,5000);if(input.form.target=='preview_iframe')
{var interval=window.setInterval(function(){if(frames['preview_iframe'].document&&frames['preview_iframe'].document.body){if(interval!=null)
{window.clearInterval(interval);interval=null;}
goback();}},500);}}else input.under_timer=false;add_event_listener_abstract(window,'pagehide',goback);}
function manage_scroll_height(ob)
{var height=ob.scrollHeight;if((height>5)&&(sts(ob.style.height)<height)&&(find_height(ob)<height))
{ob.style.height=height+'px';ob.style.boxSizing='border-box';ob.style.overflowY='hidden';trigger_resize();}}
function handle_textarea_scrolling()
{var i;var elements=document.getElementsByTagName('textarea');for(i=0;i<elements.length;i++)
{if(elements[i].className.indexOf('textarea_scroll')!=-1)
{elements[i].setAttribute('wrap','off');elements[i].style.overflow='auto';}}}
function generate_question_ui(message,button_set,window_title,fallback_message,callback,dialog_width,dialog_height)
{var image_set=[];var new_button_set=[];for(var s in button_set)
{new_button_set.push(button_set[s]);image_set.push(s);}
button_set=new_button_set;if((typeof window.showModalDialog!='undefined')||true)
{if(button_set.length>4)dialog_height+=5*(button_set.length-4);var url=maintain_theme_in_link('https://csm.wearebeatgrid.com/data/question_ui.php?message='+window.encodeURIComponent(message)+'&image_set='+window.encodeURIComponent(image_set.join(','))+'&button_set='+window.encodeURIComponent(button_set.join(','))+'&window_title='+window.encodeURIComponent(window_title)+keep_stub());if(typeof dialog_width=='undefined')dialog_width=440;if(typeof dialog_height=='undefined')dialog_height=180;window.faux_showModalDialog(url,null,'dialogWidth='+dialog_width+';dialogHeight='+dialog_height+';status=no;unadorned=yes',function(result)
{if((typeof result=='undefined')||(result===null))
{callback(button_set[0]);}else
{callback(result);}});return;}
if(button_set.length==1)
{window.fauxmodal_alert(fallback_message?fallback_message:message,function()
{callback(button_set[0]);},window_title);}else
if(button_set.length==2)
{window.fauxmodal_confirm(fallback_message?fallback_message:message,function(result)
{callback(result?button_set[1]:button_set[0]);},window_title);}else
{if(!fallback_message)
{message+='\n\nType either: ';for(var i=0;i<button_set.length;i++)
{message+=button_set[i]+',';}
message=message.substr(0,message.length-1);}else message=fallback_message;window.fauxmodal_prompt(message,'',function(result)
{if((typeof result=='undefined')||(result===null))
{callback(button_set[0]);return;}else
{if(result=='')
{callback(button_set[1]);return;}
for(var i=0;i<button_set.length;i++)
{if(result.toLowerCase()==button_set[i].toLowerCase())
{callback(result);return;}}}
callback(button_set[0]);},window_title);}}
function get_main_cms_window(any_large_ok)
{if(typeof any_large_ok=='undefined')any_large_ok=false;if(document.getElementById('main_website'))return window;if((any_large_ok)&&(get_window_width()>300))return window;try
{if((window.parent)&&(window.parent!=window)&&(typeof window.parent.get_main_cms_window!='undefined'))return window.parent.get_main_cms_window();}
catch(e){}
try
{if((window.opener)&&(typeof window.opener.get_main_cms_window!='undefined'))return window.opener.get_main_cms_window();}
catch(e){}
return window;}
function doc_onmouseout()
{if(typeof window.orig_helper_text!='undefined')
{var help=document.getElementById('help');if(!help)return;set_inner_html(help,window.orig_helper_text);if(typeof window.fade_transition!='undefined')
{set_opacity(help,0.0);fade_transition(help,100,30,4);}
help.className='global_helper_panel_text';}}
function doc_onmouseover(i)
{var doc=document.getElementById('doc_'+i);if((doc)&&(get_inner_html(doc)!=''))
{var help=document.getElementById('help');if(!help)return;window.orig_helper_text=get_inner_html(help);set_inner_html(help,get_inner_html(doc));if(typeof window.fade_transition!='undefined')
{set_opacity(help,0.0);fade_transition(help,100,30,4);}
help.className='global_helper_panel_text_over';}}
function script_page_rendered()
{}
function helper_panel(show)
{var panel_right=document.getElementById('panel_right');var middles=get_elements_by_class_name(document,'global_middle');var global_message=document.getElementById('global_message');var helper_panel_contents=document.getElementById('helper_panel_contents');var helper_panel_toggle=document.getElementById('helper_panel_toggle');var i;if(show)
{panel_right.className=panel_right.className.replace(/ helper_panel_hidden/g,'');helper_panel_contents.setAttribute('aria-expanded','true');helper_panel_contents.style.display='block';if(typeof window.fade_transition!='undefined')
{set_opacity(helper_panel_contents,0.0);fade_transition(helper_panel_contents,100,30,4);}
if(read_cookie('hide_helper_panel')=='1')set_cookie('hide_helper_panel','0',100);helper_panel_toggle.onclick=function(){return helper_panel(false);};helper_panel_toggle.childNodes[0].src='https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/icons/14x14/helper_panel_hide.png'.replace(/^https?:/,window.location.protocol);if(typeof helper_panel_toggle.childNodes[0].srcset!='undefined')
helper_panel_toggle.childNodes[0].srcset='https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/icons/28x28/helper_panel_hide.png 2x'.replace(/^https?:/,window.location.protocol);}else
{if(read_cookie('hide_helper_panel')=='')
{window.fauxmodal_confirm('You have chosen to contract the help panel, and it will remain so until you expand it again. It is not advised that you leave the panel contracted, as you may miss program help. Confirm if you sure you wish to contract the help panel (and save a cookie on your computer).',function(answer)
{if(answer)
_hide_helper_panel(middles,panel_right,global_message,helper_panel_contents,helper_panel_toggle);});return false;}
_hide_helper_panel(middles,panel_right,global_message,helper_panel_contents,helper_panel_toggle);}
return false;}
function _hide_helper_panel(middles,panel_right,global_message,helper_panel_contents,helper_panel_toggle)
{panel_right.className+=' helper_panel_hidden';helper_panel_contents.setAttribute('aria-expanded','false');helper_panel_contents.style.display='none';set_cookie('hide_helper_panel','1',100);helper_panel_toggle.onclick=function(){return helper_panel(true);};helper_panel_toggle.childNodes[0].src='https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/icons/14x14/helper_panel_show.png'.replace(/^https?:/,window.location.protocol);if(typeof helper_panel_toggle.childNodes[0].srcset!='undefined')
helper_panel_toggle.childNodes[0].srcset='https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/icons/28x28/helper_panel_show.png 2x'.replace(/^https?:/,window.location.protocol);}
function sts(src)
{if(!src)return 0;if(src.indexOf('px')==-1)return 0;return window.parseInt(src.replace('px',''));}
function capture_click_key_states(event)
{window.capture_event=event;}
function magic_keypress(event)
{if(typeof window.capture_event!='undefined')event=window.capture_event;var count=0;if(event.shiftKey)count++;if(event.ctrlKey)count++;if(event.metaKey)count++;if(event.altKey)count++;return(count>=2);}
function escape_html(value)
{if(!value)return'';return value.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(new RegExp('<','g'),'&lt;').replace(/>/g,'&gt;');}
function escape_comcode(value)
{return value.replace(/\\/g,'\\\\').replace(/"/g,'\\"');}
function create_rollover(rand,rollover)
{var img=document.getElementById(rand);if(!img)return;new Image().src=rollover;var activate=function()
{img.old_src=img.getAttribute('src');if(typeof img.origsrc!='undefined')img.old_src=img.origsrc;img.setAttribute('src',rollover);};var deactivate=function()
{img.setAttribute('src',img.old_src);};add_event_listener_abstract(img,'mouseover',activate);add_event_listener_abstract(img,'click',deactivate);add_event_listener_abstract(img,'mouseout',deactivate);}
function set_cookie(cookie_name,cookie_value,num_days)
{var today=new Date();var expire=new Date();if(num_days==null||num_days==0)num_days=1;expire.setTime(today.getTime()+3600000*24*num_days);var extra='';if('/'!='')extra=extra+';path=/';if(''!='')extra=extra+';domain=';var to_set=cookie_name+'='+window.encodeURIComponent(cookie_value)+';expires='+expire.toUTCString()+extra;document.cookie=to_set;var read=read_cookie(cookie_name);if((read!=cookie_value)&&(read))
{window.done_cookie_alert=true;}}
function read_cookie(cookie_name)
{var theCookie=''+document.cookie;var ind=theCookie.indexOf(' '+cookie_name+'=');if((ind==-1)&&(theCookie.substr(0,cookie_name.length+1)==cookie_name+'='))ind=0;else if(ind!=-1)ind++;if(ind==-1||cookie_name=='')return'';var ind1=theCookie.indexOf(';',ind);if(ind1==-1)ind1=theCookie.length;return window.decodeURIComponent(theCookie.substring(ind+cookie_name.length+1,ind1));}
function first_class_name(class_name)
{var p=class_name.indexOf(' ');if(p!=-1)
{return class_name.substr(0,p);}
return class_name;}
function element_has_class(element,class_name)
{if(typeof element.className=='undefined')return false;return(element.className.match(new RegExp('(^|\\s)'+class_name+'($|\\s)')));}
function get_elements_by_class_name(node,class_name)
{if(node)
{var a=[];var re=new RegExp('(^|\\s)'+class_name+'($|\\s)');var els=node.getElementsByTagName('*');for(var i=0,j=els.length;i<j;i++)
{if(re.test(els[i].className))a.push(els[i]);}
return a;}
return[];}
function is_integer(val)
{if(val=='')return false;var c;for(var i=0;i<val.length;i++)
{c=val.charAt(i);if((c!='0')&&(c!='1')&&(c!='2')&&(c!='3')&&(c!='4')&&(c!='5')&&(c!='6')&&(c!='7')&&(c!='8')&&(c!='9'))
return false;}
return true;}
function browser_matches(code)
{var browser=navigator.userAgent.toLowerCase();var os=navigator.platform.toLowerCase()+' '+browser;var is_safari=browser.indexOf('applewebkit')!=-1;var is_chrome=browser.indexOf('chrome/')!=-1;var is_gecko=(browser.indexOf('gecko')!=-1)&&!is_safari;var _is_ie=((browser.indexOf('msie')!=-1)||(browser.indexOf('trident')!=-1)||(browser.indexOf('edge/')!=-1));var is_ie_8=(browser.indexOf('msie 8')!=-1)&&(_is_ie);var is_ie_8_plus=is_ie_8;var is_ie_9=(browser.indexOf('msie 9')!=-1)&&(_is_ie);var is_ie_9_plus=is_ie_9&&!is_ie_8;switch(code)
{case'non_concurrent':return browser.indexOf('iphone')!=-1||browser.indexOf('ipad')!=-1||browser.indexOf('android')!=-1||browser.indexOf('phone')!=-1||browser.indexOf('tablet')!=-1;case'ios':return browser.indexOf('iphone')!=-1||browser.indexOf('ipad')!=-1;case'android':return browser.indexOf('android')!=-1;case'wysiwyg':if('1'=='0')return false;return true;case'windows':return os.indexOf('windows')!=-1||os.indexOf('win32')!=-1;case'mac':return os.indexOf('mac')!=-1;case'linux':return os.indexOf('linux')!=-1;case'ie':return _is_ie;case'ie8':return is_ie_8;case'ie8+':return is_ie_8_plus;case'ie9':return is_ie_9;case'ie9+':return is_ie_9_plus;case'chrome':return is_chrome;case'gecko':return is_gecko;case'safari':return is_safari;}
return false;}
function get_base_url()
{return(window.location+'').replace(/(^.*:\/\/[^\/]*)\/.*/,'$1')+''.replace(/^.*:\/\/[^\/]*/,'');}
function confirm_session(callback)
{if(typeof window.do_ajax_request=='undefined')return;var url='/data/confirm_session.php'+keep_stub(true);require_javascript('ajax',window.do_ajax_request);if(typeof window.do_ajax_request=='undefined')return;var ret=do_ajax_request(url+keep_stub(true),function(ret){if(!ret)return;if(ret.responseText==='')
{callback(true);return;}
if(ret.responseText=='Guest')
{window.fauxmodal_prompt('Username','',function(promptt)
{_confirm_session(callback,promptt,url);},'Log in');return;}
_confirm_session(callback,ret.responseText,url);});}
function _confirm_session(callback,username,url)
{window.fauxmodal_prompt('Enter your password','',function(promptt)
{if(promptt!==null)
{do_ajax_request(url,function(ret){if(ret&&ret.responseText==='')
callback(true);else
_confirm_session(callback,username,url);},'login_username='+window.encodeURIComponent(username)+'&password='+window.encodeURIComponent(promptt));}else callback(false);},'Log in','password');}
function load_snippet(snippet_hook,post,callback)
{var title=get_inner_html(document.getElementsByTagName('title')[0]);title=title.replace(/ \u2013 .*/,'');var metas=document.getElementsByTagName('link');var i;if(!window.location)return null;var url=window.location.href;for(i=0;i<metas.length;i++)
{if(metas[i].getAttribute('rel')=='canonical')url=metas[i].getAttribute('href');}
if(!url)url=window.location.href;var html;if(typeof window.do_ajax_request!='undefined')
{var url2='/data/snippet.php?snippet='+snippet_hook+'&url='+window.encodeURIComponent(url)+'&title='+window.encodeURIComponent(title)+keep_stub();html=do_ajax_request(maintain_theme_in_link(url2),callback,post);}
if(callback)return null;return html.responseText;}
function require_css(sheet)
{if(document.getElementById('loading_css_'+sheet))return;var link=document.createElement('link');link.setAttribute('id','loading_css_'+sheet);link.setAttribute('type','text/css');link.setAttribute('rel','stylesheet');link.setAttribute('href','/data/sheet.php?sheet='+sheet+keep_stub());document.getElementsByTagName('head')[0].appendChild(link);}
function require_javascript(script,detector)
{if(document.getElementById('loading_js_'+script))return;if(typeof detector!='undefined')return;var link=document.createElement('script');link.setAttribute('id','loading_js_'+script);link.setAttribute('type','text/javascript');var url='/data/javascript.php?script='+script+keep_stub();link.setAttribute('src',url);document.getElementsByTagName('head')[0].appendChild(link);}
function find_url_tab(hash)
{if(typeof hash=='undefined')hash=window.location.hash;if(hash.replace(/^#/,'')!='')
{var tab=hash.replace(/^#/,'').replace(/^tab\_\_/,'');if(document.getElementById('g_'+tab))
{select_tab('g',tab);}
else if((tab.indexOf('__')!=-1)&&(document.getElementById('g_'+tab.substr(0,tab.indexOf('__')))))
{var old=hash;select_tab('g',tab.substr(0,tab.indexOf('__')));window.location.hash=old;}}}
function select_tab(id,tab,from_url,automated)
{if(typeof from_url=='undefined')from_url=false;if(typeof automated=='undefined')automated=false;if(!from_url)
{var tab_marker=document.getElementById('tab__'+tab.toLowerCase());if(tab_marker)
{tab_marker.id='';window.location.hash='#tab__'+tab.toLowerCase();tab_marker.id='tab__'+tab.toLowerCase();}}
var tabs=[];var i,element;element=document.getElementById('t_'+tab);for(i=0;i<element.parentNode.childNodes.length;i++)
{if((element.parentNode.childNodes[i].id)&&(element.parentNode.childNodes[i].id.substr(0,2)=='t_'))
tabs.push(element.parentNode.childNodes[i].id.substr(2));}
for(i=0;i<tabs.length;i++)
{element=document.getElementById(id+'_'+tabs[i]);if(element)
{element.style.display=(tabs[i]==tab)?'block':'none';if((typeof window.fade_transition!='undefined')&&(tabs[i]==tab))
{if(typeof window['load_tab__'+tab]=='undefined')
{set_opacity(element,0.0);fade_transition(element,100,30,8);}}}
element=document.getElementById('t_'+tabs[i]);if(element)
{if(element.className.indexOf('tab_active')!=-1)
element.className=element.className.replace(/ tab_active/g,'');if(tabs[i]==tab)element.className+=' tab_active';}}
if(typeof window['load_tab__'+tab]!='undefined')window['load_tab__'+tab](automated,document.getElementById(id+'_'+tab));return false;}
function set_display_with_aria(element,mode)
{element.style.display=mode;element.setAttribute('aria-hidden',(mode=='none')?'true':'false');}
function matches_theme_image(src,url)
{return(src.replace(/^https?:/,window.location.protocol)==url.replace(/^https?:/,window.location.protocol));}
function set_tray_theme_image(pic,before_theme_img,after_theme_img,before1_url,after1_url,after1_url_2x,after2_url,after2_url_2x)
{var is_1=matches_theme_image(pic.src,before1_url);if(is_1)
{if(pic.src.indexOf('themewizard.php')!=-1)
{pic.src=pic.src.replace(before_theme_img,after_theme_img);}else
{pic.src=after1_url.replace(/^https?:/,window.location.protocol);}}else
{if(pic.src.indexOf('themewizard.php')!=-1)
{pic.src=pic.src.replace(before_theme_img+'2',after_theme_img+'2');}else
{pic.src=after2_url.replace(/^https?:/,window.location.protocol);}}
if(typeof pic.srcset!='undefined')
{if(is_1)
{if(pic.srcset.indexOf('themewizard.php')!=-1)
{pic.srcset=pic.srcset.replace(before_theme_img,after_theme_img);}else
{pic.srcset=after1_url_2x.replace(/^https?:/,window.location.protocol);}}else
{if(pic.srcset.indexOf('themewizard.php')!=-1)
{pic.srcset=pic.srcset.replace(before_theme_img+'2',after_theme_img+'2');}else
{pic.srcset=after2_url_2x.replace(/^https?:/,window.location.protocol);}}}}
function toggleable_tray(element,no_animate,cookie_id_name)
{if(typeof element=='string')element=document.getElementById(element);if(!element)return false;if(element.className.indexOf('toggleable_tray')==-1)
{var toggleables=get_elements_by_class_name(element,'toggleable_tray');if(typeof toggleables[0]!='undefined')element=toggleables[0];}
if(typeof cookie_id_name!='undefined')
{set_cookie('tray_'+cookie_id_name,(element.style.display=='none')?'open':'closed');}
var type='block';if(element.nodeName.toLowerCase()=='table')type='table';if(element.nodeName.toLowerCase()=='tr')type='table-row';var _pic=get_elements_by_class_name(element.parentNode,'toggleable_tray_button');var pic;if(typeof _pic[0]!='undefined')
{pic=_pic[0].getElementsByTagName('img')[0];}else
{pic=document.getElementById('e_'+element.id);}
if(pic)
{if(matches_theme_image(pic.src,'https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/1x/trays/expcon.png'))return false;if(matches_theme_image(pic.src,'https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/1x/trays/expcon2.png'))return false;}
element.setAttribute('aria-expanded',(type=='none')?'false':'true');if(element.style.display=='none')
{element.style.display=type;if((type=='block')&&(element.nodeName.toLowerCase()=='div')&&(!no_animate)&&((!pic)||(pic.src.indexOf('themewizard.php')==-1)))
{element.style.visibility='hidden';element.style.width=find_width(element)+'px';element.style.position='absolute';if(pic)
{set_tray_theme_image(pic,'expand','expcon','https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/1x/trays/expand.png','https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/1x/trays/expcon.png','https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/2x/trays/expcon.png','https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/1x/trays/expcon2.png','https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/2x/trays/expcon2.png');}
window.setTimeout(function(){begin_toggleable_tray_animation(element,20,70,-1,pic);},20);}else
{if(typeof window.fade_transition!='undefined')
{set_opacity(element,0.0);fade_transition(element,100,30,4);}
if(pic)
{set_tray_theme_image(pic,'expand','contract','https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/1x/trays/expand.png','https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/1x/trays/contract.png','https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/2x/trays/contract.png','https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/1x/trays/contract2.png','https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/2x/trays/contract2.png');}}}else
{if((type=='block')&&(element.nodeName.toLowerCase()=='div')&&(!no_animate)&&((!pic)||(pic.src.indexOf('themewizard.php')==-1)))
{if(pic)
{set_tray_theme_image(pic,'contract','expcon','https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/1x/trays/contract.png','https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/1x/trays/expcon.png','https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/2x/trays/expcon.png','https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/1x/trays/expcon2.png','https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/2x/trays/expcon2.png');}
window.setTimeout(function(){begin_toggleable_tray_animation(element,-20,70,0,pic);},20);}else
{if(pic)
{set_tray_theme_image(pic,'contract','expand','https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/1x/trays/contract.png','https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/1x/trays/expand.png','https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/2x/trays/expand.png','https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/1x/trays/expand2.png','https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/2x/trays/expand2.png');pic.setAttribute('alt',pic.getAttribute('alt').replace('Contract','Expand'));pic.title='Expand';pic.cms_tooltip_title='Expand';}
element.style.display='none';}}
trigger_resize(true);return false;}
function begin_toggleable_tray_animation(element,animate_dif,animate_ticks,final_height,pic)
{var full_height=find_height(element,true);if(final_height==-1)
{final_height=full_height;element.style.height='0px';element.style.visibility='visible';element.style.position='static';}
if(full_height>300)
{toggleable_tray_done(element,final_height,animate_dif,'hidden',animate_ticks,pic);return;}
element.style.outline='1px dashed gray';if(typeof window.fade_transition!='undefined')
{if(final_height==0)
{set_opacity(element,1.0);fade_transition(element,0,30,4);}else
{set_opacity(element,0.0);fade_transition(element,100,30,4);}}
var orig_overflow=element.style.overflow;element.style.overflow='hidden';window.setTimeout(function(){toggleable_tray_animate(element,final_height,animate_dif,orig_overflow,animate_ticks,pic);},animate_ticks);}
function toggleable_tray_animate(element,final_height,animate_dif,orig_overflow,animate_ticks,pic)
{var current_height=((element.style.height=='auto')||(element.style.height==''))?(find_height(element)):sts(element.style.height);if(((current_height>final_height)&&(animate_dif<0))||((current_height<final_height)&&(animate_dif>0)))
{var num=Math.max(current_height+animate_dif,0);if(animate_dif>0)num=Math.min(num,final_height);element.style.height=num+'px';window.setTimeout(function(){toggleable_tray_animate(element,final_height,animate_dif,orig_overflow,animate_ticks,pic);},animate_ticks);}else
{toggleable_tray_done(element,final_height,animate_dif,orig_overflow,animate_ticks,pic);}}
function toggleable_tray_done(element,final_height,animate_dif,orig_overflow,animate_ticks,pic)
{element.style.height='auto';if(animate_dif<0)
{element.style.display='none';}
element.style.overflow=orig_overflow;element.style.outline='0';if(pic)
{if(animate_dif<0)
{set_tray_theme_image(pic,'expcon','expand','https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/1x/trays/expcon.png','https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/1x/trays/expand.png','https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/2x/trays/expand.png','https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/1x/trays/expand2.png','https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/2x/trays/expand2.png');}else
{set_tray_theme_image(pic,'expcon','contract','https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/1x/trays/expcon.png','https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/1x/trays/contract.png','https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/2x/trays/contract.png','https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/1x/trays/contract2.png','https://csm.wearebeatgrid.com/themes/BeatGrid_CSM/images/2x/trays/contract2.png');}
pic.setAttribute('alt',pic.getAttribute('alt').replace((animate_dif<0)?'Contract':'Expand',(animate_dif<0)?'Expand':'Contract'));pic.cms_tooltip_title=(animate_dif<0)?'Expand':'Contract';}
trigger_resize(true);}
function handle_tray_cookie_setting(id)
{var cookie_value=read_cookie('tray_'+id);var element=document.getElementById('tray_'+id);if(!element)element=document.getElementById(id);if(!element)return;if(element.className.indexOf('toggleable_tray')==-1)
{var toggleables=get_elements_by_class_name(element,'toggleable_tray');if(typeof toggleables[0]!='undefined')element=toggleables[0];}
if(((element.style.display=='none')&&(cookie_value=='open'))||((element.style.display!='none')&&(cookie_value=='closed')))
toggleable_tray(element,true);}
function animate_frame_load(pf,frame,leave_gap_top,leave_height)
{if(!pf)return;if(typeof leave_gap_top=='undefined')leave_gap_top=0;if(typeof leave_height=='undefined')leave_height=false;if(!leave_height)
pf.style.height=window.top.get_window_height()+'px';illustrate_frame_load(pf,frame);var ifuob=window.top.document.getElementById('iframe_under');var extra=ifuob?((window!=window.top)?find_pos_y(ifuob):0):0;if(ifuob)ifuob.scrolling='no';if(window==window.top)
window.top.smooth_scroll(find_pos_y(pf)+extra-leave_gap_top);}
function illustrate_frame_load(pf,frame)
{pf.style.height='80px';var head='<style>',cssText='';if(!browser_matches('ie8'))
{for(var i=0;i<document.styleSheets.length;i++)
{try
{if((typeof document.styleSheets[i].href!='undefined')&&(document.styleSheets[i].href)&&(document.styleSheets[i].href.indexOf('/global')==-1)&&(document.styleSheets[i].href.indexOf('/merged')==-1))continue;if(typeof document.styleSheets[i].cssText!='undefined')
{cssText+=document.styleSheets[i].cssText;}else
{var rules=[];try{rules=document.styleSheets[i].cssRules?document.styleSheets[i].cssRules:document.styleSheets[i].rules;}
catch(e){}
if(rules)
{for(var j=0;j<rules.length;j++)
{if(rules[j].cssText)
cssText+=rules[j].cssText+"\n\n";else
cssText+=rules[j].selectorText+'{ '+rules[j].style.cssText+"}\n\n";}}}}
catch(e){}}}
head+=cssText+'<\/style>';try
{if(!window.frames[frame])return;if(!window.frames[frame].document)return;var doc=window.frames[frame].document;if(!doc)return;var de=doc.documentElement;if(!de)return;}
catch(e)
{pf.scrolling='auto';return;}
var body=de.getElementsByTagName('body');if(body.length==0)
{set_inner_html(de,'<head>'+head+'<\/head><body aria-busy="true" class="website_body main_website_faux"><div class="spaced"><div class="ajax_loading vertical_alignment"><img id="loading_image" src="'+'data:image/gif;base64,R0lGODlhFAAUANU9ANVoZshVVfO3trY6OfaWlqcmJu+ZmP3s6ulpZ/7h4edZVvXVx+2JifnZ2fXCweQzMdtxcfbMzOF9eu+hoK4cGuqEhOVIRsJMS/fW1rxDQv7w7uM/Pe6Ed+ylmfze3rMmJPOurut6evGxoupycud/f/ni3vrc3P3Qy288PPrLxfvm4+hgXvbd2a0vL++Pj/7Z1qEdHfGnp/y/uLgwLLQhHexxaeePhOZQTuB3d/uenuWTjc9eXVETE////wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFMgA9ACwAAAAAFAAUAAAGn8CecEgsGo/IpHLJFKJ40Kh0Gn2WTtis9pTqOlIiqCxHLhPOLheDUSGRbGLymZBWV9oSHA4iEaPVbCR5exAAADsAUAJrbYKEhoc7AQE7UCKOj5GTARcXGRdQHRCFkZKcnhkZA6tQOpqnqKsDLbQzUBKTnamytC0FvzAfUACpqqu9vwUwyzAUULEDM9IfHzQ0FNjYNDxPVN5SKE3i4+RCQQAh+QQFMgA9ACwBAAUABgAGAAAGGECNUHN4HRJIQe+YUC49oJ5UFZX2HFZpEAAh+QQFMgA9ACwBAAUACwALAAAGPMCesKcpFg+vYS/B9HhASqfTBB16TKZGI6bMNjCYiVKFiUQcOmWv5BCAKuoeKzYBxHsLxl3Yuex7AX89QQAh+QQFMgA9ACwBAAUAEAALAAAGTMCecDjUGDWHw4nI9JiejRiTaGpYMYbpsIHBRBw6rTDyFQgq4p5DAIrFJGJ2bGJwQdKGOoOUdjEqISMIGWIigQgICmk9HDUIKwoDi0EAIfkEBTIAPQAsBgAFAA0ACwAABkDAnnAo1PQOhxJx2cBgWMthJOJwdKI9h0AAkmBBsYkBghW7GAAsoxIa7bBtBAI7QqxWt1l0pbjdLC1YfRYbWEJBACH5BAUyAD0ALAkABQAKAAsAAAYuwJ5wOFQRj0jiItmLCZIGlwFZCY04RCsCsUIQVwrFzTIUjzebwtCCfjzWbTcxCAAh+QQFyAA9ACwPAAwABAAEAAAGDMCe8CZ8bHqPpPIRBAA7'.replace(/^https?:/,window.location.protocol)+'" alt="Loading&hellip;" /> <span class="vertical_alignment">Loading&hellip;<\/span><\/div><\/div><\/body>');}else
{body[0].className='website_body main_website_faux';var head_element=de.getElementsByTagName('head')[0];if(!head_element)
{head_element=document.createElement('head');de.appendChild(head_element);}
if(de.getElementsByTagName('style').length==0)
set_inner_html(head_element,head);set_inner_html(body[0],'<div aria-busy="true" class="spaced"><div class="ajax_loading"><img id="loading_image" class="vertical_alignment" src="'+'data:image/gif;base64,R0lGODlhFAAUANU9ANVoZshVVfO3trY6OfaWlqcmJu+ZmP3s6ulpZ/7h4edZVvXVx+2JifnZ2fXCweQzMdtxcfbMzOF9eu+hoK4cGuqEhOVIRsJMS/fW1rxDQv7w7uM/Pe6Ed+ylmfze3rMmJPOurut6evGxoupycud/f/ni3vrc3P3Qy288PPrLxfvm4+hgXvbd2a0vL++Pj/7Z1qEdHfGnp/y/uLgwLLQhHexxaeePhOZQTuB3d/uenuWTjc9eXVETE////wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFMgA9ACwAAAAAFAAUAAAGn8CecEgsGo/IpHLJFKJ40Kh0Gn2WTtis9pTqOlIiqCxHLhPOLheDUSGRbGLymZBWV9oSHA4iEaPVbCR5exAAADsAUAJrbYKEhoc7AQE7UCKOj5GTARcXGRdQHRCFkZKcnhkZA6tQOpqnqKsDLbQzUBKTnamytC0FvzAfUACpqqu9vwUwyzAUULEDM9IfHzQ0FNjYNDxPVN5SKE3i4+RCQQAh+QQFMgA9ACwBAAUABgAGAAAGGECNUHN4HRJIQe+YUC49oJ5UFZX2HFZpEAAh+QQFMgA9ACwBAAUACwALAAAGPMCesKcpFg+vYS/B9HhASqfTBB16TKZGI6bMNjCYiVKFiUQcOmWv5BCAKuoeKzYBxHsLxl3Yuex7AX89QQAh+QQFMgA9ACwBAAUAEAALAAAGTMCecDjUGDWHw4nI9JiejRiTaGpYMYbpsIHBRBw6rTDyFQgq4p5DAIrFJGJ2bGJwQdKGOoOUdjEqISMIGWIigQgICmk9HDUIKwoDi0EAIfkEBTIAPQAsBgAFAA0ACwAABkDAnnAo1PQOhxJx2cBgWMthJOJwdKI9h0AAkmBBsYkBghW7GAAsoxIa7bBtBAI7QqxWt1l0pbjdLC1YfRYbWEJBACH5BAUyAD0ALAkABQAKAAsAAAYuwJ5wOFQRj0jiItmLCZIGlwFZCY04RCsCsUIQVwrFzTIUjzebwtCCfjzWbTcxCAAh+QQFyAA9ACwPAAwABAAEAAAGDMCe8CZ8bHqPpPIRBAA7'.replace(/^https?:/,window.location.protocol)+'" alt="Loading&hellip;" /> <span class="vertical_alignment">Loading&hellip;<\/span><\/div><\/div>');}
var the_frame=window.frames[frame];window.setTimeout(function(){if(the_frame.document&&the_frame.document.getElementById('loading_image'))
{var i_new=document.createElement('img');i_new.src=the_frame.document.getElementById('loading_image').src;var i_default=the_frame.document.getElementById('loading_image');if(i_default)
{i_new.className=i_default.className;i_new.alt=i_default.alt;i_new.id=i_default.id;i_default.parentNode.replaceChild(i_new,i_default);}}},0);var style=de.getElementsByTagName('style')[0];if((style)&&(style.styleSheet))style.styleSheet.cssText=cssText;}
function smooth_scroll(dest_y,expected_scroll_y,dir,event_after)
{var scroll_y=get_window_scroll_y();if(typeof dest_y=='string')dest_y=find_pos_y(document.getElementById(dest_y),true);if(dest_y<0)dest_y=0;if((typeof expected_scroll_y!='undefined')&&(expected_scroll_y!=null)&&(expected_scroll_y!=scroll_y))return;if(typeof dir=='undefined'||!null)var dir=(dest_y>scroll_y)?1:-1;var distance_to_go=(dest_y-scroll_y)*dir;var dist=Math.round(dir*(distance_to_go/25));if(dir==-1&&dist>-25)dist=-25;if(dir==1&&dist<25)dist=25;if(((dir==1)&&(scroll_y+dist>=dest_y))||((dir==-1)&&(scroll_y+dist<=dest_y))||(distance_to_go>2000))
{try
{window.scrollTo(0,dest_y);}
catch(e){}
if(event_after)event_after();return;}
try
{window.scrollBy(0,dist);}
catch(e){return;}
window.setTimeout(function(){smooth_scroll(dest_y,scroll_y+dist,dir,event_after);},30);}
function abstract_get_computed_style(obj,property)
{if(obj.currentStyle)
{var index=property.indexOf('-');if(index!=-1)
{property=property.substring(0,index)+property.substring(index+1,index+2).toUpperCase()+property.substring(index+2,property.length);}
return obj.currentStyle[property];}
var ret=null;try{ret=document.defaultView.getComputedStyle(obj,null).getPropertyValue(property);}
catch(e){}
if(ret===null)ret='';if(ret===null)ret='';return ret;}
function change_class(box,theId,to,from)
{var cell=document.getElementById(theId);if(!cell)cell=theId;cell.className=(box.checked)?to:from;}
function register_mouse_listener(e)
{if(!window.mouse_listener_enabled)
{window.mouse_listener_enabled=true;add_event_listener_abstract(document.body,'mousemove',get_mouse_xy);if(typeof e!='undefined')get_mouse_xy(e);}}
function get_mouse_xy(e,win)
{if(typeof win=='undefined')win=window;win.mouse_x=get_mouse_x(e,win);win.mouse_y=get_mouse_y(e,win);win.ctrl_pressed=e.ctrlKey;win.alt_pressed=e.altKey;win.meta_pressed=e.metaKey;win.shift_pressed=e.shiftKey;return true}
function get_mouse_x(event,win)
{if(typeof win=='undefined')win=window;try
{if((typeof event.pageX!='undefined')&&(event.pageX))
{return event.pageX;}else if((typeof event.clientX!='undefined')&&(event.clientX))
{return event.clientX+get_window_scroll_x(win)}}
catch(err){}
return 0;}
function get_mouse_y(event,win)
{if(typeof win=='undefined')win=window;try
{if((typeof event.pageY!='undefined')&&(event.pageY))
{return event.pageY;}else if((typeof event.clientY!='undefined')&&(event.clientY))
{return event.clientY+get_window_scroll_y(win)}}
catch(err){}
return 0;}
function get_window_width(win)
{if(typeof win=='undefined')win=window;if(typeof win.innerWidth!='undefined')return win.innerWidth-18;if((win.document.documentElement)&&(win.document.documentElement.clientWidth))return win.document.documentElement.clientWidth;if((win.document.body)&&(win.document.body.clientWidth))return win.document.body.clientWidth;return 0;}
function get_window_height(win)
{if(typeof win=='undefined')win=window;if(typeof win.innerHeight!='undefined')return win.innerHeight-18;if((win.document.documentElement)&&(win.document.documentElement.clientHeight))return win.document.documentElement.clientHeight;if((win.document.body)&&(win.document.body.clientHeight))return win.document.body.clientHeight;return 0;}
function get_window_scroll_width(win)
{if(typeof win=='undefined')win=window;return win.document.body.scrollWidth;}
function get_window_scroll_height(win)
{if(typeof win=='undefined')win=window;var rect_a=win.document.body.parentNode.getBoundingClientRect();var a=rect_a.bottom-rect_a.top;var rect_b=win.document.body.getBoundingClientRect();var b=rect_b.bottom-rect_b.top;if(a>b)return a;return b;}
function get_window_scroll_x(win)
{if(typeof win=='undefined')win=window;if(typeof win.pageXOffset!='undefined')return win.pageXOffset;if((win.document.documentElement)&&(win.document.documentElement.scrollLeft))return win.document.documentElement.scrollLeft;if((win.document.body)&&(win.document.body.scrollLeft))return win.document.body.scrollLeft;if(typeof win.scrollX!='undefined')return win.scrollX;return 0;}
function get_window_scroll_y(win)
{if(typeof win=='undefined')win=window;if(typeof win.pageYOffset!='undefined')return win.pageYOffset;if((win.document.documentElement)&&(win.document.documentElement.scrollTop))return win.document.documentElement.scrollTop;if((win.document.body)&&(win.document.body.scrollTop))return win.document.body.scrollTop;if(typeof win.scrollTop!='undefined')return win.scrollTop;return 0;}
function find_pos_x(obj,not_relative)
{if(!obj)return 0;if(typeof not_relative=='undefined')not_relative=false;var ret=obj.getBoundingClientRect().left+get_window_scroll_x();if(!not_relative)
{var position;while(obj!=null)
{position=abstract_get_computed_style(obj,'position');if(position=='fixed'||position=='absolute'||position=='relative')
{ret-=find_pos_x(obj,true);break;}
obj=obj.parentNode;}}
return ret;}
function find_pos_y(obj,not_relative)
{if(!obj)return 0;if(typeof not_relative=='undefined')not_relative=false;var ret=obj.getBoundingClientRect().top+get_window_scroll_y();if(!not_relative)
{var position;while(obj!=null)
{position=abstract_get_computed_style(obj,'position');if(position=='fixed'||position=='absolute'||position=='relative')
{ret-=find_pos_y(obj,true);break;}
obj=obj.parentNode;}}
return ret;}
function find_width(obj,take_padding_and_border)
{if(typeof take_padding_and_border=='undefined')take_padding_and_border=false;if(!obj)return 0;var ret=obj.offsetWidth;if(take_padding_and_border)
{ret-=sts(abstract_get_computed_style(obj,'padding-left'));ret-=sts(abstract_get_computed_style(obj,'padding-right'));ret-=sts(abstract_get_computed_style(obj,'border-left-width'));ret-=sts(abstract_get_computed_style(obj,'border-right-width'));}
return ret;}
function find_height(obj,take_padding_and_border)
{if(typeof take_padding_and_border=='undefined')take_padding_and_border=false;if(!obj)return 0;var ret=obj.offsetHeight;if(take_padding_and_border)
{ret-=sts(abstract_get_computed_style(obj,'padding-top'));ret-=sts(abstract_get_computed_style(obj,'padding-bottom'));ret-=sts(abstract_get_computed_style(obj,'border-top-width'));ret-=sts(abstract_get_computed_style(obj,'border-bottom-width'));}
return ret;}
function enter_pressed(event,alt_char)
{if(typeof alt_char=='undefined')alt_char=false;if(typeof event=='undefined')event=window.event;if((alt_char)&&(((event.which)&&(event.which==alt_char.charCodeAt(0)))||((event.keyCode)&&(event.keyCode==alt_char.charCodeAt(0)))))return true;return(((event.which)&&(event.which==13))||((event.keyCode)&&(event.keyCode==13)));}
function key_pressed(event,key,no_error_if_bad)
{if(typeof event=='undefined')event=window.event;if(typeof window.anykeyokay=='undefined')window.anykeyokay=false;if(key.constructor==Array)
{for(var i=0;i<key.length;i++)
{if(key[i]==null)
{if((event.keyCode)&&((window.anykeyokay)||(event.keyCode<48)||(event.keyCode==86)||(event.keyCode==91)||(event.keyCode==224))&&(event.keyCode!=32))
{window.anykeyokay=true;window.setTimeout(function(){window.anykeyokay=false;},5);return true;}}else
{if(key_pressed(event,key[i]))return true;}}
var targ;if(typeof event.target!='undefined')targ=event.target;else targ=event.srcElement;if(!no_error_if_bad)
{var current_bg=abstract_get_computed_style(targ,'background');if((typeof current_bg=='undefined')||(current_bg))current_bg='white';if(current_bg!='#FF8888')
window.setTimeout(function(){targ.style.background=current_bg;},400);targ.style.background='#FF8888';}
return false;}
if((key==='-')&&(event.keyCode==173))key=173;if((key==='-')&&(event.keyCode==189))key=189;if(key==='-')key=109;if(key==='/')key=191;if((key==='.')&&(event.keyCode==190))key=190;if((key==='.')&&(event.keyCode==110))key=110;if((key==='_')&&(event.keyCode==173)&&(event.shiftKey))key=173;if((key==='_')&&(event.keyCode==189)&&(event.shiftKey))key=189;if(key==='_')key=0;if((key.constructor==String)&&(key.match(/^\d+-\d+$/)))
{var unicode=event.charCode;if(unicode==0)unicode=event.keyCode;if((unicode>=key.replace(/-\d+$/,''))&&(unicode<=key.replace(/^\d+-/,'')))
{return true;}}
if(key.constructor==String)
{if((event.shiftKey)&&(key.toUpperCase()==key.toLowerCase()))return false;key=key.toUpperCase().charCodeAt(0);if((event.keyCode)&&(event.keyCode>=96)&&(event.keyCode<106)&&(key>=48)&&(key<58))key+=48;}
return((typeof event.keyCode!='undefined')&&(event.keyCode==key));}
function menu_active_selection(menu_id)
{add_event_listener_abstract(window,'load',function(){_menu_active_selection(menu_id);});}
function _menu_active_selection(menu_id)
{var menu_element=document.getElementById(menu_id);var possibilities=[],is_selected,url;if(menu_element.nodeName.toLowerCase()=='select')
{for(var i=0;i<menu_element.options.length;i++)
{url=menu_element.options[i].value;is_selected=menu_item_is_selected(url);if(is_selected!==null)
{possibilities.push({url:url,score:is_selected,element:menu_element.options[i]});}}
if(possibilities.length>0)
{possibilities.sort(function(a,b){return a.score-b.score})
var min_score=possibilities[0].score;for(var i=0;i<possibilities.length;i++)
{if(possibilities[i].score!=min_score)break;possibilities[i].element.selected=true;}}}else
{var menu_items=get_elements_by_class_name(menu_element,'non_current'),a;for(var i=0;i<menu_items.length;i++)
{a=null;for(var j=0;j<menu_items[i].childNodes.length;j++)
{if(menu_items[i].childNodes[j].nodeName.toLowerCase()=='a')
{a=menu_items[i].childNodes[j];}}
if(a==null)
{continue;}
url=(a.getAttribute('href')=='')?'':a.href;is_selected=menu_item_is_selected(url);if(is_selected!==null)
{possibilities.push({url:url,score:is_selected,element:menu_items[i]});}}
if(possibilities.length>0)
{possibilities.sort(function(a,b){return a.score-b.score})
var min_score=possibilities[0].score;for(var i=0;i<possibilities.length;i++)
{if(possibilities[i].score!=min_score)break;possibilities[i].element.className=possibilities[i].element.className.replace('non_current','current');}}}}
function menu_item_is_selected(url)
{if(url=='')return null;var current_url=window.location.toString();if(current_url==url)return 0;var global_breadcrumbs=document.getElementById('global_breadcrumbs');if(global_breadcrumbs)
{var links=global_breadcrumbs.getElementsByTagName('a');for(var i=0;i<links.length;i++)
{if(url==links[links.length-1-i].href)return i+1;}}
return null;}
function modsecurity_workaround(form)
{var temp_form=document.createElement('form');temp_form.method='post';if(form.target!=null&&form.target!='')temp_form.target=form.target;temp_form.action=form.action;var data=$(form).serialize();data=_modsecurity_workaround(data);var input=document.createElement('input');input.type='hidden';input.name='_data';input.value=data;temp_form.appendChild(input);if(typeof form.elements['csrf_token']!='undefined')
{var csrf_input=document.createElement('input');csrf_input.type='hidden';csrf_input.name='csrf_token';csrf_input.value=form.elements['csrf_token'].value;temp_form.appendChild(csrf_input);}
temp_form.style.display='none';document.body.appendChild(temp_form);window.setTimeout(function(){temp_form.submit();temp_form.parentNode.removeChild(temp_form);},0);return false;}
function modsecurity_workaround_ajax(data)
{return'_data='+window.encodeURIComponent(_modsecurity_workaround(data));}
function _modsecurity_workaround(data)
{var remapper={'\\':'<','/':'>','<':'\'','>':'"','\'':'/','"':'\\','%':'&','&':'%','@':':',':':'@',};var out='';var len=data.length,character;for(var i=0;i<len;i++){character=data[i];if(typeof remapper[character]!='undefined')
{out+=remapper[character];}else
{out+=character;}}
return out;}
function convert_tooltip(element)
{var title=element.title;if((title!='')&&(element.className.indexOf('leave_native_tooltip')==-1)&&(element.parentNode.className.indexOf('leave_native_tooltip')==-1)&&(document.body.className.indexOf(' touch_enabled')==-1))
{if(element.nodeName=='img'&&element.alt=='')element.alt=element.title;element.title='';if((!element.onmouseover)&&((element.childNodes.length==0)||((!element.childNodes[0].onmouseover)&&((!element.childNodes[0].title)||(element.childNodes[0].title=='')))))
{if(element.innerText)
{var prefix=element.innerText+': ';if(title.substr(0,prefix.length)==prefix)
title=title.substring(prefix.length,title.length);else if(title==element.innerText)return;}
if(!element.onmouseout)element.onmouseout=function(){};if(!element.onmousemove)element.onmouseover=function(){};if(!element.onmousemove)element.onmouseleave=function(){};var win=get_main_cms_window(true);element.cms_tooltip_title=escape_html(title);win.add_event_listener_abstract(element,'mouseover',function(event){win.activate_tooltip(element,event,element.cms_tooltip_title,'300px','',null,false,false,false,false,win);});win.add_event_listener_abstract(element,'mousemove',function(event){win.reposition_tooltip(element,event,false,false,null,false,win);});win.add_event_listener_abstract(element,'mouseout',function(event){win.deactivate_tooltip(element);});}}}
function clear_out_tooltips(tooltip_being_opened)
{var existing_tooltips=get_elements_by_class_name(document.body,'tooltip');for(var i=0;i<existing_tooltips.length;i++)
{if(existing_tooltips[i].id!==tooltip_being_opened)
{deactivate_tooltip(existing_tooltips[i].ac,existing_tooltips[i]);}}}
function preactivate_rich_semantic_tooltip(ob,event,have_links)
{if(typeof ob.ttitle=='undefined')ob.ttitle=((typeof ob.attributes['data-title']!='undefined')?ob.getAttribute('data-title'):ob.title);ob.title='';ob.onmouseover=null;ob.onclick=function(){activate_rich_semantic_tooltip(ob,event,have_links);};}
function activate_rich_semantic_tooltip(ob,event,have_links)
{if(typeof ob.ttitle=='undefined')ob.ttitle=ob.title;activate_tooltip(ob,event,ob.ttitle,'auto',null,null,false,true,false,false,window,have_links);}
function activate_tooltip(ac,event,tooltip,width,pic,height,bottom,no_delay,lights_off,force_width,win,have_links)
{if(window.is_doing_a_drag)return;if(!ac)return;if(!have_links)
{if(document.body.className.indexOf(' touch_enabled')!=-1)return;}
if(typeof width=='undefined'||!width)var width='auto';if(typeof pic=='undefined')pic='';if(typeof height=='undefined'||!height)var height='auto';if(typeof bottom=='undefined')bottom=false;if(typeof no_delay=='undefined')no_delay=false;if(typeof lights_off=='undefined')lights_off=false;if(typeof force_width=='undefined')force_width=false;if(typeof win=='undefined')win=window;if(typeof have_links=='undefined')have_links=false;if(!window.page_loaded)return;if((typeof tooltip!='function')&&(tooltip==''))return;if((typeof ac.deactivated_at!='undefined')&&(ac.deactivated_at!=null)&&(Date.now()-ac.deactivated_at<200))return;register_mouse_listener(event);clear_out_tooltips(ac.tooltip_id);if(!have_links)
{if(!ac.onmouseout&&!ac.onmouseleave)ac.onmouseout=function(event){win.deactivate_tooltip(ac);};if(!ac.onmousemove)ac.onmousemove=function(event){if(!event)var event=window.event;win.reposition_tooltip(ac,event,false,false,null,false,win);};}else
{ac.old_onclick=ac.onclick;ac.onclick=function(event){if(!event)var event=window.event;win.deactivate_tooltip(ac);};}
if(typeof tooltip=='function')tooltip=tooltip();if(tooltip=='')return;ac.is_over=true;ac.deactivated_at=null;ac.tooltip_on=false;ac.initial_width=width;ac.have_links=have_links;var children=ac.getElementsByTagName('img');for(var i=0;i<children.length;i++)children[i].setAttribute('title','');var tooltip_element;if((typeof ac.tooltip_id!='undefined')&&(document.getElementById(ac.tooltip_id)))
{tooltip_element=win.document.getElementById(ac.tooltip_id);tooltip_element.style.display='none';set_inner_html(tooltip_element,'');window.setTimeout(function(){reposition_tooltip(ac,event,bottom,true,tooltip_element,force_width);},0);}else
{tooltip_element=win.document.createElement('div');tooltip_element.role='tooltip';tooltip_element.style.display='none';var rt_pos=tooltip.indexOf('results_table');tooltip_element.className='tooltip '+((rt_pos==-1||rt_pos>100)?'tooltip_ownlayout':'tooltip_nolayout')+' boxless_space'+(have_links?' have_links':'');if(ac.className.substr(0,3)=='tt_')
{tooltip_element.className+=' '+ac.className;}
if(force_width)
{tooltip_element.style.width=width;}else
{tooltip_element.style.maxWidth=(width=='auto')?((get_window_width(win)-30-window.mouse_x)+'px'):width;tooltip_element.style.width='auto';}
if((height)&&(height!='auto'))
{tooltip_element.style.maxHeight=height;tooltip_element.style.overflow='auto';}
tooltip_element.style.position='absolute';tooltip_element.id=Math.floor(Math.random()*1000);ac.tooltip_id=tooltip_element.id;reposition_tooltip(ac,event,bottom,true,tooltip_element,force_width);document.body.appendChild(tooltip_element);}
tooltip_element.ac=ac;if(pic)
{var img=win.document.createElement('img');img.src=pic;img.className='tooltip_img';if(lights_off)img.className+=' faded_tooltip_img';tooltip_element.appendChild(img);tooltip_element.className+=' tooltip_with_img';}
var event_copy;try{event_copy={'pageX':event.pageX,'pageY':event.pageY,'clientX':event.clientX,'clientY':event.clientY,'type':event.type};}
catch(e){event_copy={'pageX':0,'pageY':0,'clientX':0,'clientY':0,'type':''};}
var bi=document.getElementById('main_website_inner');if(!bi)bi=document.body;if((typeof window.TouchEvent!='undefined')&&(!bi.onmouseover))
{bi.onmouseover=function(){return true;};}
window.setTimeout(function(){if(!ac.is_over)return;if((!ac.tooltip_on)||(tooltip_element.childNodes.length==0))
set_inner_html(tooltip_element,tooltip,true);ac.tooltip_on=true;tooltip_element.style.display='block';if((tooltip_element.style.width=='auto')&&((tooltip_element.childNodes.length!=1)||(tooltip_element.childNodes[0].nodeName.toLowerCase()!='img')))
tooltip_element.style.width=(find_width(tooltip_element,true)+1)+'px';if(!no_delay)
{event_copy.pageX=win.mouse_x;event_copy.pageY=win.mouse_y;}
reposition_tooltip(ac,event_copy,bottom,true,tooltip_element,force_width,win);},no_delay?0:666);}
function reposition_tooltip(ac,event,bottom,starting,tooltip_element,force_width,win)
{if(!ac.is_over)return;if(!starting)
{if(ac.getAttribute('title'))ac.setAttribute('title','');if((ac.parentNode.nodeName.toLowerCase()=='a')&&(ac.parentNode.getAttribute('title'))&&((ac.nodeName.toLowerCase()=='abbr')||(ac.parentNode.getAttribute('title').indexOf('(this link will open in a new window)')!=-1)))
ac.parentNode.setAttribute('title','');}
if(!window.page_loaded)return;if(!ac.tooltip_id){if((typeof ac.onmouseover!='undefined')&&(ac.onmouseover))ac.onmouseover(event);return;}
if((typeof tooltip_element=='undefined')||(!tooltip_element))var tooltip_element=document.getElementById(ac.tooltip_id);if(tooltip_element)
{var style__offset_x=9;var style__offset_y=(ac.have_links)?18:9;var x,y;x=window.mouse_x;y=window.mouse_y;x+=style__offset_x;y+=style__offset_y;try
{if(typeof event.type!='undefined')
{if(event.type!='focus')ac.done_none_focus=true;if((event.type=='focus')&&(ac.done_none_focus))return;x=(event.type=='focus')?(get_window_scroll_x(win)+get_window_width(win)/2):(window.mouse_x+style__offset_x);y=(event.type=='focus')?(get_window_scroll_y(win)+get_window_height(win)/2-40):(window.mouse_y+style__offset_y);}}
catch(ignore){}
try
{if((typeof event.target!='undefined')||(typeof event.srcElement!='undefined'))
{if(((typeof event.target!='undefined')?event.target:event.srcElement).ownerDocument!=win.document)
{x=win.mouse_x+style__offset_x;y=win.mouse_y+style__offset_y;}}}
catch(ignore){}
var width=find_width(tooltip_element,true);if(tooltip_element.style.width=='auto')
{if(width<200)width=200;}
var height=find_height(tooltip_element);var x_excess=x-get_window_width(win)-get_window_scroll_x(win)+width+10;if(x_excess>0)
{var x_before=x;x-=x_excess+20+style__offset_x;if(x<100)x=(x_before<100)?x_before:100;}
if(x<0)x=0;if(bottom)
{tooltip_element.style.top=(y-height)+'px';}else
{var y_excess=y-get_window_height(win)-get_window_scroll_y(win)+height+style__offset_y;if(y_excess>0)y-=y_excess;var scroll_y=get_window_scroll_y(win);if(y<scroll_y)y=scroll_y;tooltip_element.style.top=y+'px';}
tooltip_element.style.left=x+'px';}}
function deactivate_tooltip(ac,tooltip_element)
{if(ac.is_over)ac.deactivated_at=Date.now();ac.is_over=false;if(typeof ac.tooltip_id=='undefined')return;if(typeof tooltip_element=='undefined')
tooltip_element=document.getElementById(ac.tooltip_id);if(tooltip_element)tooltip_element.style.display='none';if(typeof ac.old_onclick!='undefined')
{ac.onclick=ac.old_onclick;}}
function resize_frame(name,min_height)
{if(typeof min_height=='undefined')min_height=0;var frame_element=document.getElementById(name);var frame_window;if(typeof window.frames[name]!='undefined')frame_window=window.frames[name];else if(parent&&parent.frames[name])frame_window=parent.frames[name];else return;if((frame_element)&&(frame_window)&&(frame_window.document)&&(frame_window.document.body))
{var h=get_window_scroll_height(frame_window);if((h==0)&&(frame_element.parentNode.style.display=='none'))
{h=((typeof min_height=='undefined')||(min_height==0))?100:min_height;if(frame_window.parent)window.setTimeout(function(){if(frame_window.parent)frame_window.parent.trigger_resize();},0);}
if(h+'px'!=frame_element.style.height)
{if((frame_element.scrolling!='auto'&&frame_element.scrolling!='yes')||(frame_element.style.height=='0')||(frame_element.style.height=='0px'))
{frame_element.style.height=((h>=min_height)?h:min_height)+'px';if(frame_window.parent)window.setTimeout(function(){if(frame_window.parent)frame_window.parent.trigger_resize();},0);frame_element.scrolling='no';frame_window.onscroll=function(event){if(typeof event=='undefined')event=window.event;if(event==null)return false;try{frame_window.scrollTo(0,0);}catch(e){}return cancel_bubbling(event);};}}}
frame_element.style.transform='scale(1)';}
function trigger_resize(and_subframes)
{if(typeof window.parent=='undefined')return;if(typeof window.parent.document=='undefined')return;var frames=window.parent.document.getElementsByTagName('iframe');var done=false;for(var i=0;i<frames.length;i++)
{if((frames[i].src==window.location.href)||(frames[i].contentWindow==window)||((frames[i].id!='')&&(typeof window.parent.frames[frames[i].id]!='undefined')&&(window.parent.frames[frames[i].id]==window)))
{if(frames[i].style.height=='900px')frames[i].style.height='auto';window.parent.resize_frame(frames[i].name);}}
if(and_subframes)
{frames=document.getElementsByTagName('iframe');for(var i=0;i<frames.length;i++)
if((frames[i].name!='')&&((frames[i].className.indexOf('expandable_iframe')!=-1)||(frames[i].className.indexOf('dynamic_iframe')!=-1)))resize_frame(frames[i].name);}}
function add_form_marked_posts(work_on,prefix)
{var get=work_on.method.toLowerCase()=='get';var elements=document.getElementsByTagName('input');var i;var append='';if(get)
{for(i=0;i<work_on.elements.length;i++)
{if(work_on.elements[i].name.match(new RegExp('&'+prefix.replace('_','\_')+'\d+=1$','g')))
{work_on.elements[i].parentNode.removeChild(work_on.elements[i]);}}}else
{work_on.action=work_on.action.replace('?','&');work_on.action=work_on.action.replace(new RegExp('&'+prefix.replace('_','\_')+'\d+=1$','g'),'');work_on.action=work_on.action.replace('&','?');}
for(i=0;i<elements.length;i++)
{if((elements[i].type=='checkbox')&&(elements[i].name.substring(0,prefix.length)==prefix)&&(elements[i].checked))
append+=(((append=='')&&(work_on.action.indexOf('?')==-1)&&(work_on.action.indexOf('/pg/')==-1)&&(!get))?'?':'&')+elements[i].name+'=1';}
if(get)
{var bits=append.split('&');for(i=0;i<bits.length;i++)
{if(bits[i]!='')
{var hidden=document.createElement('input');hidden.name=bits[i].substr(0,bits[i].indexOf('=1'));hidden.value='1';hidden.type='hidden';work_on.appendChild(hidden);}}}else
{work_on.action+=append;}
return append!='';}
function mark_all_topics(event)
{var e=document.getElementsByTagName('input');var i;for(i=0;i<e.length;i++)
{if((e[i].type=='checkbox')&&(e[i].name.substr(0,5)=='mark_'))
{e[i].checked=!e[i].checked;e[i].onclick(event);}}}
function set_opacity(element,fraction)
{if((typeof element.fader_key!='undefined')&&(element.fader_key)&&(typeof window.fade_transition_timers!='undefined')&&(window.fade_transition_timers[element.fader_key]))
{try
{window.clearTimeout(window.fade_transition_timers[element.fader_key]);}
catch(e){}
window.fade_transition_timers[element.fader_key]=null;}
if(typeof element.style.opacity!='undefined')
{element.style.opacity=fraction;element.style.filter='alpha(opacity='+(fraction*100)+')';}}
function add_event_listener_abstract(element,the_event,func,capture)
{if(element)
{if((element==window)&&((the_event=='load')&&((window.page_fully_loaded)||(document.readyState=='interactive')||(document.readyState=='complete')))||((the_event=='real_load')&&(document.readyState=='complete')))
{window.setTimeout(func,0);return true;}
if(typeof element.simulated_events=='undefined')element.simulated_events=[];try
{if(typeof element.simulated_events[the_event]=='undefined')element.simulated_events[the_event]=[];element.simulated_events[the_event].push(func);}
catch(e)
{element.simulated_events=[];element.simulated_events[the_event]=[];element.simulated_events[the_event].push(func);}
if(typeof element.addEventListener!='undefined')
{if(the_event=='load')
{element.addEventListener('DOMContentLoaded',function(){window.page_loaded=true;window.has_DOMContentLoaded=true;window.setTimeout(func,0);},capture);return element.addEventListener(the_event,function(){window.page_loaded=true;if(!window.has_DOMContentLoaded)window.setTimeout(func,0);},capture);}
if(the_event=='real_load')
{return element.addEventListener('load',function(){window.page_fully_loaded=true;func();},capture);}
return element.addEventListener(the_event,func,capture);}
else if(typeof element.attachEvent!='undefined')
{if((the_event=='load')||(the_event=='real_load'))
{return element.attachEvent('onload',function(){window.page_loaded=true;window.page_fully_loaded=true;func();});}
return element.attachEvent('on'+the_event,func);}
else return false;}
else return false;}
function cancel_bubbling(event,for_element)
{if((typeof for_element=='undefined')||(!for_element))var for_element='';if(typeof event=='undefined')event=window.event;if(typeof event=='undefined'||!event)return false;var src=(typeof event.srcElement!='undefined'&&event.srcElement)?event.srcElement:event.target;if(!src)return false;if((src.nodeName)&&(src.nodeName.toLowerCase()==for_element)||(for_element==''))
{if(typeof event.stopPropagation!='undefined')event.stopPropagation();event.cancelBubble=true;return true;}
return false;}
function maintain_theme_in_link(url)
{if(url.indexOf('&utheme=')!=-1)return url;if(url.indexOf('?utheme=')!=-1)return url;if(url.indexOf('&keep_theme=')!=-1)return url;if(url.indexOf('?keep_theme=')!=-1)return url;if(typeof window.cms_theme=='undefined')window.cms_theme='BeatGrid_CSM';if(typeof window.cms_theme!='undefined')
{if(url.indexOf('?')==-1)url+='?';else url+='&';url+='utheme='+window.encodeURIComponent(window.cms_theme);}
return url;}
function keep_stub(starting_query_string,skip_session,context)
{if(!window)return'';if(typeof window.location=='undefined')return'';if(typeof skip_session=='undefined')skip_session=false;if(((typeof context=='undefined')||(context.indexOf('keep_')==-1))&&(skip_session))
{if(starting_query_string)
{if(typeof window.cache_keep_stub_starting_query_string!='undefined')
return window.cache_keep_stub_starting_query_string;}else
{if(typeof window.cache_keep_stub!='undefined')
return window.cache_keep_stub;}}
var to_add='',i;var search=(window.location.search=='')?'?':window.location.search.substr(1);var bits=search.split('&');var done_session=skip_session;var gap_symbol;for(i=0;i<bits.length;i++)
{if(bits[i].substr(0,5)=='keep_')
{if((typeof context=='undefined')||(context.indexOf('?'+bits[i])==-1&&context.indexOf('&'+bits[i])==-1))
{gap_symbol=(((to_add=='')&&(starting_query_string))?'?':'&');to_add+=gap_symbol+bits[i];if(bits[i].substr(0,13)=='keep_session=')done_session=true;}}}
if(!done_session)
{var session=get_session_id();gap_symbol=(((to_add=='')&&(starting_query_string))?'?':'&');if(session)to_add=to_add+gap_symbol+'keep_session='+window.encodeURIComponent(session);}
if(((typeof context=='undefined')||(context.indexOf('keep_')==-1))&&(skip_session))
{if(starting_query_string)
{window.cache_keep_stub_starting_query_string=to_add;}else
{window.cache_keep_stub=to_add;}}
return to_add;}
function get_csrf_token()
{return read_cookie('cms_session');}
function get_session_id()
{return read_cookie('cms_session');}
function get_outer_html(element)
{return get_inner_html(element,true);}
function get_inner_html(element,outer_too)
{if(typeof outer_too=='undefined')outer_too=false;if(typeof element.innerHTML!='undefined')return outer_too?element.outerHTML:element.innerHTML;function inner_html_copy(src_dom_node,level){var out='';if(typeof level=='undefined')level=1;if(level>1){if(src_dom_node.nodeType==1){var this_node=document.createElement(src_dom_node.nodeName);out+='<'+this_node.nodeName;var cleaned_attributes=[];for(var a=0,attr=src_dom_node.attributes.length;a<attr;a++){var a_name=src_dom_node.attributes[a].name,a_value=src_dom_node.attributes[a].value;cleaned_attributes[a_name]=a_value;}
for(var a=0,attr=src_dom_node.attributes.length;a<attr;a++){var a_name=src_dom_node.attributes[a].name,a_value=cleaned_attributes[a_name];if((a_value!==null)&&(a_name!='complete')&&(a_name!='simulated_events')&&(((a_name.substr(0,2)!='on')&&(a_name.substr(0,6)!='jQuery')&&(a_name.substr(0,8)!='sizcache')&&(a_name!='sizset')&&(a_name!='nodeIndex')&&(a_name!='cite')&&(a_name!='nofocusrect')&&(a_name!='width')&&(a_name!='height')&&(a_name!='cache')&&(a_name!='dataFld')&&(a_name!='dataFormatAs')&&(a_name!='dataSrc')&&(a_name!='implementation')&&(a_name!='style'))||(a_value!='null'))&&((a_name!='start')||(a_value!='fileopen'))&&((a_name!='loop')||(a_value!='1'))&&(((a_name!='width')&&(a_name!='height')&&(a_name!='tabIndex')&&(a_name!='hspace')&&(a_name!='vspace'))||(a_value!='0'))&&(((a_name!='noWrap')&&(a_name!='readOnly')&&(a_name!='indeterminate')&&(a_name!='hideFocus')&&(a_name!='disabled')&&(a_name!='isMap'))||(a_value!='false'))&&((a_name!='contentEditable')||(a_value!='inherit'))&&(((a_name.substr(0,6)!='border')&&(a_name!='dateTime')&&(a_name!='scope')&&(a_name!='clear')&&(a_name!='bgColor')&&(a_name!='vAlign')&&(a_name!='chOff')&&(a_name!='ch')&&(a_name!='height')&&(a_name!='width')&&(a_name!='axis')&&(a_name!='headers')&&(a_name!='background')&&(a_name!='accept')&&(a_name!='language')&&(a_name!='longDesc')&&(a_name!='border')&&(a_name!='dataFld')&&(a_name!='dataFormatAs')&&(a_name!='dataSrc')&&(a_name!='lang')&&(a_name!='id')&&(a_name!='name')&&(a_name!='dir')&&(a_name!='accessKey')&&(a_name!='dynsrc')&&(a_name!='vrml')&&(a_name!='align')&&(a_name!='useMap')&&(a_name!='lowsrc'))||(a_value!='')))
out+=' '+a_name+'="'+escape_html(a_value)+'"';}
if(src_dom_node.childNodes.length>0)
{out+='>';for(var i=0,j=src_dom_node.childNodes.length;i<j;i++)
{if((src_dom_node.childNodes[i].id!='_firebugConsole')&&(src_dom_node.childNodes[i].type!='application/x-googlegears'))
out+=inner_html_copy(src_dom_node.childNodes[i],level+1);}
out+='</'+this_node.nodeName+'>';}else
{out+=' />';}}
else if(src_dom_node.nodeType==3){out+=(src_dom_node.nodeValue?src_dom_node.nodeValue:'');}
else if(src_dom_node.nodeType==4){out+=(src_dom_node.nodeValue?'<![CDATA['+src_dom_node.nodeValue+']]':'');}}else
{for(var i=0,j=src_dom_node.childNodes.length;i<j;i++)
{if((src_dom_node.childNodes[i].id!='_firebugConsole')&&(src_dom_node.childNodes[i].type!='application/x-googlegears'))
out+=inner_html_copy(src_dom_node.childNodes[i],level+1);}}
return out;}
return inner_html_copy(element,outer_too?2:1);}
function entities_to_unicode(din)
{if((!din.replace)||(din.indexOf('&')==-1))return din;if(typeof window.entity_rep_reg=='undefined')
{var reps={'amp':38,'gt':62,'lt':60,'quot':34,'hellip':8230,'middot':183,'ldquo':8220,'lsquo':8216,'rdquo':8221,'rsquo':8217,'mdash':8212,'ndash':8211,'nbsp':160,'times':215,'harr':8596,'lsaquo':8249,'rsaquo':8250,'euro':8364,'pound':163,'bull':8226,'copy':169,'trade':8482,'dagger':8224,'yen':165,'laquo':171,'raquo':187,'larr':8592,'rarr':8594,'uarr':8593,'darr':8595,'acute':180,'cedil':184,'circ':710,'macr':175,'tilde':732,'uml':168,'Aacute':193,'aacute':225,'Acirc':194,'acirc':226,'AElig':198,'aelig':230,'Agrave':192,'agrave':224,'Aring':197,'aring':229,'Atilde':195,'atilde':227,'Auml':196,'auml':228,'Ccedil':199,'ccedil':231,'Eacute':201,'eacute':233,'Ecirc':202,'ecirc':234,'Egrave':200,'egrave':232,'ETH':208,'eth':240,'Euml':203,'euml':235,'Iacute':205,'iacute':237,'Icirc':206,'icirc':238,'Igrave':204,'igrave':236,'Iuml':207,'iuml':239,'Ntilde':209,'ntilde':241,'Oacute':211,'oacute':243,'Ocirc':212,'ocirc':244,'OElig':338,'oelig':339,'Ograve':210,'ograve':242,'Oslash':216,'oslash':248,'Otilde':213,'otilde':245,'Ouml':214,'ouml':246,'Scaron':352,'scaron':353,'szlig':223,'THORN':222,'thorn':254,'Uacute':218,'uacute':250,'Ucirc':219,'ucirc':251,'Ugrave':217,'ugrave':249,'Uuml':220,'uuml':252,'Yacute':221,'yacute':253,'yuml':255,'Yuml':376,'cent':162,'curren':164,'brvbar':166,'Dagger':8225,'frasl':8260,'iexcl':161,'image':8465,'iquest':191,'lrm':8206,'not':172,'oline':8254,'ordf':170,'ordm':186,'para':182,'permil':8240,'prime':8242,'Prime':8243,'real':8476,'reg':174,'rlm':8207,'sect':167,'shy':173,'sup1':185,'weierp':8472,'bdquo':8222,'sbquo':8218,'emsp':8195,'ensp':8194,'thinsp':8201,'zwj':8205,'zwnj':8204,'deg':176,'divide':247,'frac12':189,'frac14':188,'frac34':190,'ge':8805,'le':8804,'minus':8722,'sup2':178,'sup3':179,'alefsym':8501,'and':8743,'ang':8736,'asymp':8776,'cap':8745,'cong':8773,'cup':8746,'empty':8709,'equiv':8801,'exist':8707,'fnof':402,'forall':8704,'infin':8734,'int':8747,'isin':8712,'lang':9001,'lceil':8968,'lfloor':8970,'lowast':8727,'micro':181,'nabla':8711,'ne':8800,'ni':8715,'notin':8713,'nsub':8836,'oplus':8853,'or':8744,'otimes':8855,'part':8706,'perp':8869,'plusmn':177,'prod':8719,'prop':8733,'radic':8730,'rang':9002,'rceil':8969,'rfloor':8971,'sdot':8901,'sim':8764,'sub':8834,'sube':8838,'sum':8721,'sup':8835,'supe':8839,'there4':8756,'Alpha':913,'alpha':945,'Beta':914,'beta':946,'Chi':935,'chi':967,'Delta':916,'delta':948,'Epsilon':917,'epsilon':949,'Eta':919,'eta':951,'Gamma':915,'gamma':947,'Iota':921,'iota':953,'Kappa':922,'kappa':954,'Lambda':923,'lambda':955,'Mu':924,'mu':956,'Nu':925,'nu':957,'Omega':937,'omega':969,'Omicron':927,'omicron':959,'Phi':934,'phi':966,'Pi':928,'pi':960,'piv':982,'Psi':936,'psi':968,'Rho':929,'rho':961,'Sigma':931,'sigma':963,'sigmaf':962,'Tau':932,'tau':964,'Theta':920,'theta':952,'thetasym':977,'upsih':978,'Upsilon':933,'upsilon':965,'Xi':926,'xi':958,'Zeta':918,'zeta':950,'crarr':8629,'dArr':8659,'hArr':8660,'lArr':8656,'rArr':8658,'uArr':8657,'clubs':9827,'diams':9830,'hearts':9829,'spades':9824,'loz':9674};window.entity_rep_reg={};for(var i in reps)
{window.entity_rep_reg['&#'+reps[i]+';']=i;}}
var i;for(var x in window.entity_rep_reg)
{i=window.entity_rep_reg[x];if(typeof i=='string')
{if((i=='acute')&&(!din.match(/&\w+;/)))break;i=new RegExp('&'+i+';','g');window.entity_rep_reg[x]=i;}
din=din.replace(window.entity_rep_reg[x],x);}
return din;}
function inner_html_load(xml_string){var xml;if(typeof DOMParser!='undefined')
{try
{xml=(new DOMParser()).parseFromString(xml_string,'application/xml');if((xml)&&(xml.documentElement.nodeName=='parsererror'))xml=null;}
catch(e){xml=null;}
if((xml===null)||((typeof xml.documentElement!='undefined')&&(typeof xml.documentElement.childNodes[0]!='undefined')&&(xml.documentElement.childNodes[0].nodeName=='parsererror')))
{xml=document.implementation.createHTMLDocument('');var doc_elt=xml.documentElement;doc_elt.innerHTML=xml_string;xml=xml.getElementsByTagName('root')[0];}}else
{var ieDOM=["MSXML2.DOMDocument","MSXML.DOMDocument","Microsoft.XMLDOM"];for(var i=0;i<ieDOM.length&&!xml;i++){try{xml=new ActiveXObject(ieDOM[i]);xml.loadXML(xml_string);}
catch(e){}}}
return xml;}
function inner_html_copy(dom_node,xml_doc,level,script_tag_dependencies){if(typeof level=='undefined')level=1;if(level>1){var node_upper=xml_doc.nodeName.toUpperCase();if((node_upper=='SCRIPT')&&(!xml_doc.getAttribute('src')))
{var text=(xml_doc.nodeValue?xml_doc.nodeValue:(xml_doc.textContent?xml_doc.textContent:(xml_doc.text?xml_doc.text:'')));if(script_tag_dependencies['to_load'].length==0)
{window.setTimeout(function(){if(typeof window.execScript!='undefined')
{window.execScript(text);}else
{eval.call(window,text);}},0);}else
{script_tag_dependencies['to_run'].push(text);}
return;}
if(xml_doc.nodeType==1){var this_node=dom_node.ownerDocument.createElement(xml_doc.nodeName);for(var a=0,attr=xml_doc.attributes.length;a<attr;a++){var a_name=xml_doc.attributes[a].name,a_value=xml_doc.attributes[a].value,evt=(a_name.substr(0,2)=='on');if(!evt){switch(a_name){case'class':this_node.className=a_value;break;case'for':this_node.htmlFor=a_value;break;default:try{this_node.setAttribute(a_name,a_value);}
catch(e){};break;}}else
{try{this_node[a_name]=eval('var x=function(event) { '+a_value+' }; x;');}
catch(e){};}}
if((node_upper=='SCRIPT')||(node_upper=='LINK'))
{if((node_upper=='SCRIPT')&&(document.querySelector('script[src="'+this_node.src+'"]')))return;if((node_upper=='LINK')&&(document.querySelector('link[href="'+this_node.href+'"]')))return;if(node_upper=='SCRIPT')
{script_tag_dependencies['to_load'].push(this_node);this_node.async=false;this_node.onload=this_node.onreadystatechange=function(){if((typeof this_node.readyState=='undefined')||(this_node.readyState=='complete')||(this_node.readyState=='loaded'))
{var found=0,i;for(i=0;i<script_tag_dependencies['to_load'].length;i++)
{if(script_tag_dependencies['to_load'][i]===this_node)
delete script_tag_dependencies['to_load'][i];else if(typeof script_tag_dependencies['to_load'][i]!=='undefined')found++;}
if(found==0)
{if(typeof window.console!='undefined')
console.log('All AJAX-injected script tags loaded');for(i=0;i<script_tag_dependencies['to_run'].length;i++)
{if(typeof window.execScript!='undefined')
{window.execScript(script_tag_dependencies['to_run'][i]);}else
{eval.call(window,script_tag_dependencies['to_run'][i]);}}
script_tag_dependencies['to_run']=[];}}};}
dom_node=document.getElementsByTagName('head')[0].appendChild(this_node);}else
{dom_node=dom_node.appendChild(this_node);var _new_html__initialise=function(){var found=0,i;for(i=0;i<script_tag_dependencies['to_load'].length;i++)
{if(script_tag_dependencies['to_load'][i]===this_node)
delete script_tag_dependencies['to_load'][i];else if(typeof script_tag_dependencies['to_load'][i]!=='undefined')found++;}
if(found==0)
{try
{new_html__initialise(this_node);}
catch(e){}}
else
window.setTimeout(_new_html__initialise,0);};window.setTimeout(_new_html__initialise,0);}}
else if(xml_doc.nodeType==3){var text=(xml_doc.nodeValue?xml_doc.nodeValue:(xml_doc.textContent?xml_doc.textContent:(xml_doc.text?xml_doc.text:'')));var test=text.replace(/^\s*|\s*$/g,'');if(test.indexOf('<!--')!=0&&(test.length<=3||test.indexOf('-->')!=(test.length-3)))
{if((dom_node.nodeName=='STYLE')&&(!dom_node.ownerDocument.createCDATASection))
{dom_node.cssText=text;}else
{dom_node.appendChild(dom_node.ownerDocument.createTextNode(text));}
dom_node=null;}}
else if(xml_doc.nodeType==4){var text=(xml_doc.nodeValue?xml_doc.nodeValue:(xml_doc.textContent?xml_doc.textContent:(xml_doc.text?xml_doc.text:'')));if((dom_node.nodeName=='STYLE')&&(!dom_node.ownerDocument.createCDATASection))
{dom_node.cssText=text;}else
{dom_node.appendChild(dom_node.ownerDocument.createTextNode(text));}
dom_node=null;}}
if(dom_node)
{for(var i=0,j=xml_doc.childNodes.length;i<j;i++)
{if(xml_doc.childNodes[i].id!='_firebugConsole')
inner_html_copy.call(window,dom_node,xml_doc.childNodes[i],level+1,script_tag_dependencies);}}}
function set_outer_html(element,target_html)
{var p=element.parentNode;var ref=element.nextSibling;p.removeChild(element);set_inner_html(element,target_html,false,true);var c=element.childNodes,ci;while(c.length>0)
{ci=c[0];element.removeChild(ci);p.insertBefore(ci,ref);}}
function set_inner_html(element,target_html,append,force_dom)
{if(typeof target_html=='number')target_html=target_html+'';if(((typeof force_dom=='undefined')||(!force_dom))&&(document.write)&&(typeof element.innerHTML!='undefined')&&(!document.xmlVersion)&&(target_html.toLowerCase().indexOf('<script src="')==-1)&&(target_html.toLowerCase().indexOf('<link')==-1))
{try
{var scripts_jump=0,already_offset=0;if(append)
{scripts_jump=element.getElementsByTagName('script').length;element.innerHTML+=target_html;already_offset=element.getElementsByTagName('*').length}else
{element.innerHTML=target_html;}
window.setTimeout(function(){try
{var elements=element.getElementsByTagName('*');var length=elements.length;for(var i=already_offset;i<length;i++)
{new_html__initialise(elements[i]);}}
catch(e){}},0);if(target_html.toLowerCase().indexOf('<script')!=-1)
{var r_id='js_'+Math.random();window['js_runs_test_'+r_id]=false;element.innerHTML+='<script id="'+r_id+'">window[\'js_runs_test_'+r_id+'\']=true; var t=document.getElementById(\''+r_id+'\'); if (t) t.parentNode.removeChild(t);</script>';window.setTimeout(function(){if(!window['js_runs_test_'+r_id])
{var scripts=element.getElementsByTagName('script');for(var i=scripts_jump;i<scripts.length;i++)
{if(!scripts[i].src)
{var text=(scripts[i].nodeValue?scripts[i].nodeValue:(scripts[i].textContent?scripts[i].textContent:(scripts[i].text?scripts[i].text.replace(/^<script[^>]*>/,''):'')));if(typeof window.execScript!='undefined')
{window.execScript(text);}else
{eval.call(window,text);}}}
window['js_runs_test_'+r_id]=true;}else
{var r=document.getElementById(r_id);if(r&&r.parentNode)r.parentNode.removeChild(r);}},0);}
return;}
catch(ignore){}}
target_html=entities_to_unicode(target_html);target_html='<root>'+target_html.replace(/^\s*\<\!DOCTYPE[^<>]*\>/,'')+'</root>';var xml_doc=inner_html_load(target_html);if(element&&xml_doc){if(!append)
{if(element.lastChild&&element.lastChild.parentNode!=element)
{element.innerHTML='';}else
{while(element.lastChild)element.removeChild(element.lastChild);}}
var script_tag_dependencies={'to_run':[],'to_load':[]};inner_html_copy.call(window,element,(typeof xml_doc.documentElement=='undefined')?xml_doc:xml_doc.documentElement,1,script_tag_dependencies);}}
function careful_import_node(node)
{var imported;try{imported=(document.importNode)?document.importNode(node,true):null;}catch(e){}
if(!imported)imported=node;return imported;}
function apply_rating_highlight_and_ajax_code(likes,initial_rating,content_type,id,type,rating,content_url,content_title,initialisation_phase,visual_only)
{if(typeof visual_only=='undefined')visual_only=false;var i,bit;for(i=1;i<=10;i++)
{bit=document.getElementById('rating_bar_'+i+'__'+content_type+'__'+type+'__'+id);if(!bit)continue;if(likes)
{bit.className=(rating==i)?'rating_star_highlight':'rating_star';}else
{bit.className=(rating>=i)?'rating_star_highlight':'rating_star';}
if(initialisation_phase)
{bit.onmouseover=function(i){return function()
{apply_rating_highlight_and_ajax_code(likes,initial_rating,content_type,id,type,i,content_url,content_title,false);}}(i);bit.onmouseout=function(i){return function()
{apply_rating_highlight_and_ajax_code(likes,initial_rating,content_type,id,type,initial_rating,content_url,content_title,false);}}(i);if(!visual_only)bit.onclick=function(i){return function(event){if(typeof event=='undefined')event=window.event;event.returnValue=false;if(typeof event.preventDefault!='undefined')event.preventDefault();var template='';var bit=document.getElementById('rating_bar_'+i+'__'+content_type+'__'+type+'__'+id);var replace_spot=bit;while(replace_spot!==null)
{replace_spot=replace_spot.parentNode;if(replace_spot!==null&&replace_spot.className)
{if(replace_spot.className.match(/(^| )RATING_BOX( |$)/))
{template='RATING_BOX';break;}
if(replace_spot.className.match(/(^| )RATING_INLINE_STATIC( |$)/))
{template='RATING_INLINE_STATIC';break;}
if(replace_spot.className.match(/(^| )RATING_INLINE_DYNAMIC( |$)/))
{template='RATING_INLINE_DYNAMIC';break;}}}
var _replace_spot=(template=='')?bit.parentNode.parentNode.parentNode.parentNode:replace_spot;set_inner_html(_replace_spot,'');var loading_image=document.createElement('img');loading_image.className='ajax_loading';loading_image.src='https://csm.wearebeatgrid.com/themes/default/images/loading.gif'.replace(/^https?:/,window.location.protocol);loading_image.style.height='12px';_replace_spot.appendChild(loading_image);var snippet_request='rating&type='+window.encodeURIComponent(type)+'&id='+window.encodeURIComponent(id)+'&content_type='+window.encodeURIComponent(content_type)+'&template='+window.encodeURIComponent(template)+'&content_url='+window.encodeURIComponent(content_url)+'&content_title='+window.encodeURIComponent(content_title);var message=load_snippet(snippet_request,'rating='+window.encodeURIComponent(i),function(ajax_result){var message=ajax_result.responseText;set_outer_html(_replace_spot,(template=='')?('<strong>'+message+'</strong>'):message);});return false;}}(i);}}}
function ga_track(ob,category,action)
{return null;}
function click_link(link)
{var cancelled=false;if((link.nodeName.toLowerCase()!='a')&&(link.nodeName.toLowerCase()!='input'))
{link=link.getElementsByTagName('a')[0];}
var backup=link.onclick;link.onclick=function(e){if(typeof e=='undefined')e=window.event;cancel_bubbling(e);};if((typeof document.createEvent!='undefined')&&(document.createEvent))
{var event=document.createEvent('MouseEvents');event.initMouseEvent('click',true,true,window,0,0,0,0,0,false,false,false,false,0,null);cancelled=!link.dispatchEvent(event);}
else if(typeof link.fireEvent!='undefined')
{cancelled=!link.fireEvent('onclick');}
link.onclick=backup;if((!cancelled)&&(link.href))
{if(link.getAttribute('target'))window.open(link.href,link.getAttribute('target'));else window.location=link.href;}}
function handle_comments_posting_form_submit(button,event)
{var form;if(typeof button.form=='undefined')
{form=window.form_submitting;}else
{form=button.form;}
form.setAttribute('target','_self');if(typeof form.old_action!='undefined')form.setAttribute('action',form.old_action);if(form.onsubmit.call(form,event))
{var submit_button=document.getElementById('submit_button');if(submit_button)disable_button_just_clicked(submit_button);form.submit();}}
function move_to_full_editor(button,more_url)
{var form;if(typeof button.form=='undefined')
{form=window.form_submitting;}else
{form=button.form;}
if(typeof form.elements['post'].default_substring_to_strip!='undefined')
{if(typeof form.elements['stub']!='undefined')
{form.elements['stub'].value=form.elements['post'].default_substring_to_strip;}else
{if(more_url.indexOf('?')==-1)
{more_url+='?';}else
{more_url+='&';}
more_url+='stub='+window.encodeURIComponent(form.elements['post'].default_substring_to_strip);}}
if(typeof form.elements['parent_id']!='undefined')
{if(more_url.indexOf('?')==-1)
{more_url+='?';}else
{more_url+='&';}
more_url+='parent_id='+window.encodeURIComponent(form.elements['parent_id'].value);}
form.setAttribute('target','_top');if(typeof form.old_action!='undefined')form.old_action=form.getAttribute('action');form.setAttribute('action',more_url);if((typeof form.elements['post'].strip_on_focus!='undefined')&&(form.elements['post'].value==form.elements['post'].strip_on_focus))
form.elements['post'].value='';form.submit();}
function replace_comments_form_with_ajax(options,hash,comments_form_id,comments_wrapper_id)
{var comments_form=document.getElementById(comments_form_id);if(comments_form)
{comments_form.old_onsubmit=comments_form.onsubmit;comments_form.onsubmit=function(event,is_preview){if((typeof is_preview!='undefined')&&(is_preview))return true;if(typeof event=='undefined')event=window.event;event.returnValue=false;if(typeof event.preventDefault!='undefined')event.preventDefault();if(!comments_form.old_onsubmit(event))return false;var comments_wrapper=document.getElementById(comments_wrapper_id);if(!comments_wrapper)
{comments_form.submit();return true;}
var submit_button=document.getElementById('submit_button');if(submit_button)disable_button_just_clicked(submit_button);var known_posts=get_elements_by_class_name(comments_wrapper,'post');var known_times=[];for(var i=0;i<known_posts.length;i++)
{known_times.push(known_posts[i].className.replace(/^post /,''));}
var post='options='+window.encodeURIComponent(options)+'&hash='+window.encodeURIComponent(hash);var post_element=comments_form.elements['post'];var post_value=post_element.value;if(typeof post_element.default_substring_to_strip!='undefined')
{if(post_value.substring(0,post_element.default_substring_to_strip.length)==post_element.default_substring_to_strip)
post_value=post_value.substring(post_element.default_substring_to_strip.length,post_value.length);}
for(var i=0;i<comments_form.elements.length;i++)
{if((comments_form.elements[i].name)&&(comments_form.elements[i].name!='post'))
post+='&'+comments_form.elements[i].name+'='+window.encodeURIComponent(clever_find_value(comments_form,comments_form.elements[i]));}
post+='&post='+window.encodeURIComponent(post_value);do_ajax_request('https://csm.wearebeatgrid.com/data/post_comment.php'+keep_stub(true),function(ajax_result){if((ajax_result.responseText!='')&&(ajax_result.status!=500))
{var old_action=comments_form.action;set_outer_html(comments_wrapper,ajax_result.responseText);comments_form=document.getElementById(comments_form_id);old_action=comments_form.action=old_action;window.setTimeout(function(){var comments_wrapper=document.getElementById(comments_wrapper_id);smooth_scroll(find_pos_y(comments_wrapper,true));},0);force_reload_on_back();var outer=document.getElementById('comments_posting_form_outer');if(outer&&outer.className.indexOf('toggleable_tray')!=-1)
toggleable_tray('comments_posting_form_outer');var known_posts=get_elements_by_class_name(comments_wrapper,'post');for(var i=0;i<known_posts.length;i++)
{if(known_times.indexOf(known_posts[i].className.replace(/^post /,''))==-1)
{set_opacity(known_posts[i],0.0);fade_transition(known_posts[i],100,20,5);}}
replace_comments_form_with_ajax(options,hash);}else
{comments_form.submit();}},post);return false;};}}
function force_reload_on_back()
{var showevent=(typeof window.onpageshow!='undefined')?'pageshow':'load';var func=function(){window.location.reload();};if(typeof window.addEventListener!='undefined')
{window.addEventListener(showevent,func,false);}
else if(typeof window.attachEvent!='undefined')
{window.attachEvent('on'+showevent,func);}}
function topic_reply(is_threaded,ob,id,replying_to_username,replying_to_post,replying_to_post_plain,explicit_quote)
{if(typeof explicit_quote=='undefined')explicit_quote=false;var form=document.getElementById('comments_form');var parent_id_field;if(typeof form.elements['parent_id']=='undefined')
{parent_id_field=document.createElement('input');parent_id_field.type='hidden';parent_id_field.name='parent_id';form.appendChild(parent_id_field);}else
{parent_id_field=form.elements['parent_id'];if(typeof window.last_reply_to!='undefined')set_opacity(window.last_reply_to,1.0);}
window.last_reply_to=ob;parent_id_field.value=is_threaded?id:'';ob.className+=' activated_quote_button';var post=form.elements['post'];smooth_scroll(find_pos_y(form,true));var outer=document.getElementById('comments_posting_form_outer');if(outer&&outer.style.display=='none')
toggleable_tray('comments_posting_form_outer');if(is_threaded)
{post.value='Click to type your reply to {1}\'s message, which was:\n\n{2}'.replace(/\{1\}/g,replying_to_username).replace(/\{2\}/g,replying_to_post_plain);post.strip_on_focus=post.value;post.className+=' field_input_non_filled';}else
{if(typeof post.strip_on_focus!='undefined'&&post.value==post.strip_on_focus)
post.value='';else if(post.value!='')post.value+='\n\n';post.focus();post.value+='[quote="'+replying_to_username+'"]\n'+replying_to_post+'\n[snapback]'+id+'[/snapback][/quote]\n\n';if(!explicit_quote)post.default_substring_to_strip=post.value;}
manage_scroll_height(post);post.scrollTop=post.scrollHeight;return false;}
function threaded_load_more(ob,ids,id)
{load_snippet('comments&id='+window.encodeURIComponent(id)+'&ids='+window.encodeURIComponent(ids)+'&serialized_options='+window.encodeURIComponent(window.comments_serialized_options)+'&hash='+window.encodeURIComponent(window.comments_hash),null,function(ajax_result){var wrapper;if(id!='')
{wrapper=document.getElementById('post_children_'+id);}else
{wrapper=ob.parentNode;}
ob.parentNode.removeChild(ob);set_inner_html(wrapper,ajax_result.responseText,true);window.setTimeout(function(){if(typeof window.fade_transition!='undefined')
{var _ids=ids.split(',');for(var i=0;i<_ids.length;i++)
{var element=document.getElementById('post_wrap_'+_ids[i]);if(element)
{set_opacity(element,0);fade_transition(element,100,30,10);}}}},0);});return false;}
function setup_word_counter(post,count_element)
{window.setInterval(function(){if(is_wysiwyg_field(post))
{try
{var text_value=window.CKEDITOR.instances[post.id].getData();var matches=text_value.replace(/<[^<|>]+?>|&nbsp;/gi,' ').match(/\b/g);var count=0;if(matches)count=matches.length/2;set_inner_html(count_element,'{1} words'.replace('\{1\}',count));}
catch(e){}}},1000);}
function add_captcha_checking(form)
{form.old_submit=form.onsubmit;form.onsubmit=function()
{form.elements['submit_button'].disabled=true;var url='https://csm.wearebeatgrid.com/data/snippet.php?snippet=captcha_wrong&name='+window.encodeURIComponent(form.elements['captcha'].value);if(!do_ajax_field_test(url))
{var image=document.getElementById('captcha_image');if(!image)image=document.getElementById('captcha_frame');image.src+='&';document.getElementById('submit_button').disabled=false;return false;}
form.elements['submit_button'].disabled=false;if(typeof form.old_submit!='undefined'&&form.old_submit)return form.old_submit();return true;};var showevent=(typeof window.onpageshow!='undefined')?'pageshow':'load';add_event_listener_abstract(window,showevent,function(){form.elements['captcha'].src+='&';});}
function set_up_change_monitor(id)
{add_event_listener_abstract(window,'load',function(){if(typeof window._set_up_change_monitor!='undefined')
{var ch=(typeof id=='string')?document.getElementById(id):id;if(ch)_set_up_change_monitor(ch.parentNode);}});}
function play_self_audio_link(ob)
{if(browser_matches('gecko')||true)
{require_javascript('sound',window.SoundManager);var timer=window.setInterval(function(){if(typeof window.soundManager=='undefined')return;window.clearInterval(timer);window.soundManager.setup({url:get_base_url()+'/data',debugMode:false,onready:function(){var sound_object=window.soundManager.createSound({url:ob.href});if(sound_object)sound_object.play();}});},50);return false;}
return null;}
function prepare_mass_select_marker(set,type,id,checked)
{var mass_delete_form=document.getElementById('mass_select_form__'+set);if(!mass_delete_form)mass_delete_form=document.getElementById('mass_select_button').form;var key=type+'_'+id;var hidden;if(typeof mass_delete_form.elements[key]=='undefined')
{hidden=document.createElement('input');hidden.type='hidden';hidden.name=key;mass_delete_form.appendChild(hidden);}else
{hidden=mass_delete_form.elements[key];}
hidden.value=checked?'1':'0';mass_delete_form.style.display='block';}
function confirm_delete(form,multi,callback)
{if(typeof multi=='undefined')multi=false;window.fauxmodal_confirm(multi?'Are you sure you want to delete these?':'Are you sure you want to delete this?',function(result)
{if(result)
{if(typeof callback!='undefined')
{callback();}else
{form.submit();}}});return false;}
function has_iframe_loaded(iframe)
{var has_loaded=false;try
{has_loaded=(typeof iframe!='undefined')&&(iframe!=null)&&(iframe.contentWindow.location.host!='');}
catch(e){};return has_loaded;}
function has_iframe_ownership(iframe)
{var has_ownership=false;try
{has_ownership=(typeof iframe!='undefined')&&(iframe!=null)&&(iframe.contentWindow.location.host==window.location.host)&&(iframe.contentWindow.document!=null);}
catch(e){};return has_ownership;}
if(typeof Array.prototype.indexOf=='undefined'){Array.prototype.indexOf=function(searchElement,fromIndex){var k;if(this==null){throw new TypeError('"this" is null or not defined');}
var O=Object(this);var len=O.length>>>0;if(len===0){return-1;}
var n=(typeof fromIndex=='undefined')?0:fromIndex;if(Math.abs(n)===Infinity){n=0;}
if(n>=len){return-1;}
k=Math.max(n>=0?n:len-Math.abs(n),0);while(k<len){var kValue;if(k in O&&O[k]===searchElement){return k;}
k++;}
return-1;};}