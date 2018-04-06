<div class="box box___news_box"><div class="box_inner">
	{+START,IF,{$HAS_DELETE_PERMISSION,mid,{SUBMITTER},{$MEMBER},cms_news}}
		{+START,INCLUDE,MASS_SELECT_MARKER}
			TYPE=news
			ID={ID}
		{+END}

		{$INC,has_mass_select}
	{+END}

	{+START,SET,content_box_title}
		{+START,IF,{GIVE_CONTEXT}}
			{!CONTENT_IS_OF_TYPE,{!NEWS},{NEWS_TITLE}}
		{+END}
		{+START,IF,{$NOT,{GIVE_CONTEXT}}}
			{+START,IF_PASSED,ID}
				{+START,FRACTIONAL_EDITABLE,{NEWS_TITLE_PLAIN},title,_SEARCH:cms_news:__edit:{ID},1}{$TRUNCATE_LEFT,{NEWS_TITLE},90,1,1}{+END}
			{+END}
			{+START,IF_NON_PASSED,ID}
				{$TRUNCATE_LEFT,{NEWS_TITLE},70,1,1}
			{+END}
		{+END}
	{+END}
	{+START,IF,{$NOT,{$GET,skip_content_box_title}}}
		<a href="{FULL_URL*}"><h3>{$GET,content_box_title}</h3></a>
	{+END}

	{+START,IF,{$AND,{$NOT,{BLOG}},{$IS_NON_EMPTY,{AUTHOR_URL}}}}
		<div class="newscat_img newscat_img_author" >
			{+START,IF,{$NOT,{$MOBILE}}}{+START,IF_NON_EMPTY,{CATEGORY}}

				<img src="{$ENSURE_PROTOCOL_SUITABILITY*,{IMG}}" alt=""/>
	
			{+END}{+END}
		</div>
	{+END}

	{+START,IF,{$NOT,{$IS_NON_EMPTY,{AUTHOR_URL}}}}
		<a class="newscat_img newscat_img_member">
			{+START,IF,{$NOT,{$MOBILE}}}{+START,IF_NON_EMPTY,{$AVATAR,{SUBMITTER}}}
			{+END}{+END}

			{+START,IF,{$NOT,{$MOBILE}}}{+START,IF,{$CNS}}{+START,IF_NON_EMPTY,{$CNS_RANK_IMAGE,{SUBMITTER}}}
				<p>{$CNS_RANK_IMAGE,{SUBMITTER}}</p>
			{+END}{+END}{+END}
		</a>
	{+END}
	

	{+START,IF_NON_EMPTY,{NEWS}}
		{+START,IF,{$AND,{$NOT,{$IN_STR,{NEWS},<p><div>}},{$NOT,{$IN_STR,{NEWS},<h}}}}<p class="news_summary_p">{+END}
		{+START,IF,{TRUNCATE}}{$TRUNCATE_LEFT,{NEWS},150,0,1,0,0.4}{+END}
		{$SET,large_news_posts,{$NOT,{TRUNCATE}}}
		{+START,IF,{$NOT,{TRUNCATE}}}{NEWS}{+END}
		{+START,IF,{$AND,{$NOT,{$IN_STR,{NEWS},<p><div>}},{$NOT,{$IN_STR,{NEWS},<h}}}}</p>{+END}
	{+END}
	

	{+START,IF_PASSED,TAGS}
		{+START,IF,{$CONFIG_OPTION,show_content_tagging_inline}}{TAGS}{+END}
	{+END}


</div>

		<div class="meta_details" role="note">
		<spav><ul class="meta_details_list">
			{+START,SET,author_details}
				{+START,IF,{$IS_NON_EMPTY,{AUTHOR_URL}}}
{CATEGORY} | {DATE*} | {+START,IF,{$NOT,{$MATCH_KEY_MATCH,forum:topicview,forum:forumview}}} {+START,IF_PASSED_AND_TRUE,COMMENT_COUNT}<span class="comment_count">{$COMMENT_COUNT,news,{ID}}</span>{+END}{+END}
				{+END}
				


				{+START,IF,{$IS_EMPTY,{AUTHOR_URL}}}
					{+START,IF_NON_EMPTY,{$USERNAME*,{SUBMITTER},1}}
						{!BY_SIMPLE,<a rel="author" href="{$MEMBER_PROFILE_URL*,{SUBMITTER}}">{$USERNAME*,{SUBMITTER},1}</a>}
						{+START,INCLUDE,MEMBER_TOOLTIP}{+END}
					{+END}
				{+END}
			{+END}
			{+START,IF_NON_EMPTY,{$GET,author_details}}
				<li>
					{$GET,author_details}
				</li>
			{+END}
		</ul></span>
	</div>


</div>

