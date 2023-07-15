<script lang="ts" context="module">
    export type User = {
        _id: string,
        name: string
    };
</script>
<script lang="ts">
  import { onMount } from "svelte";

    let users : User[];

    onMount(()=> {
        
    })
</script>

<div class="w-1/3 shadow-md flex flex-col">
  <h3 class="text-center">Users</h3>
  <ul class="px-5 divide-y-2">
    <li class="py-5">Lynn</li>
  </ul>
</div>
