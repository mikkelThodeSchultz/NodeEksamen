<script>

    import { getSocket } from "../../socketManager/socketManager";
    import { onMount, tick } from "svelte";
    import { loggedInUser } from "../../stores/globalStore";
    import { BASE_URL } from "../../stores/globalStore";

    let messageFromServer;
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
                messageFromServer = {
                message: `${message.userName}: ${message.message}`,
                time: `${date}`
                }
                chatMessages = [...chatMessages, messageFromServer];
            });
        }catch(error){
            console.log(error);
        }
    }
    
    onMount(async () => {
    socket.on('chat message to client', (receivedMessage) => {
        const date = formatDate(receivedMessage.timeStamp)
        console.log(receivedMessage);
        const shownMessage = {
            message: `${receivedMessage.userName}: ${receivedMessage.message}`,
            time: `${date}`
        }
        console.log(shownMessage);
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

    function formatDate(date){
        const dateFromString = new Date(date);
        const dateToHoursAndMinutes = dateFromString.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: false})
        return dateToHoursAndMinutes;
    }

</script>

<div class="chat-container">
    <div class="chat-messages" bind:this={chatMessageDiv} >
        {#each chatMessages as { message, time }}
        <div class="chat-message">
            <p class="chat-message-text">{message}</p>
            <p class="chat-message-time">{time}</p>
        </div>
        {/each}
    </div>


    <div class="chat-input">
        <input type="text" bind:value={message} placeholder="Type your message..." />
        <button on:click|preventDefault={handleSendMessage}>Send</button>
    </div>
</div>


<style>

.chat-container {
    margin-top: 5em;
    display: flex;
    flex-direction: column;
    height: 80vh;
    max-width: 800px;
}

.chat-messages {
    flex-grow: 1;
    overflow:auto;
    background-color: rgb(221, 221, 221);
    width: 100%; /* Set the width to 100% */
}

.chat-message {
    display: flex;
    justify-content: space-between; /* Align text and time horizontally */
    align-items: baseline; /* Align items vertically */
    margin-bottom: 8px;
}

.chat-message-time{
    float: right;
    margin-right: 1em;
}

.chat-message-text{
    overflow-wrap: break-word;
    margin-left: 1em;
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