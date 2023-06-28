<script lang="ts">
  import RegistrationForm from '$lib/components/SearchForm.svelte';

  // props
  export let data;
  export let form;

  // $: console.log(`form: [${JSON.stringify(form, undefined, 2)}]`);
  // $: console.log(`data: [${JSON.stringify(data, undefined, 2)}]`);
</script>

<!-- required to pass form data to component -->
<RegistrationForm {form} />

<!-- TODO: send errors to RegistrationForm -->
{#if data.errors}
  <!-- content here -->
  <ul>
    {#each data.errors as error}
      <li>{error.field} {error.message}</li>
    {/each}
  </ul>
{/if}

<ul>
  {#each data.docs as doc}
    <li>{doc.name}</li>
  {/each}
</ul>
