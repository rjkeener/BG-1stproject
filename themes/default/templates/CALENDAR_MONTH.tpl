<table class="spread_table calendar_month">
	<colgroup>
		<col class="calendar_month_column_heading" />
		<col class="calendar_month_column_day" />
		<col class="calendar_month_column_day" />
		<col class="calendar_month_column_day" />
		<col class="calendar_month_column_day" />
		<col class="calendar_month_column_day" />
		<col class="calendar_month_column_day" />
		<col class="calendar_month_column_day" />
	</colgroup>

	<thead>
		<tr>
			<th></th>
			{+START,IF,{$SSW}}
			<th><span>{$?,{$MOBILE},{!SUNDAY},{!SUNDAY}}</span></th>
			{+END}
			<th><span>{$?,{$MOBILE},{!FC_MONDAY},{!MONDAY}}</span></th>
			<th><span>{$?,{$MOBILE},{!FC_TUESDAY},{!TUESDAY}}</span></th>
			<th><span>{$?,{$MOBILE},{!FC_WEDNESDAY},{!WEDNESDAY}}</span></th>
			<th><span>{$?,{$MOBILE},{!FC_THURSDAY},{!THURSDAY}}</span></th>
			<th><span>{$?,{$MOBILE},{!FC_FRIDAY},{!FRIDAY}}</span></th>
			<th><span>{$?,{$MOBILE},{!FC_SATURDAY},{!SATURDAY}}</span></th>
			{+START,IF,{$NOT,{$SSW}}}
			<th><span>{$?,{$MOBILE},{!FC_SUNDAY},{!SUNDAY}}</span></th>
			{+END}
		</tr>
	</thead>

	<tbody>
		{WEEKS}
	</tbody>
</table>
