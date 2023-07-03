<script context="module" lang="ts">
  export type IToDoItem = {
    done: boolean;
    text: string;
    id: number;
  };
</script>

<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import { fade } from "svelte/transition";

  export let todo: IToDoItem;

  const dispatch = createEventDispatcher();
</script>

<li in:fade class="flex justify-between items-center w-full">
  <label>
    <input
      type="checkbox"
      checked={todo.done}
      aria-checked={todo.done}
      class="checkbox checkbox-success"
      on:change={() => dispatch('toggleDone')}
    />
    <span
      class={`${
        todo.done ? " line-through italic" : ""
      } text-base-content p-2 text-left flex-1 text-sm`}>{todo.text}</span
    >
  </label>
  <div class="tooltip" data-tip="Delete Todo">
    <button aria-label="Delete Todo" class="btn btn-square btn-error"
        on:click={() => dispatch('delete', todo.id)}
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
          clip-rule="evenodd"
        />
      </svg></button
    >
  </div>
</li>
