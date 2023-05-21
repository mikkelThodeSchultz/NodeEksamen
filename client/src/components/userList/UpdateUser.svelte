<script>
    import { BASE_URL } from "../../stores/globalStore";
    import { createEventDispatcher } from "svelte";
    import toastr from "toastr";

    export let user;
    const dispatchUserUpdate = createEventDispatcher();
    let userID = user._id;
    let showModalUpdateUser = false;
    let updatedUser
    let username;
    let email;
    let role;

    function openModalUpdateUser() {
        dispatchUserUpdate("update");
        showModalUpdateUser = true;
    }
    async function handleUpdateUser(){
        if (!username || !email){
            toastr.warning("Please fill out both username and email")
            return;
        }
        updatedUser = {
            userName: username,
            email: email,
            role: role
        }
        try{
            await fetch($BASE_URL + `/api/user/${userID}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUser)
            })
            toastr.success("User have been updated")
            dispatchUserUpdate("userUpdated");
        }catch(error){
            toastr.warning("An unexpected error has occurred. Please try again")
            console.log(error);
        }
    }
</script>


{#if !showModalUpdateUser}
    <button on:click={() => openModalUpdateUser()}>Update User</button>
{/if}
{#if showModalUpdateUser}
    <form on:submit|preventDefault={handleUpdateUser}>
        <labels>Username</labels>
        <input type="text" placeholder="Enter new Username" bind:value={username}>
        <labels for="email">Email</labels>
        <input type="email" placeholder="Enter new Email" bind:value={email}>
        <label for="role">Role</label>
            <select id="role" bind:value={role}>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
            </select>
        <button type="submit">Update User</button>
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
    
    input, select {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: solid #000000;
    }

    select {
    cursor: pointer;
    }
    
    button {
    width: 100%;
    padding: 10px;
    cursor: pointer;
    border: solid #000000;
    border-radius: 0px;
    }
    
</style>