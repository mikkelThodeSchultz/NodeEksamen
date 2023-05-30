<script>
    import { BASE_URL } from "../../stores/globalStore";
    import { createEventDispatcher } from "svelte";
    import { prevent_default } from "svelte/internal";
    import toastr from "toastr";

    const dispatchShowCreate = createEventDispatcher();
    let showModalCreateShow = false;
    let title = "";
    let date = "";
    let location = "";
    let description = "";
    let image;
    let event = "";

    function openModalCreateShow(){
        showModalCreateShow = true;
        dispatchShowCreate("create")
    }

    async function handleCreateShow(){
        if(!title || !date || !location || !description || !image || !event){
            toastr.warning("Please fill out all the fields")
            return;
        }

        await handleUploadImage();

        const newShow = {
            title: title,
            date: date,
            location: location,
            description: description,
            image: image,
            event: event
        }
        try{
            await fetch($BASE_URL + "/api/show", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newShow)
            })
            toastr.success("Show created succesfully")
            dispatchShowCreate("showCreated");
        }catch(error){
            toastr.warning("An unexpected error has occurred. Please try again")
            console.log(error);
            }
        }

    async function handleUploadImage(){

        const formData = new FormData();
        formData.append('image', image[0]);
        try{
            const response = await fetch($BASE_URL + '/api/upload', {
                method: 'POST',
                credentials: 'include',
                body: formData
            })
            if (response.ok) {
                const data = await response.json();
                image = data.imageUrl;
            }
        }catch (error) {
            toastr.error("An unexpected error has occurred. Please try again");
            console.log(error);
        }
    }

</script>

{#if !showModalCreateShow}
    <button on:click={() => openModalCreateShow()}>Add Show</button>
{/if}
{#if showModalCreateShow}
    <form on:submit|preventDefault={handleCreateShow}>
        <labels>Title</labels>
        <input type="text" placeholder="Enter title name" bind:value={title}/>
        <labels>Date</labels>
        <input type="text" placeholder="Enter date" bind:value={date}/>
        <labels>Location</labels>
        <input type="text" placeholder="Enterlocation" bind:value={location}/>
        <labels>Description</labels>
        <textarea rows="6" placeholder="Enter description" bind:value={description}/>
        <labels>Event</labels>
        <input type="text" placeholder="Enter event-link" bind:value={event}/>
        <labels>Image</labels>
        <input type="file" name="image" bind:files={image} />
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