<section class="box box___main_content cguid_{_GUID|*}"><div class="box_inner">
	{+START,NO_PREPROCESSING}
		{$SET,content_box_title,}
		{$SET,skip_content_box_title,1}
		{$SET,eval_content,{CONTENT}}{$,Force early evaluation, to get title}
		{+START,IF_NON_EMPTY,{TITLE}}
			<h2>
				{TITLE*}{+START,IF_NON_EMPTY,{$GET,content_box_title}}: {$GET,content_box_title}{+END}
			</h2>
		{+END}
		{$SET,skip_content_box_title,0}
	{+END}

	{$PREG_REPLACE,^\s*<section class="box [^"]+"><div class="box_inner">,,{$PREG_REPLACE,</div></section>\s*$,,{$GET,eval_content}}}

	{+START,IF_NON_EMPTY,{SUBMIT_URL}{ARCHIVE_URL}}
		<ul class="horizontal_links associated_links_block_group force_margin">
			{+START,IF_NON_EMPTY,{SUBMIT_URL}}
				<li><a rel="add" href="{SUBMIT_URL*}">{!ADD}</a></li>
			{+END}
			{+START,IF_NON_EMPTY,{ARCHIVE_URL}}
				<li><a href="{ARCHIVE_URL*}" title="{!ARCHIVES}: {TYPE*}">{!ARCHIVES}</a></li>
			{+END}
		</ul>
	{+END}
</div></section>
