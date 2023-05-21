<script>
    import ChatMessageList from "../../components/chatMessageList/ChatMessageList.svelte";
    import CreateMusic from "../../components/musicList/CreateMusic.svelte";
    import DeleteMusic from "../../components/musicList/DeleteMusic.svelte";
    import MusicList from "../../components/musicList/MusicList.svelte";
    import DeleteUser from "../../components/userList/DeleteUser.svelte";
    import UpdateUser from "../../components/userList/UpdateUser.svelte";
    import UserList from "../../components/userList/UserList.svelte";



    // Delete message
    // CRUD Music
    // RUD Users
    // CRUD shows (mangler backend og frontend)
    // måske Delete comments (mangler backend og frontend)
    let showModalUsers = false;
    let showModalMusic = false;
    let showModalChatMessages = false;
    let showModalUpdateUser = false;
    let showModalDeleteUser = false;
    let selectedUser = null;
    let selectedMusic = null;
    let selectedChatMessage = null;
    let isDeleteButton = true;
    let isMusicList = true;

    function openModalUsers() {
        showModalUsers = true;
    }
    function openModalMusic(){
        showModalMusic = true;
    }
    function openModalChatMessage(){
        showModalChatMessages = true;
    }
    function closeModal() {
        showModalUsers = false;
        showModalMusic = false;
        showModalChatMessages = false;
        showModalUpdateUser = false;
        showModalDeleteUser = false;
        selectedChatMessage = null;
        selectedUser = null;
        selectedMusic = null;
        isDeleteButton = true;
        isMusicList = true;
    }
    function handleSelectedUser(event) {
        selectedUser = event.detail;
    }
    function handleSelectedMusic(event) {
        selectedMusic = event.detail;
    }
    function handleSelectedChatMessage(event) {
        selectedChatMessage = event.detail
    }
    function toggleDeleteButton(){
        if (isDeleteButton){
        isDeleteButton = false;
        } else {
            isDeleteButton = true;
        }
    }
    function toggleMusicList(){
        if (isMusicList){
            isMusicList = false;
        } else {
            isMusicList = true;
        }
    }
    

</script>


<h1>Admin Page</h1>
<button on:click={() => openModalUsers()}>Users</button>
<button on:click={() => openModalMusic()}>Music</button>
<button on:click={() => openModalChatMessage()}>Chat Messages</button>

{#if showModalUsers && !selectedUser}
    <div class="modal">
        <div class="modal-content">
            <UserList  on:userSelected={handleSelectedUser} />
            <button class="close-button" on:click={closeModal}>
                Close
            </button>
        </div>
    </div>
{/if}
{#if selectedUser}
    <div class="modal">
        <div class="modal-content">
            {#if isDeleteButton}
                <DeleteUser user={selectedUser} on:userDeleted={closeModal}/>
            {/if}
            <UpdateUser user={selectedUser} on:update={toggleDeleteButton} on:userUpdated={closeModal}/>
            <button class="close-button" on:click={closeModal}>
                Close
            </button>
        </div>
    </div>
{/if}

{#if showModalMusic && !selectedMusic}
    <div class="modal">
        <div class="modal-content"> 
            {#if isMusicList}
                <MusicList  on:musicSelected={handleSelectedMusic} />     
            {/if}
            <CreateMusic on:create={toggleMusicList} on:musicCreated={closeModal} />
            <button class="close-button" on:click={closeModal}>
                Close
            </button>
        </div>
    </div>
{/if}
{#if selectedMusic}
    <div class="modal">
        <div class="modal-content">
                <DeleteMusic music={selectedMusic} on:musicDeleted={closeModal}/>
            <button class="close-button" on:click={closeModal}>
                Close
            </button>   
        </div>
    </div>
{/if}

{#if showModalChatMessages && !selectedChatMessage}
    <div class="modal">
        <div class="modal-content"> 
            <ChatMessageList on:messageSelected={handleSelectedChatMessage} />     
            <button class="close-button" on:click={closeModal}>
                Close
            </button>
        </div>
    </div>
{/if}

<style>
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
    }

    .modal-content {
        width: 300px;
        max-height: 80vh;
        overflow-y: auto; 
    }
</style>