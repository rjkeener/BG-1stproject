{TITLE}

{+START,IF_NON_EMPTY,{DESCRIPTION}}
	<div itemprop="description">
		{DESCRIPTION}
	</div>
{+END}
<br><div class="box category_sorter inline_block"><div class="box_inner">
	{$SET,show_sort_button,1}
	{SORTING}

</div></div>
{+START,IF,{$CONFIG_OPTION,show_content_tagging}}{TAGS}{+END}
{$SET,bound_catalogue_entry,{$CATALOGUE_ENTRY_FOR,download_category,{ID}}}
{+START,IF_NON_EMPTY,{$GET,bound_catalogue_entry}}{$CATALOGUE_ENTRY_ALL_FIELD_VALUES,{$GET,bound_catalogue_entry}}{+END}

{+START,IF_NON_EMPTY,{SUBCATEGORIES}}
	<div class="box box___download_category_screen"><div class="box_inner compacted_subbox_stream">
		<h2>{$?,{$EQ,{ID},1},{!CATEGORIES},{!SUBCATEGORIES_HERE}}</h2>

		<div>
			{SUBCATEGORIES}
		</div>
	</div></div>
{+END}

{+START,IF_NON_EMPTY,{DOWNLOADS}}
	{DOWNLOADS}
{+END}

<div class="right">
	{+START,INCLUDE,NOTIFICATION_BUTTONS}
		NOTIFICATIONS_TYPE=download
		NOTIFICATIONS_ID={ID}
	{+END}
</div>



{+START,IF,{$CONFIG_OPTION,show_content_tagging}}{TAGS}{+END}

{$REVIEW_STATUS,download_category,{ID}}

{$,Load up the staff actions template to display staff actions uniformly (we relay our parameters to it)...}
{+START,INCLUDE,STAFF_ACTIONS}
	1_URL={SUBMIT_URL*}
	1_TITLE={!ADD_DOWNLOAD}
	1_REL=add
	1_ICON=menu/_generic_admin/add_one
	2_URL={ADD_CAT_URL*}
	2_TITLE={!ADD_DOWNLOAD_CATEGORY}
	2_REL=add
	2_ICON=menu/_generic_admin/add_one_category
	3_ACCESSKEY=q
	3_URL={EDIT_CAT_URL*}
	3_TITLE={!EDIT_DOWNLOAD_CATEGORY}
	3_REL=edit
	3_ICON=menu/_generic_admin/edit_this_category
{+END}

{+START,IF,{$CONFIG_OPTION,show_screen_actions}}{$BLOCK,failsafe=1,block=main_screen_actions,title={$METADATA,title}}{+END}


