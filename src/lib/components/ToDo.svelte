<script lang="ts">
  import type { IToDoItem } from "./ToDoList.svelte";
  import ToDoList from "./ToDoList.svelte";

  let todos: IToDoItem[] = [];
  let inputValue: string = '';

  const addToDo = () => {
    todos = todos.concat({
      text: inputValue,
      done: false,
      id: Math.random() * 1000,
    });
  };

  const deleteToDo = (id: number) => {
    todos = todos.filter((todo) => todo.id !== id);
  };
  const toggleDone = (id: number) => {
    todos = todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  };

  $: completedToDo = todos?.reduce((total: number, todo: IToDoItem) => {
    return todo.done ? total : total + 1;
  }, 0);

  $: status = `${completedToDo} out of ${todos.length} remaining`;
</script>

<div
  class="flex flex-col items-center justify-end bg-base-300 rounded p-10 px-14 gap-4 shadow-md"
>
  <h2
    class="font-extrabold text-center align-middle text-secondary-content text-3xl p-2 mb-4"
  >
    To Do App
  </h2>
  <div class="italic text-xs flex items-center w-full">
    <div class="flex-1 px-2 py-3 text-base-content">{status}</div>
    <div class="tooltip" data-tip="Archive Completed Todos">
      <button
        aria-label="Archive Completed Todos"
        type="button"
        class="btn btn-square btn-accent"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
          <path
            fill-rule="evenodd"
            d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
            clip-rule="evenodd"
          />
        </svg></button
      >
    </div>
  </div>
  <form class="flex justify-between align-middle items-center gap-2">
    <input
      type="text"
      placeholder="enter a new todo"
      class="input input-bordered input-success w-full max-w-xs"
      bind:value={inputValue}
    />
    <div class="tooltip" data-tip="Add Todo">
      <button
        aria-label="Enter a new Todo"
        class="btn btn-square btn-secondary"
        on:click={addToDo}
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </div>
  </form>
  <ul class="flex flex-col items-center justify-end w-full space-y-2">
    {#each todos as todo (todo.id)}
      <ToDoList
        {todo}
        on:delete={({ detail }) => deleteToDo(detail)}
        on:toggleDone={() => toggleDone(todo.id)}
      />
    {/each}
  </ul>
</div>
