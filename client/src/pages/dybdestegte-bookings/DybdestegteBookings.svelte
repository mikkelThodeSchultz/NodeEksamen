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
            allShows.reverse();
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
        <div class="show-container">
            <div class="image">
                <img src="{show.show.image}" alt="poster">
            </div>
                <div class="show-description">
                    <h1>{show.show.title}</h1>
                    <h2>{show.show.date}</h2>
                    <h2>{show.show.location}</h2>
                    <p class="description">{show.show.description}</p>
                    <div class="a-tag">
                        <a href="{show.show.event}" target="_blank"> <i class="fa-brands fa-facebook" ></i></a>
                    </div>
                </div>
        </div>
    {/each}
</div>


<style>
    .a-tag{
        position: absolute;
        bottom: 10px;
        left: 50px;
    }

    i{
        text-decoration: none;
        color: rgb(195, 195, 195);
        font-size: 150%;
    }
    i:hover{
        scale: 120%;
        transition: ease-in;
        color: rgb(255, 255, 255);
    }

    .description{
        height: 25vh;
        overflow-y: scroll;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: rgba(0, 0, 0, 0.3);
        padding: 10px
    }

    .show-container{
        display: grid;
        padding: 30px;
        padding-top: 50px;
        grid-template-areas: "image description";
        grid-template-columns: 1fr 2fr;
        grid-gap: 20px;
    }

    .show-description{
        grid-area: description;
        padding: 40px;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: rgba(0, 0, 0, 0.3);
        color: white;
        max-height: 60vh;
        position: relative;
    }

    .image{
        height: 60vh;
        width: 30vw;
    }

    .image img{
        object-fit: contain;
        height: 100%;
    }

    
    .wrapper{
        background-image: url("https://dybdestegte-bucket.s3.eu-north-1.amazonaws.com/backgrounds/cole.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        background-attachment: fixed;
        background-color: rgba(0, 0, 0, 0.2);
        background-blend-mode: multiply;
        padding-bottom: 50px;
        padding-top: 4%;
    }
</style>