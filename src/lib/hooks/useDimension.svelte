<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  export const useDimensions = (targetRef: any) => {
    let dimensions = {
      width: 0,
      height: 0,
    };

    const getDimensions = () => {
      dimensions = {
        width: targetRef.current ? targetRef.current.offsetWidth : 0,
        height: targetRef.current ? targetRef.current.offsetHeight : 0,
      };
    };

    const handleResize = () => {
      getDimensions();
    };

    onMount(() => {
      window.addEventListener("resize", handleResize);
      getDimensions();
    });

    onDestroy(() => {
      window.removeEventListener("resize", handleResize);
    });
    return dimensions;
  };
</script>
