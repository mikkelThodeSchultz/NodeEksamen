<script>
    import { Link } from "svelte-navigator";
    import toastr from "toastr";


    let email;
    let password;

    function handleLogin(){
        
        if(!email || !password){
            toastr.warning("Please fill out both email and password")
        }
    }

</script>


<h3>Login</h3>
<form on:submit|preventDefault={handleLogin}>
    <labels for="email">Email</labels>
    <input type="email" placeholder="Enter Email" bind:value={email}>
    <labels for="password">Password</labels>
    <input type="password" placeholder="Enter Password" bind:value={password}>
    <button type="submit">Login</button>
    <p> <Link to="/ForgotPassword">Forgot password?</Link> </p>
</form>