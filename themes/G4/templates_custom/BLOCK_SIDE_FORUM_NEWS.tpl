<section class="box box___block_side_forum_news"><div class="box_inner">
	{+START,IF_NON_EMPTY,{TITLE}}<h3>{TITLE}</h3>{+END}

	{+START,IF_EMPTY,{NEWS}}
		<p class="nothing_here">{!NO_NEWS}</p>
	{+END}
	{+START,IF_NON_EMPTY,{NEWS}}
		<div class="webstandards_checker_off">
			{+START,LOOP,NEWS}
				<div class="box box___block_side_forum_news_summary"><div class="box_inner">
					<p class="tiny_paragraph">
						<a title="{$STRIP_TAGS,{NEWS_TITLE}}" href="{FULL_URL*}">{$TRUNCATE_LEFT,{NEWS_TITLE},25,0,1}</a>
						<span style="float:right">{!_COMMENTS,{$SUBTRACT,{REPLIES},1}}</span>
					</p>

				</div></div>
			{+END}
		</div>
	{+END}

	{+START,IF_NON_EMPTY,{ARCHIVE_URL}{SUBMIT_URL}}
		<ul class="horizontal_links associated_links_block_group force_margin">
			{+START,IF_NON_EMPTY,{ARCHIVE_URL}}
				<li><a rel="archives" href="{ARCHIVE_URL*}">{!VIEW_ARCHIVE}</a></li>
			{+END}

		</ul>
	{+END}
</div></section>

