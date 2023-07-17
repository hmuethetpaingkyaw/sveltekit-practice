<script lang="ts">
  const routes = [
    {
      name: "Barchart",
      link: "/barchart",
    },
    {
      name: "Map",
      link: "/map",
    },
    {
      name: "Chatting",
      link: "/chatting",
    },
    {
      name: "Debounce",
      collapse: true,
      views: [
        {
          name: "Debounce Testing Page 1",
          link: "/debounceTestingPage1",
        },
        {
          name: "Debounce Testing Page 2",
          link: "/debounceTestingPage2",
        },
      ],
    },
  ];
  let dropdownOpen = false;
</script>

<nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div
    class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
  >
    <a href="/" class="flex items-center">
      <span
        class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
        >Hmue SvelteKit experiments</span
      >
    </a>
    <button
      data-collapse-toggle="navbar-default"
      type="button"
      class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      aria-controls="navbar-default"
      aria-expanded="false"
    >
      <span class="sr-only">Open main menu</span>
      <svg
        class="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 17 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M1 1h15M1 7h15M1 13h15"
        />
      </svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul
        class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
      >
        {#each routes as route}
          {#if route.collapse}
            <div class="flex flex-col">
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button"
                on:click={() => {
                  dropdownOpen = !dropdownOpen;
                }}
              >
                {route.name}
                <svg
                  class="w-2.5 h-2.5 ml-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg></button
              >
              <!-- Dropdown menu -->
              {#if dropdownOpen}
                <div
                  id="dropdown"
                  class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    class="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    {#each route.views as view}
                      <li>
                        <a
                          href={view?.link}
                          class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >{view.name}</a
                        >
                      </li>
                    {/each}
                  </ul>
                </div>
              {/if}
            </div>
          {:else}
            <li>
              <a
                href={route?.link}
                class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page">{route?.name}</a
              >
            </li>
          {/if}
        {/each}
      </ul>
    </div>
  </div>
</nav>
