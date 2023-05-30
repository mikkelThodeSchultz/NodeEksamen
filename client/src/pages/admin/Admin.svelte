<script>
    import DeleteChatMessage from "../../components/chatMessage/DeleteChatMessage.svelte";
    import CreateMusic from "../../components/music/CreateMusic.svelte";
    import DeleteMusic from "../../components/music/DeleteMusic.svelte";
    import CreateShow from "../../components/show/CreateShow.svelte";
    import MusicList from "../../components/music/MusicList.svelte";
    import DeleteShow from "../../components/show/DeleteShow.svelte";
    import ShowList from "../../components/show/ShowList.svelte";
    import DeleteUser from "../../components/user/DeleteUser.svelte";
    import UpdateUser from "../../components/user/UpdateUser.svelte";
    import UserList from "../../components/user/UserList.svelte";
    import DeleteComment from "../../components/comment/DeleteComment.svelte";
    import toastr from "toastr";
    import { BASE_URL } from "../../stores/globalStore";


    // Delete message
    // CRUD Music
    // RUD Users
    // CRUD shows (mangler backend og frontend)
    // måske Delete comments (mangler backend og frontend)

    let showModalUsers = false;
    let showModalMusic = false;
    let showModalShow = false;
    let showModalChatMessages = false;
    let showModalUpdateUser = false;
    let showModalDeleteUser = false;
    let showModalComments = false;
    let selectedUser = null;
    let selectedMusic = null;
    let selectedChatMessage = null;
    let selectedShow = null;
    let isDeleteButton = true;
    let isMusicList = true;
    let isShowList = true;
    let imageFile;

    function openModalUsers() {
        showModalUsers = true;
    }
    function openModalMusic(){
        showModalMusic = true;
    }
    function openModalChatMessage(){
        showModalChatMessages = true;
    }
    function openModalShow(){
        showModalShow = true;
    }
    function openModalComment(){
        showModalComments = true;
    }
    function closeModal() {
        showModalUsers = false;
        showModalMusic = false;
        showModalChatMessages = false;
        showModalShow = false;
        showModalComments = false;
        showModalUpdateUser = false;
        showModalDeleteUser = false;
        selectedChatMessage = null;
        selectedShow = null;
        selectedUser = null;
        selectedMusic = null;
        isDeleteButton = true;
        isMusicList = true;
        isShowList = true;
    }
    function handleSelectedUser(event) {
        selectedUser = event.detail;
    }
    function handleSelectedMusic(event) {
        selectedMusic = event.detail;
    }
    function handleSelectedShow(event) {
        selectedShow = event.detail;
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
    function toggleShowList(){
        if (isShowList){
            isShowList = false;
        } else {
            isShowList = true;
        }
    }

    async function handleUploadImage(){
    if (!imageFile) {
        toastr.warning("Please select an image");
        return;
    }

    const formData = new FormData();
    formData.append('image', imageFile[0]);

    fetch($BASE_URL + '/api/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            toastr.success("Image uploaded successfully");
        } else {
            toastr.error("Failed to upload image");
        }
    })
    .catch(error => {
        toastr.error("An unexpected error has occurred. Please try again");
        console.log(error);
    });
}

</script>   

<div id="wrapper">
    <h1>Admin Page</h1>
    <button on:click={() => openModalUsers()}>Users</button>
    <button on:click={() => openModalMusic()}>Music</button>
    <button on:click={() => openModalShow()}>Shows</button>
    <button on:click={() => openModalChatMessage()}>Chat Messages</button>
    <button on:click={() => openModalComment()}>Comments</button>

</div>
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
                <hr>
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

{#if showModalShow && !selectedShow}
    <div class="modal">
        <div class="modal-content"> 
            {#if isShowList}
                <ShowList  on:showSelected={handleSelectedShow} />   
                <hr> 
            {/if}
            <CreateShow on:create={toggleShowList} on:showCreated={closeModal} />
            <button class="close-button" on:click={closeModal}>
                Close
            </button>
        </div>
    </div>
{/if}
{#if selectedShow}
    <div class="modal">
        <div class="modal-content">
            <DeleteShow show={selectedShow} on:showDeleted={closeModal}/>            
            <button class="close-button" on:click={closeModal}>
                Close
            </button>   
        </div>
    </div>
{/if}

{#if showModalChatMessages}
    <div class="modal">
        <div class="modal-content"> 
            <DeleteChatMessage/>     
            <button class="close-button" on:click={closeModal}>
                Close
            </button>
        </div>
    </div>
{/if}

{#if showModalComments}
    <div class="modal">
        <div class="modal-content"> 
            <DeleteComment/>  
            <button class="close-button" on:click={closeModal}>
                Close
            </button>
        </div>
    </div>
{/if}

<style>
    #wrapper{
        margin: auto;
        padding-top: 5em;
        display: flex;
        flex-direction: column;
        max-width: 400px;
    }

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
        padding: 20px;
        width: 300px;
        max-height: 80vh;
        overflow-y: auto; 
        border: solid #000000;
        background-color: gold;
    }

    h1{
        margin-top: 5vh;
    }

    button{
        width: 100%;
    }
    hr{
        margin-bottom: 8px;
    }


</style>