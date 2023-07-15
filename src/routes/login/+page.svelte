<script lang="ts">
  import { goto } from "$app/navigation";
  import { call } from "$lib/utils/apiCall";
  import { setToken, setUser } from "$lib/utils/cache";
  import { redirect } from "@sveltejs/kit";

    let userInfo = {
        name: "", 
        password: ""
    }
    let isSignUp = true;
    const handleSignUp = () => {
        isSignUp = !isSignUp;
    }
    const handleSubmit = async () => {
        if(userInfo.name === "" || userInfo.password === "") {
            return;
        }
        const endpoint = isSignUp ? 'register' : 'login'
        const result = await call('post', `/users/${endpoint}`, userInfo)
        if(result) {
            setToken(result.data.token);
            setUser(result.data.user);
            goto('/chatting')
        }
    }
</script>

<section class="bg-gray-50 dark:bg-gray-900">
  <div
    class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
  >
    <a
      href="#"
      class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
    >
      <img
        class="w-8 h-8 mr-2"
        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
        alt="logo"
      />
      Hmue Chatting
    </a>
    <div
      class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
          class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
        >
        {!isSignUp ? 'Log in' : 'Sign up'} to your account
        </h1>
        <form class="space-y-4 md:space-y-6" on:submit|preventDefault={handleSubmit}>
          <div>
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              
              >Your name</label
            >
            <input
              type="name"
              name="name"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name"
              bind:value={userInfo.name}
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Password</label
            >
            <input
              type="password"
              name="password"
              id="password"
              bind:value={userInfo.password}
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
         
          <button
            type="submit"
            class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
            {!isSignUp ? 'Log in' : 'Sign Up'}
            </button
          >
          {#if isSignUp}
          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
           Already have an account ? <span
                on:click={handleSignUp}
              class="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >Log in</span
            >
          </p>
          {:else}
          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet? <span
                on:click={handleSignUp}
              class="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >Sign up</span
            >
          </p>
          {/if}
        </form>
      </div>
    </div>
  </div>
</section>
