<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/globalStore";
    import { createEventDispatcher } from "svelte";

    const dispatchSelectedShow = createEventDispatcher();
    let allShows = [];

    const handleGetShows = async () => {
        try{
            const response = await fetch ($BASE_URL + '/api/shows', {
                method: 'GET',
                credentials: 'include',
            });
            const result = await response.json();
            allShows = allShows.concat(result.data);
        }catch(error){
            console.log(error);
        }
    }

    function handleSelectShow(show){
        dispatchSelectedShow("showSelected", show)
    }

    onMount(async ()  => {
        await handleGetShows();
    })

</script>

<h1>Shows List</h1>
<ul>
    {#each allShows as show}
        <li>
            <button on:click={() => handleSelectShow(show.show)}>{show.show.title}</button>
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