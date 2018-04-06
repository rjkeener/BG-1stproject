"use strict";if(typeof window.current_list_for=='undefined')
{window.current_list_for=null;window.currently_doing_list=null;}
function update_ajax_admin_search_list(target,e)
{update_ajax_member_list(target,'admin_search',false,e);}
function update_ajax_search_list(target,e,search_type)
{var special='search';if(typeof search_type!='undefined')special+='&search_type='+window.encodeURIComponent(search_type);update_ajax_member_list(target,special,false,e);}
function update_ajax_author_list(target,e)
{update_ajax_member_list(target,'author',false,e);}
function close_down()
{var current=document.getElementById('ajax_list');if(current)current.parentNode.removeChild(current);}
function update_ajax_member_list(target,special,delayed,e)
{if(typeof e=='undefined')e=window.event;if(e&&enter_pressed(e))return null;if(target.disabled)return;if(!browser_matches('ios'))
{if(!target.onblur)target.onblur=function(){setTimeout(function(){close_down();},300);}}
if(!delayed)
{if(window.currently_doing_list)
{window.clearTimeout(window.currently_doing_list);window.currently_doing_list=null;}
var e_copy={'keyCode':e.keyCode,'which':e.which};window.currently_doing_list=window.setTimeout(function(){update_ajax_member_list(target,special,true,e_copy);},400);return;}else
{window.currently_doing_list=null;}
target.special=special;var v=target.value;window.current_list_for=target;var url='https://csm.wearebeatgrid.com/data/namelike.php?id='+encodeURIComponent(v);if(special)url=url+'&special='+special;if(typeof window.do_ajax_request!='undefined')do_ajax_request(url+keep_stub(),update_ajax_member_list_response);}
function update_ajax_member_list_response(result,list_contents)
{if(!list_contents)return;if(window.current_list_for==null)return;close_down();var data_list=false;var list=document.createElement(data_list?'datalist':'select');list.className='people_list';list.setAttribute('id','ajax_list');if(data_list)
{window.current_list_for.setAttribute('list','ajax_list');}else
{if(list_contents.childNodes.length==1)
{list.setAttribute('multiple','multiple');}else
{list.setAttribute('size',list_contents.childNodes.length+1);}
list.style.position='absolute';list.style.left=(find_pos_x(window.current_list_for))+'px';list.style.top=(find_pos_y(window.current_list_for)+find_height(window.current_list_for))+'px';}
setTimeout(function(){list.style.zIndex++;},100);if(list_contents.childNodes.length==0)return;var i,item,displaytext;for(i=0;i<list_contents.childNodes.length;i++)
{item=document.createElement('option');item.value=list_contents.childNodes[i].getAttribute('value');displaytext=item.value;if(list_contents.childNodes[i].getAttribute('displayname')!='')
displaytext=list_contents.childNodes[i].getAttribute('displayname');item.text=displaytext;item.innerText=displaytext;list.appendChild(item);}
item=document.createElement('option');item.disabled=true;item.text='(Suggestions)'.toUpperCase();item.innerText='(Suggestions)'.toUpperCase();list.appendChild(item);window.current_list_for.parentNode.appendChild(list);if(data_list)return;if(typeof window.fade_transition!='undefined')
{set_opacity(list,0.0);fade_transition(list,100,30,8);}
var current_list_for_copy=window.current_list_for;if(typeof window.current_list_for.old_onkeyup=='undefined')
window.current_list_for.old_onkeyup=window.current_list_for.onkeyup;if(typeof window.current_list_for.old_onchange=='undefined')
window.current_list_for.old_onchange=window.current_list_for.onchange;var make_selection=function(e)
{if(typeof e=='undefined')e=window.event;var el=e.target;if(!el)el=e.srcElement;current_list_for_copy.value=el.value;current_list_for_copy.onkeyup=current_list_for_copy.old_onkeyup;current_list_for_copy.onchange=current_list_for_copy.old_onchange;current_list_for_copy.onkeypress=function(){};if(typeof current_list_for_copy.onrealchange!='undefined'&&current_list_for_copy.onrealchange)current_list_for_copy.onrealchange(e);if(typeof current_list_for_copy.onchange!='undefined'&&current_list_for_copy.onchange)current_list_for_copy.onchange(e);var al=document.getElementById('ajax_list');al.parentNode.removeChild(al);window.setTimeout(function(){current_list_for_copy.focus();},300);};window.current_list_for.down_once=false;var handle_arrow_usage=function(event){if(typeof event=='undefined')event=window.event;if(!event.shiftKey&&key_pressed(event,40,true))
{current_list_for_copy.disabled=true;window.setTimeout(function(){current_list_for_copy.disabled=false;},1000);var temp=current_list_for_copy.onblur;current_list_for_copy.onblur=function(){};list.focus();current_list_for_copy.onblur=temp;if(!current_list_for_copy.down_once)
{current_list_for_copy.down_once=true;list.selectedIndex=0;}else
{if(list.selectedIndex<list.options.length-1)list.selectedIndex++;}
list.options[list.selectedIndex].selected=true;return cancel_bubbling(event);}
if(!event.shiftKey&&key_pressed(event,38,true))
{current_list_for_copy.disabled=true;window.setTimeout(function(){current_list_for_copy.disabled=false;},1000);var temp=current_list_for_copy.onblur;current_list_for_copy.onblur=function(){};list.focus();current_list_for_copy.onblur=temp;if(!current_list_for_copy.down_once)
{current_list_for_copy.down_once=true;list.selectedIndex=0;}else
{if(list.selectedIndex>0)list.selectedIndex--;}
list.options[list.selectedIndex].selected=true;return cancel_bubbling(event);}
return null;};window.current_list_for.onkeyup=function(event)
{if(typeof event=='undefined')event=window.event;var ret=handle_arrow_usage(event);if(ret!=null)return ret;return update_ajax_member_list(current_list_for_copy,current_list_for_copy.special,false,event);};window.current_list_for.onchange=function(event)
{current_list_for_copy.onkeyup=current_list_for_copy.old_onkeyup;current_list_for_copy.onchange=current_list_for_copy.old_onchange;if(current_list_for_copy.onchange)current_list_for_copy.onchange(event);};list.onkeyup=function(event)
{if(typeof event=='undefined')event=window.event;var ret=handle_arrow_usage(event);if(ret!=null)return ret;if(enter_pressed(event))
{make_selection(event);current_list_for_copy.disabled=true;window.setTimeout(function(){current_list_for_copy.disabled=false;},200);return cancel_bubbling(event);}
if(!event.shiftKey&&key_pressed(event,[40,38],true))
{if(typeof event.preventDefault!='undefined')event.preventDefault();return cancel_bubbling(event);}
return null;};window.current_list_for.onkeypress=function(event)
{if(typeof event=='undefined')event=window.event;if(!event.shiftKey&&key_pressed(event,[40,38],true))
{if(typeof event.preventDefault!='undefined')event.preventDefault();return cancel_bubbling(event);}
return null;};list.onkeypress=function(event)
{if(typeof event=='undefined')event=window.event;if(!event.shiftKey&&key_pressed(event,[40,38,13],true))
{if(typeof event.preventDefault!='undefined')event.preventDefault();return cancel_bubbling(event);}
return null;};add_event_listener_abstract(list,browser_matches('ios')?'change':'click',make_selection,false);window.current_list_for=null;}