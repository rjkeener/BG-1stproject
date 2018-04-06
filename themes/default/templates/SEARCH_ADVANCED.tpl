{+START,IF,{$OR,{$AND,{UNDERNEATH},{$IS_NON_EMPTY,{TREE}}},{$IS_NON_EMPTY,{OPTIONS}}}}
	<tr class="search_form_screen_advanced">
		<td colspan="3">
			<h3 class="search_advanced_title">{!ADVANCED}&hellip;</h3>

			{+START,IF_NON_EMPTY,{OPTIONS}}
				<p><em>{!TEMPLATE_SEARCH_INFO}</em></p>

				{OPTIONS}
			{+END}

			{+START,IF,{UNDERNEATH}}
				<div class="float_surrounder">
					<p>
						<label for="search_under">{!SEARCH_UNDERNEATH}:</label>
					</p>
					<div>
						{+START,IF,{AJAX}}
							{TREE}
						{+END}
						{+START,IF,{$NOT,{AJAX}}}
							<select id="search_under" name="search_under">
								{TREE}
							</select>
						{+END}
					</div>
				</div>
			{+END}
		</td>
	</tr>
{+END}
