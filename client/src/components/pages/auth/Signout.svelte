<script>
    import toastr from "toastr";


    function handleLogout(){
        fetch('http://localhost:8080/api/logout', {
            method: 'GET',
            credentials: 'include',        
        })
            toastr.success("You have logged out, farewell my friend");
            setTimeout(function(){
                location.href = "/"
            }, 2000);
    }
    
    
</script>

<button on:click={handleLogout}>Sign out</button>