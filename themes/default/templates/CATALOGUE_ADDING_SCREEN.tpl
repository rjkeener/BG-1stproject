{TITLE}

{$PARAGRAPH,{TEXT}}

{+START,INCLUDE,FORM_SCREEN_ARE_REQUIRED}{+END}

<form title="{!PRIMARY_PAGE_FORM}" method="post" action="{URL*}" target="_top" id="catalogue_form" autocomplete="off" onsubmit="return modsecurity_workaround(this);">
	{$INSERT_SPAMMER_BLACKHOLE}

	<div>
		{HIDDEN}

		{+START,IF_NON_EMPTY,{FIELDS}}
			<div class="wide_table_wrap"><table class="map_table form_table wide_table scrollable_inside">
				{+START,IF,{$NOT,{$MOBILE}}}
					<colgroup>
						<col class="field_name_column" />
						<col class="field_input_column" />
					</colgroup>
				{+END}

				<tbody>
					{FIELDS}
				</tbody>
			</table></div>
		{+END}

		<h2>{!FIELDS_NEW}</h2>

		<p>{!FIELDS_NEW_HELP}</p>
		{FIELDS_NEW}

		<script>// <![CDATA[
			add_event_listener_abstract(window,'load',function() {
				catalogue_field_change_watching();
			});
		//]]></script>

		{+START,INCLUDE,FORM_STANDARD_END}
			FORM_NAME=catalogue_form
			SUPPORT_AUTOSAVE=1
		{+END}
	</div>
</form>

