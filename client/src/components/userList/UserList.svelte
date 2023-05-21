<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/globalStore";
    import { createEventDispatcher } from "svelte";

    const dispatchSelectedUser = createEventDispatcher();
    let allUsers = [];

    const handleGetAllUsers = async () => {
        try {
            const response = await fetch($BASE_URL + '/api/users', {
                method: 'GET',
                credentials: 'include',
            });
            const result = await response.json();
            result.data.forEach(user => {
                let userFromServer = user;
                allUsers = [... allUsers, userFromServer];
            })
        }catch(error){
        console.log(error);
        }
    }

    function handleSelectUser(user){
        dispatchSelectedUser("userSelected", user)
    }

    onMount(async () => {
        await handleGetAllUsers();
    });

</script>

<h1>Users List</h1>
<ul>
    {#each allUsers as user}
        <li>
            <button on:click={() => handleSelectUser(user)}>{user.userName} - {user.email}</button>
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
        word-break: break-word;
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