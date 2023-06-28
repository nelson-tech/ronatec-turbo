<script lang="ts">
  import { page } from '$app/stores';

  // props
  // export let form;

  const s = $page.url.searchParams.get('s') || '';

  const required = false;
  // $: console.log(`form: [${JSON.stringify(form, undefined, 2)}]`);
</script>

<form method="get" action="?/search">
  <!-- TODO: remove value -->
  <input type="input" name="s" placeholder="search" value={s} {required} />
  <!-- TODO: add errors -->
  <!-- {#if form?.missing}
    <p class="error">This field is required</p>
  {/if} -->
  <button type="submit">Search</button>
</form>
