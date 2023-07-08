<script>
	  import Navbar from "$lib/components/navbar/Navbar.svelte";
import "../app.css";
import Analytics from '$lib/analytics.svelte'
</script>


<Analytics />

		<Navbar />
	
	<main class="w-full h-screen bg-white">
		<slot />
	</main>


<style>
	
</style>
