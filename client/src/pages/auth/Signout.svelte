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


<a href="/" on:click={handleLogout} tabindex="0">Sign out</a>
