<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/globalStore";
    import { createEventDispatcher } from "svelte";
    import toastr from "toastr";

    const dispatchDeleteMessage = createEventDispatcher();
    let allMessages = [];
    let chatMessageID;

    const handleGetAllMessages = async () => {
        try {
            const response = await fetch($BASE_URL + '/api/chatMessages', {
                method: 'GET',
                credentials: 'include',
            });
            const result = await response.json();
            result.data.forEach(message => {
                let messageFromServer = message;
                allMessages = [... allMessages, messageFromServer];
            })
        }catch(error){
        console.log(error);
        }
    }

    async function handleDeleteMessage(message){
        console.log(message);
        chatMessageID = message._id
        try{
            const response = await fetch ($BASE_URL + `/api/chatMessage/${chatMessageID}`, {
                method: "DELETE",
                credentials: "include"
            });
            if(response.ok){
                toastr.success("Chat message have been deleted")
                dispatchDeleteMessage("messageDeleted");
                allMessages = []
                await handleGetAllMessages();
            }
        } catch(error){
            toastr.warning("An unexpected error has occurred. Please try again")
            console.log(error);
        }
    }

    onMount(async () => {
        await handleGetAllMessages();
    });
</script>

<h1>Chat Message List</h1>
<ul>
    {#each allMessages as message}
        <li class="message-item">
            <div id="message">
                <p>{message.userName} - {message.message}</p>
            </div>
            <div id="delete-message">
                <button on:click={() => handleDeleteMessage(message)} >Delete</button>
            </div>
        </li>
    {/each}
</ul>

<style>
    h1 {
        text-align: center;
        font-size: 24px;
        margin-bottom: 20px;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        margin-bottom: 10px;
        word-break: break-word;
        display: flex;
        justify-content: space-between;
    }

    .message-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    p{
        padding: 10px;
        border: solid #000000;
        border-radius: 0px;
    }
    #delete-message{
        word-break: keep-all;
    }

    button {
    padding: 10px;
    cursor: pointer;
    border: solid #000000;
    border-radius: 0px;
    }
    
    button:hover {
    background-color: #babab9;
    }

</style>