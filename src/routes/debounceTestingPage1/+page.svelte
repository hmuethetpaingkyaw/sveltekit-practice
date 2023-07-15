<script lang="ts">
  import { call } from "$lib/utils/apiCall";
  import { debounceApiCall } from "$lib/utils/debounceApiCall";
  import axios from "axios";
  import { onMount } from "svelte";

  let products: any[] = [];
  onMount(async () => {
   
    debounceApiCall("https://fakestoreapi.com/products")
      .then((data : any) => {
        products = data
      })
      .catch((error) => {
        console.error(error);
      });

    // const result = await axios.get('https://fakestoreapi.com/products');
    // products = result.data
  });
</script>

<div>
  <h2>
    This is a testing page 1 for debouncing in javascript by limiting api
    request when user go through pages really quick.
  </h2>
  <ul>
    {#each products as product}
      <li>{product.title}</li>
    {/each}
  </ul>
</div>
