import { writable } from 'svelte/store';

export const modalMessage = writable('');

export function showModal(message) {
    modalMessage.set(message);
}

export function hideModal() {
    modalMessage.set('');
}
