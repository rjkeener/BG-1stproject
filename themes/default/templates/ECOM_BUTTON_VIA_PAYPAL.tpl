<form title="{!MAKE_PAYMENT}" class="left" action="{IPN_URL*}" method="post" autocomplete="off">
	<input type="hidden" name="cmd" value="_xclick" />
	<input type="hidden" name="charset" value="{!charset}" />
	<input type="hidden" name="business" value="{PAYMENT_ADDRESS*}" />
	<input type="hidden" name="amount" value="{AMOUNT*}" />
	<input type="hidden" name="notify_url" value="{$FIND_SCRIPT*,ecommerce,1}?from=paypal&amp;type_code={TYPE_CODE*}" />
	<input type="hidden" name="no_shipping" value="1" />
	<input type="hidden" name="return" value="{$PAGE_LINK*,_SEARCH:purchase:finish:type_code={TYPE_CODE}:from=paypal}" />
	<input type="hidden" name="cancel_return" value="{$PAGE_LINK*,_SEARCH:purchase:finish:cancel=1:from=paypal}" />
	<input type="hidden" name="currency_code" value="{CURRENCY*}" />
	<input type="hidden" name="custom" value="{PURCHASE_ID*}" />
	<input type="hidden" name="item_name" value="{ITEM_NAME*}" />
	<input type="hidden" name="item_number" value="1" />
	<input type="hidden" name="rm" value="2" />
	<input type="hidden" name="bn" value="ocproducts_SP" />

	{+START,IF_NON_EMPTY,{MEMBER_ADDRESS}}
		<input type="hidden" name="address_override" value="1" />
		{+START,LOOP,MEMBER_ADDRESS}
			{+START,IF_NON_EMPTY,{_loop_key*}}{+START,IF_NON_EMPTY,{_loop_var*}}
				<input type="hidden" name="{_loop_key*}" value="{_loop_var*}" />
			{+END}{+END}
		{+END}
	{+END}

	<div class="purchase_button">
		<input style="border: 0px" type="image" src="https://www.paypal.com/en_US/i/btn/x-click-but23.gif" name="submit" alt="Make payments with PayPal - it's fast, free and secure!" />
	</div>
</form>

