<script>
    import toastr from "toastr";
    import { getSocket } from "../../socketManager/socketManager.js";
    import { onDestroy } from "svelte";
    import { showModal, hideModal, modalMessage } from "../../stores/modalStore.js";


    let adminMessage = "";
    const socket = getSocket();
    let eventListener = null;
    
    function handleSendMessage() {
        socket.emit("An Admin sent a message", {data: adminMessage})
    };

    function setupEventListener() {
        eventListener = (data) => {
            showModal(data.data);
        };
        socket.on("An Admin message just dropped", eventListener);
    };

    function cleanupEventListener() {
        if (eventListener) {
        socket.off("An Admin message just dropped", eventListener);
        eventListener = null;
        };
    };

    setupEventListener();

    onDestroy(cleanupEventListener);
    
</script>
    


<h1>THIS IS ADMIN POPUP</h1>

<textarea rows="10" cols="50" id="admin-message" bind:value={adminMessage}></textarea>
<button on:click|preventDefault={handleSendMessage}>Send message</button>
