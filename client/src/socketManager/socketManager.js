import io from "socket.io-client";

let socket = null;

export function initializeSocket() {
    if (!socket) {
    socket = io("localhost:8080");
    }
}

export function getSocket() {
    return socket;
}

