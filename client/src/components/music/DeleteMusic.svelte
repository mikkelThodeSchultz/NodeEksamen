<script>
    import { BASE_URL } from "../../stores/globalStore";
    import { createEventDispatcher } from "svelte";
    import toastr from "toastr";
    export let music;
    const dispatchMusicDelete = createEventDispatcher();
    let musicID = music._id;


    async function handleDeleteMusic() {
        try{
            const response = await fetch($BASE_URL + `/api/music/${musicID}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                'Content-Type': 'application/json'
                },
            });
            if(response.ok){
                toastr.success(music.albumTitle + " have been deleted")
                dispatchMusicDelete("musicDeleted")
            }
        } catch(error){
            toastr.warning("An unexpected error has occurred. Please try again")
            console.log(error);
        }
    }

</script>


<button on:click={() => handleDeleteMusic()}>Delete Music</button>

<style>
    button {
        width: 100%;
        padding: 10px;
        cursor: pointer;
        border: solid #000000;
        border-radius: 0px;
    }
</style>