<script>

    import { getSocket } from "../../socketManager/socketManager";
    import { onMount, tick } from "svelte";
    import { loggedInUser } from "../../stores/globalStore";
    import { BASE_URL } from "../../stores/globalStore";

    let messageFromServer = "";
    let message = "";
    let messageToServer = null;
    let chatMessages = [];
    let chatMessageDiv;
    
    const socket = getSocket();

    function handleSendMessage() {
        const timeStamp = new Date();
        messageToServer = {userName: $loggedInUser, message: message, timeStamp: timeStamp}
        socket.emit('chat message to server', messageToServer);
        message = "";
        messageToServer = null;
    }

    const handleGetMessages = async () => {
        try{
            const response = await fetch($BASE_URL + '/api/chatMessages', {
                method: 'GET',
                credentials: 'include',
            });
            const result = await response.json();
            result.data.forEach(message => {
                const date = formatDate(message.timeStamp);
                messageFromServer = `${message.userName}: ${message.message} - ${date}`
                chatMessages = [...chatMessages, messageFromServer];
            });
        }catch(error){
            console.log(error);
        }
    }

    function formatDate(date){
        const dateFromString = new Date(date);
        const dateToHoursAndMinutes = dateFromString.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: false})
        return dateToHoursAndMinutes;
    }
    
    onMount(async () => {
    socket.on('chat message to client', (receivedMessage) => {
        const date = formatDate(receivedMessage.timeStamp)
        const shownMessage = `${receivedMessage.userName}: ${receivedMessage.message} - ${date}`
        chatMessages = [...chatMessages, shownMessage];
        scrollToBottom();
        });
        await handleGetMessages();
        scrollToBottom();
    });


    async function scrollToBottom() {
        await tick();
        if (chatMessageDiv) {
            chatMessageDiv.scrollTop = chatMessageDiv.scrollHeight;
        }
    };

</script>

<div class="chat-container">
    <div class="chat-messages" bind:this={chatMessageDiv} >
        {#each chatMessages as chatMessage}
        <div class="chat-message">{chatMessage}</div>
        {/each}
    </div>
<div class="chat-input">
    <input type="text" bind:value={message} placeholder="Type your message..." />
    <button on:click={handleSendMessage}>Send</button>
</div>
</div>

<style>
.chat-container {
    display: flex;
    flex-direction: column;
    height: 80vh;
}

.chat-messages {
    flex-grow: 1;
    overflow-y: auto;
    background-color: rgb(47, 47, 47);
}

.chat-message {
    margin-bottom: 8px;
}

.chat-input {
    display: flex;
    margin-top: 16px;
}

.chat-input input {
    flex-grow: 1;
    padding: 8px;
    margin-right: 8px;
}

.chat-input button {
    padding: 8px 16px;
}
</style>