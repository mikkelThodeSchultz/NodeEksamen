import { writable, readable } from "svelte/store";

export const BASE_URL = readable("http://localhost:8080");
export const loggedInUser = writable();
export const userRole = writable();