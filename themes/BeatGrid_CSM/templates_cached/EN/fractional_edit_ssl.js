"use strict";function fractional_edit(event,object,url,raw_text,edit_param_name,was_double_click,control_button,type)
{if(typeof was_double_click=='undefined')was_double_click=false;if(typeof control_button=='undefined')control_button=null;if(typeof type=='undefined')type='line';if((magic_keypress(event))||(was_double_click)||(object!=event.target))
{cancel_bubbling(event);if(typeof event.preventDefault!='undefined')event.preventDefault();var width=find_width(object);if(width<160)width=160;var x=find_pos_x(object,true);var y=find_pos_y(object,true)-8;object.old_onclick=object.onclick;object.old_ondblclick=object.ondblclick;object.old_onkeypress=object.onkeypress;var form=document.createElement('form');form.method='post';form.action=url;form.style.display='inline';var populated_value;if(typeof object.raw_text!='undefined')
{populated_value=object.raw_text;}else
{object.raw_text=raw_text;populated_value=raw_text;}
var input;switch(type)
{case'line':input=document.createElement('input');if(raw_text.length>255)
{input.setAttribute('size','30');}else
{input.setAttribute('maxlength','255');}
input.value=populated_value;break;case'textarea':input=document.createElement('textarea');input.value=populated_value;input.rows='6';break;default:input=document.createElement('select');var list_options=type.split('|');var list_option;for(var i=0;i<list_options.length;i++)
{list_option=document.createElement('option');set_inner_html(list_option,escape_html(list_options[i]));list_option.selected=(populated_value==list_options[i]);input.appendChild(list_option);}
break;}
input.style.position='absolute';input.style.left=(x)+'px';if(raw_text.length<=255)input.style.width=width+'px';input.style.top=(y+8)+'px';input.style.margin=0;var to_copy=['font-size','font-weight','font-style'];if(type=='line')
{to_copy.push('border');to_copy.push('border-top');to_copy.push('border-right');to_copy.push('border-bottom');to_copy.push('border-left');}
for(var i=0;i<to_copy.length;i++)
{var style=abstract_get_computed_style(object.parentNode,to_copy[i]);if(typeof style!='undefined')input.style[to_copy[i]]=style;}
input.name=edit_param_name;form.onsubmit=function(event){return false;};if(control_button)set_inner_html(control_button,'Save');var cleanup_function=function(){object.onclick=object.old_onclick;object.ondblclick=object.old_ondblclick;object.onkeypress=object.old_onkeypress;if(input.form.parentNode)
{input.onblur=null;input.form.parentNode.removeChild(input.form);}
if(control_button)
{set_inner_html(control_button,'Edit');var backup=control_button.onclick;control_button.onclick=function(){return false;};window.setTimeout(function(){control_button.onclick=backup;},10);}};var cancel_function=function(){cleanup_function();window.fauxmodal_alert('You canceled the inline edit.',null,'Inline editing');return false;};var save_function=function(){var response=do_ajax_request(input.form.action,null,input.name+'='+window.encodeURIComponent(input.value));if(((response.responseText=='')&&(input.value!=''))||(response.status!=200))
{var session_test_url='/data/confirm_session.php';var session_test_ret=do_ajax_request(session_test_url+keep_stub(true),null);if((session_test_ret.responseText!='')&&(session_test_ret.responseText!=null))
{confirm_session(function(result)
{if(result)
{save_function();}else
{cleanup_function();}});}else
{cleanup_function();window.fauxmodal_alert((response.status==500)?response.responseText:'There was an error performing the inline edit.',null,'Inline editing');}}else
{object.raw_text=input.value;set_inner_html(object,response.responseText);cleanup_function();}
return false;};object.onclick=object.ondblclick=function(event)
{if(typeof event=='undefined')event=window.event;cancel_bubbling(event);if(typeof event.preventDefault!='undefined')event.preventDefault();if(magic_keypress(event))cleanup_function();return false;};if(type=='line')input.onkeyup=function(event)
{if(typeof event=='undefined')event=window.event;if(key_pressed(event,[27],true))
{var tmp=input.onblur;input.onblur=null;fauxmodal_confirm('Are you sure you wish to cancel?',function(result){if(result)
{cancel_function();}else
{input.focus();input.onblur=tmp;}},'Please confirm that you want the following:');return null;}
if((enter_pressed(event))&&(this.value!=''))
{return save_function();}
return null;};input.onblur=function(event)
{if(this.value!=''||raw_text=='')save_function();else cancel_function();};form.appendChild(input);var website_inner=document.body;website_inner.appendChild(form);input.focus();if(typeof input.select!='undefined')input.select();return false;}
return null;}