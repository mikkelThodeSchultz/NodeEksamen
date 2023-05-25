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
    let songs = [];

    function openModalCreateMusic(){
        showModalCreateMusic = true;
        dispatchMusicCreate("create")
    }

    async function hanldeCreateMusic(){
        if(!artist || !albumTitle || !releaseDate || !embedLink || !songs){
            toastr.warning("Please fill out all the fields")
            return;
        }
        const newMusic = {
            artist: artist,
            albumTitle: albumTitle,
            releaseDate: releaseDate,
            embedLink: embedLink,
            songs: songs
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

    function addSong() {
        let newSong = {title: "", length: ""}
        songs = [...songs, newSong];
    }

    function removeSong(index) {
    const updatedSongs = [];
        for (let i = 0; i < songs.length; i++) {
            if (i !== index) {
                updatedSongs.push(songs[i]);
            }
        }
        songs = updatedSongs;
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

        <div class="song-container">
            <p>Songs</p>
            {#each songs as song, i}
                <div class="song">
                    <labels>Title</labels>
                    <input type="text" placeholder="Enter song title" bind:value={song.title}/>

                    <labels>Length</labels>
                    <input type="text" placeholder="Enter song lenght" bind:value={song.length}/>

                    <button type="button" on:click={() => removeSong(i)}>Remove</button>
                </div>
            {/each}
        </div>

        <button type="button" on:click={addSong}>Add Song</button>
        <button type="submit">Submit</button>
    </form>
{/if}

<style>
    .song-container {
        max-height: 200px;
        overflow-y: auto; 
    }

    form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    padding: 20px;
    border: solid #000000;
    background-color: gold;
    }
    
    input {
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