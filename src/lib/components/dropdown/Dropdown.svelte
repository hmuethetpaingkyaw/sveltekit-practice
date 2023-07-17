<script lang="ts">
  import Select from "svelte-select";
  import { createEventDispatcher } from "svelte";
  import { filterStore } from "$lib/stores/filter";
  export let items: any[];
  const dispatch = createEventDispatcher();
  function handleChange(detail: any) {
    dispatch("change", detail);
  }

  $: console.log($filterStore)
</script>

<Select {items} showChevron on:change={({ detail }) => handleChange(detail)}>
  <div slot="chevron-icon">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="text-gray-300"
      width={15}
      height={15}
      viewBox="0 0 24 24"
      ><path
        fill="currentColor"
        d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"
      /></svg
    >
  </div>
</Select>
