<script>
    import { BASE_URL } from "../../stores/globalStore";
    import { createEventDispatcher } from "svelte";
    import toastr from "toastr";
    export let user;

    const dispatchUserDelete = createEventDispatcher();
    let userID = user._id;

    async function handleDeleteUser() {
        try{
            const response = await fetch($BASE_URL + `/api/user/${userID}`, {
                method: "DELETE",
                credentials: 'include',
            });
            if(response.ok){
            toastr.success(user.userName + " have been deleted")
            dispatchUserDelete("userDeleted");
            }
        } catch(error){
            toastr.warning("An unexpected error has occurred. Please try again")
            console.log(error);
        }
    }
</script>

<button on:click={() => handleDeleteUser()}>Delete User</button>

<style>
    button {
        width: 100%;
        padding: 10px;
        cursor: pointer;
        border: solid #000000;
        border-radius: 0px;
    }
</style>