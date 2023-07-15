<script lang="ts">
  import { browser } from "$app/environment";
  import { call } from "$lib/utils/apiCall";
  import { throttledAPICall } from "$lib/utils/throttleApiCall";
  import axios from "axios";
  import { onMount } from "svelte";

  let posts: any[] = [];

  const fetchData = async () => {
    const result = await throttledAPICall(
      `https://dummyjson.com/posts?skip=${posts.length}&limit=10`
    );
 
    
    if (result) {
        console.log("call");
        
      posts = [...posts, ...result?.posts];
    }
  };

  onMount(async () => {
    const result = await axios.get(
      "https://dummyjson.com/posts?skip=0&limit=10"
    );
    posts = [...posts, ...result.data.posts];
  });

  onMount(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleScroll = async () => {
    // if (
    //   window.innerHeight + document.documentElement.scrollTop !==
    //   document.documentElement.offsetHeight
    // ) {
    //   return;
    // }
    // await fetchData();
    if (browser) {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.offsetHeight;
      const scrollPosition =
        document.documentElement.scrollTop || document.body.scrollTop;

      if (scrollPosition + windowHeight >= documentHeight) {
        await fetchData();
      }
    }
  };
</script>

<div class="p-5 flex flex-wrap">
  {#each posts as post}
    <div
      class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {post.title}
      </h5>
      <p class="font-normal text-gray-700 dark:text-gray-400">
        {post.body}
      </p>
    </div>
  {/each}
  
</div>
