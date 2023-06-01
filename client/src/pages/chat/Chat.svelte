<script>

    import { getSocket } from "../../socketManager/socketManager";
    import { onMount, tick } from "svelte";
    import { loggedInUser } from "../../stores/globalStore";
    import { BASE_URL } from "../../stores/globalStore";
    import { formatDate } from "../../dateFormater/formatDate";

    let messageFromServer;
    let message = "";
    let messageToServer = null;
    let chatMessages = [];
    let chatMessageDiv;
    let selectedBackgroundImage = "https://dybdestegte-bucket.s3.eu-north-1.amazonaws.com/backgrounds/temple.jpg";
    let backgroundImages = [
        "https://dybdestegte-bucket.s3.eu-north-1.amazonaws.com/backgrounds/church.jpg", 
        "https://dybdestegte-bucket.s3.eu-north-1.amazonaws.com/backgrounds/cole.jpg",
        "https://dybdestegte-bucket.s3.eu-north-1.amazonaws.com/backgrounds/temple.jpg",
        "https://dybdestegte-bucket.s3.eu-north-1.amazonaws.com/civ.jpg"]
    let backgroundImageIndex = 0;
    const socket = getSocket();

    function handleSendMessage() {
        const timeStamp = new Date();
        messageToServer = {userName: $loggedInUser, message: message, timeStamp: timeStamp};
        socket.emit('chat message to server', messageToServer);
        message = "";
        messageToServer = null;
    };

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
    };
    
    onMount(async () => {
    socket.on('chat message to client', (receivedMessage) => {
        const date = formatDate(receivedMessage.timeStamp)
        const shownMessage = {
            message: `${receivedMessage.userName}: ${receivedMessage.message}`,
            time: `${date}`
            }
        chatMessages = [...chatMessages, shownMessage];
        scrollToBottom();
        });
        await handleGetMessages();
        scrollToBottom();
        changeBackgroundImage();
    });


    async function scrollToBottom() {
        await tick();
        if (chatMessageDiv) {
            chatMessageDiv.scrollTop = chatMessageDiv.scrollHeight;
        }
    };

    function changeBackgroundImage() {
        setInterval(() => {
        selectedBackgroundImage = backgroundImages[backgroundImageIndex];
        backgroundImageIndex ++;
            if(backgroundImageIndex>3){
                backgroundImageIndex = 0;
                }
        },5000)
    };

</script>

<div id=wrapper style="background-image: url({selectedBackgroundImage})">
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
            <button on:click|preventDefault={handleSendMessage} >Send</button>
        </div>
    </div>
</div>

<style>

#wrapper{
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100vh;
    background-attachment: fixed;
    background-color: rgba(0, 0, 0, 0.2);
    background-blend-mode: multiply;
}

.chat-container {
    margin: auto;
    padding-top: 8em;
    display: flex;
    flex-direction: column;
    height: 90vh;
    max-width: 900px;
    
}

.chat-messages {
    flex-grow: 1;
    overflow:auto;
    background-color: rgb(0, 0, 0,0.4);
    border: 1px solid #ccc;
    width: 100%;
}

.chat-message {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 8px;
    
}

.chat-message-time{
    float: right;
    margin-right: 1em;
}

.chat-message-text{
    word-break: break-word;
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
    background-color:rgba(0, 0, 0, 0.4);
    color: white;
    border: 1px solid #ccc;

}
button {
    padding: 5px 20px;
    }

p{
    color: white;
}


</style>