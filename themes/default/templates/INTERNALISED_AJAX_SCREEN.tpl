{$SET,ajax_internalised_ajax_wrapper,ajax_internalised_ajax_wrapper_{$RAND%}}
<div id="{$GET*,ajax_internalised_ajax_wrapper}">
	{SCREEN_CONTENT}

	{$REQUIRE_JAVASCRIPT,ajax}
	{$REQUIRE_JAVASCRIPT,checking}

	<script>// <![CDATA[
		add_event_listener_abstract(window,'load',function() {
			internalise_ajax_block_wrapper_links('{URL;/}',document.getElementById('{$GET;,ajax_internalised_ajax_wrapper}'),['.*'],{ },false,true);
		});
	//]]></script>
</div>

{+START,IF_PASSED,CHANGE_DETECTION_URL}{+START,IF_NON_EMPTY,{CHANGE_DETECTION_URL}}
	<script>
	// <![CDATA[
		{+START,IF_NON_EMPTY,{REFRESH_TIME}}
			window.detect_interval=window.setInterval(
				function() {
					if (typeof window.detect_change!='undefined')
					{
						detect_change('{CHANGE_DETECTION_URL;/}','{REFRESH_IF_CHANGED;/}',function() {
							if ((!document.getElementById('post')) || (document.getElementById('post').value==''))
							{
								var _detected_change=detected_change;
								call_block('{URL;/}','',document.getElementById('{$GET;,ajax_internalised_ajax_wrapper}'),false,_detected_change,false,null,true);
							}
						});
					}
				},
				{REFRESH_TIME%}*1000);
		{+END}
	//]]></script>
{+END}{+END}

