
  import { onDestroy, onMount } from "svelte";
  import { browser } from '$app/environment';
   const useDimensions = (targetRef: any) => {
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
      if(browser) {
        window.addEventListener("resize", handleResize);
      }
      getDimensions();
    });

    onDestroy(() => {
      if(browser) {
        window.removeEventListener("resize", handleResize);
      }
    });
    return dimensions;
  };

  export default useDimensions

