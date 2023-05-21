<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/globalStore";
    import { createEventDispatcher } from "svelte";

    const dispatchSelectedMusic = createEventDispatcher();
    let allMusic = [];

    const handleGetAllMusic = async () => {
        try {
            const response = await fetch($BASE_URL + '/api/allMusic', {
                method: 'GET',
                credentials: 'include',
            });
            const result = await response.json();
            result.data.forEach(music => {
                let musicFromServer = music.music;
                allMusic = [... allMusic, musicFromServer];
            })
        }catch(error){
        console.log(error);
        }
    }

    function handleSelectMusic(music){
        dispatchSelectedMusic("musicSelected", music)
    }

    onMount(async () => {
        await handleGetAllMusic();
    });

</script>

<h1>Music List</h1>
<ul>
    {#each allMusic as music}
        <li>
            <button on:click={() => handleSelectMusic(music)}>{music.artist} - {music.albumTitle}</button>
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
    }

    button {
    width: 100%;
    padding: 10px;
    cursor: pointer;
    border: solid #000000;
    border-radius: 0px;
    }
    
    button:hover {
    background-color: #babab9;
    }

</style>