<script lang="ts">
  import Dropdown from "$lib/components/dropdown/Dropdown.svelte";
  import { filterStore } from "$lib/stores/filter";
  import axios from "axios";
  import { onMount } from "svelte";

  let posts: any[] = [];
  let users: any[] = [];
  onMount(async () => {
    const firstRequest = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const secondRequest = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const [postsResult, usersResult] = await Promise.all([
      firstRequest,
      secondRequest,
    ]);

    posts = postsResult.data;
    users = usersResult?.data?.map((user: any) => {
      return {
        value: user?.id,
        label: user?.name,
      };
    });
  });

  const fetchProducts = async (event : any) => {
    const {value : userId} = event.detail;
    $filterStore = userId;
    const query = `?userId=${userId}`;
    const result = await axios.get(
      `https://jsonplaceholder.typicode.com/posts${query}`
    );
    posts = result.data;
  };
</script>

<div class="p-5">
  <h2 class="py-5">This is a store testing for filtering.</h2>
  <div class="w-60">
    <span>Filter by posts</span>
    <Dropdown items={users} on:change={fetchProducts}/>
  </div>
  <ul>
    {#each posts as product}
      <li>{product.title}</li>
    {/each}
  </ul>
</div>
