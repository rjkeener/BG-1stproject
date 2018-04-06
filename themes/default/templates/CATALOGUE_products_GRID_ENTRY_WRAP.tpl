<section class="box box___catalogue_products_grid_entry_wrap"><div class="box_inner">
	<h3><span class="name">{FIELD_0}</span></h3>

	{+START,IF_NON_EMPTY,{FIELD_7_THUMB}}
		<div class="catalogue_entry_box_thumbnail">
			<a href="{VIEW_URL*}">{FIELD_7_THUMB}</a>
		</div>
	{+END}

	{+START,IF,{ALLOW_RATING}}
		<div class="ratings">
			{RATING}
		</div>
	{+END}

	<div class="price_box">
		<span class="price">{$CURRENCY_SYMBOL}{$FLOAT_FORMAT*,{FIELD_2_PLAIN}}</span>
	</div>

	<div class="buttons_group">
		{+START,IF_PASSED,ADD_TO_CART}
			<a class="button_screen_item buttons__cart_add" href="{ADD_TO_CART*}" title="{!ADD_TO_CART}"><span>{!BUY}</span></a>
		{+END}
		<a class="button_screen_item buttons__more" href="{VIEW_URL*}" title="{!VIEW_PRODUCT}"><span>{!VIEW}</span></a>
	</div>
</div></section>
