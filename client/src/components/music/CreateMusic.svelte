<script>
    import { BASE_URL } from "../../stores/globalStore";
    import { createEventDispatcher } from "svelte";
    import toastr from "toastr";

    const dispatchMusicCreate = createEventDispatcher();
    let showModalCreateMusic = false;
    let artist = "";
    let albumTitle = "";
    let releaseDate = "";
    let embedLink = "";
    let description = "";


    function openModalCreateMusic(){
        showModalCreateMusic = true;
        dispatchMusicCreate("create")
    }

    async function hanldeCreateMusic(){
        if(!artist || !albumTitle || !releaseDate || !embedLink || !description){
            toastr.warning("Please fill out all the fields")
            return;
        }
        
        const newMusic = {
            artist: artist,
            albumTitle: albumTitle,
            releaseDate: releaseDate,
            embedLink: embedLink,
            description: description
        }
        try {
        await  fetch($BASE_URL + '/api/music', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMusic)
            })
            toastr.success("Album have been created")
            dispatchMusicCreate("musicCreated");
        }catch(error){
            toastr.warning("An unexpected error has occurred. Please try again")
            console.log(error);
            }
    }

</script>

{#if !showModalCreateMusic}
    <button on:click={() => openModalCreateMusic()}>Add Music</button>
{/if}
{#if showModalCreateMusic}
    <form on:submit|preventDefault={hanldeCreateMusic}>
        <labels>Artist</labels>
        <input type="text" placeholder="Enter artist name" bind:value={artist}/>
        <labels>Album Title</labels>
        <input type="text" placeholder="Enter album title" bind:value={albumTitle}/>
        <labels>Release Date</labels>
        <input type="text" placeholder="Enter release date" bind:value={releaseDate}/>
        <labels>Embed Link</labels>
        <input type="text" placeholder="Enter embed link" bind:value={embedLink}/>
        <labels>Description</labels>
        <textarea rows="10" placeholder="Enter description" bind:value={description}/>
        <button type="submit">Submit</button>
    </form>
{/if}

<style>


    form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    padding: 20px;
    border: solid #000000;
    background-color: gold;
    }
    
    input, textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: solid #000000;
    }
    
    button {
    width: 100%;
    padding: 10px;
    cursor: pointer;
    border: solid #000000;
    border-radius: 0px;
    }
</style>