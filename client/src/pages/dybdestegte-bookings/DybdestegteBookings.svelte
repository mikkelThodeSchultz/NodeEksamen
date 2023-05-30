<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/globalStore";

    let allShows = [];

    const handleGetAllShows = async () => {
        try {
            const response = await fetch($BASE_URL + '/api/shows', {
                method: 'GET',
                credentials: 'include',
            });
            const result = await response.json()
            allShows = allShows.concat(result.data);
        }catch(error){
            console.log(error);
        }
    };

    onMount(async () => {
        await handleGetAllShows();
    })
</script>
<div class="wrapper">
    {#each allShows as show}
        <div class="show-container" style="background-image: url({show.show.image});">
            <h1>{show.show.title}</h1>
            <h2>{show.show.date}</h2>
            <h2>{show.show.location}</h2>
            <h2>{show.show.description}</h2>
        </div>
    {/each}
</div>


<style>

    .show-container{
        padding: 30px;
        padding-top: 50px;
        margin-left: 100px;
        margin-right: 100px;
    }
    
    .wrapper{
        background-image: url("https://dybdestegte-bucket.s3.eu-north-1.amazonaws.com/backgrounds/cole.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        background-attachment: fixed;
        background-color: rgba(0, 0, 0, 0.2);
        background-blend-mode: multiply;
    }
</style>