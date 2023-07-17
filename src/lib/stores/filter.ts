import { writable } from "svelte/store";

export const filterStore = writable<undefined | number>(undefined);