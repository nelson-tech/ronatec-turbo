<script lang="ts">
	// props
	export let form;

	const required = false;
	$: console.log(`form: [${JSON.stringify(form, undefined, 2)}]`);
</script>

<form method="get" action="?/search">
	<input type="input" name="s" placeholder="search" value={form?.inputSearch ?? ''} {required} />
	{#if form?.missing}
		<p class="error">This field is required</p>
	{/if}
	<button type="submit">Search</button>
</form>
