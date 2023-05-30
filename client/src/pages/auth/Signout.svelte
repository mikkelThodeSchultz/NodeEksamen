<script>
    import toastr from "toastr";
    import { BASE_URL, loggedInUser, userRole } from "../../stores/globalStore";
    import { navigate } from "svelte-navigator";


    function handleLogout(){
        fetch($BASE_URL + '/api/logout', {
            method: 'GET',
            credentials: 'include',        
        })
            toastr.success("You have logged out, farewell my friend");
            setTimeout(function(){
                loggedInUser.set();
                userRole.set();
                navigate("/");
            }, 2000);
    }


</script>

    <img src="https://dybdestegte-bucket.s3.eu-north-1.amazonaws.com/signout.png" alt="Logout" on:click={handleLogout} on:keydown={handleLogout} class="navbar-link">

<style>
    img:hover{
        cursor: pointer;
    }

    
</style>
