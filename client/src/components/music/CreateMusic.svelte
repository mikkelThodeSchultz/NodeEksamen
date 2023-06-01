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
    
    function inputValidation(embeddedLink){
        const regex = /^<iframe\s.*src="https:\/\/bandcamp\.com\/EmbeddedPlayer\/.*<\/iframe>$/;
        if (regex.test(embeddedLink)) {
            return true;
        }
        return false;
    }

    function openModalCreateMusic(){
        showModalCreateMusic = true;
        dispatchMusicCreate("create")
    }

    const hanldeCreateMusic = async () => {
        if(!artist || !albumTitle || !releaseDate || !embedLink || !description){
            toastr.warning("Please fill out all the fields")
            return;
        }
        if(!inputValidation(embedLink)){
            toastr.warning("Embedded link does not match critearias")
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
        <textarea rows="6" placeholder="Enter description" bind:value={description}/>
        <button type="submit">Submit</button>
    </form>
{/if}

<style>
    
    input, textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: solid #000000;
    }
    
    button {
    width: 100%;
    margin-bottom: 10px;
    }
</style>