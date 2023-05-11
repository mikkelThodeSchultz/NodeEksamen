<script>
    import { Link } from "svelte-navigator";
    import toastr from "toastr";


    let email;
    let password;

    function handleLogin(){
        if(!email || !password){
            toastr.warning("Please fill out both email and password");
            return;
        }
        fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password})
        })
        .then(result => {
            if(result.status===400){
                toastr.warning("Wrong email or password")
            }
            if(result.status===200){
                toastr.success("Welcome my friend!")
                setTimeout(function() {
                location.href = "/"
            }, 2000);
            }
        })
        .catch(error => {
            toastr.warning("An unexpected error has occurred. Please try again")
            console.error(error);
        })
    }

</script>


<h3>Login</h3>
<form on:submit|preventDefault={handleLogin}>
    <labels for="email">Email</labels>
    <input type="email" placeholder="Enter Email" bind:value={email}>
    <labels for="password">Password</labels>
    <input type="password" placeholder="Enter Password" bind:value={password}>
    <button type="submit">Login</button>
    <p> <Link to="/forgot-password">Forgot password?</Link> </p>
</form>