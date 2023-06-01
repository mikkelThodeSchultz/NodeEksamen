<script>
    import { BASE_URL } from "../../stores/globalStore";
    import { createEventDispatcher } from "svelte";
    import toastr from "toastr";
    export let show;
    const dispatchShowDelete = createEventDispatcher();
    let showID = show._id;

    const handleDeleteShow = async ()  => {
        try{
            const response = await fetch($BASE_URL + `/api/show/${showID}`,{
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json'
                },
            });
            if(response.ok){
                toastr.success(show.title + " have been deleted")
                dispatchShowDelete("showDeleted")
            }
        }catch(error){
            toastr.warning("An unexpected error has occurred. Please try again")
            console.log(error);
        }
    }
</script>

<button on:click={() => handleDeleteShow()}>Delete Show</button>

<style>
    button {
        width: 100%;
        padding: 10px;
        cursor: pointer;
        border: solid #000000;
        border-radius: 0px;
    }
</style>