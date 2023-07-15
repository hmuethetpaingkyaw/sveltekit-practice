<script lang="ts">
  import { call } from "$lib/utils/apiCall";
  import { debounceApiCall } from "$lib/utils/debounceApiCall";
  import axios from "axios";
  import { onMount } from "svelte";

  let users: any[] = [];
  onMount(async () => {
    debounceApiCall("https://fakestoreapi.com/users")
      .then((data: any) => {
        users = data;
      })
      .catch((error) => {
        console.error(error);
      });
    // const result = await axios.get('https://fakestoreapi.com/users');
    // users = result.data
  });
</script>

<div>
  <h2>
    This is a testing page 2 for debouncing in javascript by limiting api
    request when user go through pages really quick.
  </h2>
  <ul>
    {#each users as user}
      <li>{user.email}</li>
    {/each}
  </ul>
</div>
