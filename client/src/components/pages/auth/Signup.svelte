<script>
    import { Link } from "svelte-navigator";
    import toastr from "toastr";

    let userName;
    let email;
    let password;

    function handleSignUp() {
        if(!userName || !email || !password){
            toastr.warning("Please fill out both username, email and password");
            return;
        }
        fetch('http://localhost:8080/auth/signup',{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userName: userName, email: email, password: password})
        })
        .then(result => {
            if(result.status===400){
                toastr.warning("Username og email has already been taken")
            }
            if(result.status===200){
                toastr.success("Account created succesfully, Welcome!")
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

<h3>Sign up</h3>
<form on:submit|preventDefault={handleSignUp}>
    <labels for="username">Username</labels>
    <input type="text" placeholder="Enter Username" bind:value={userName}>
    <labels for="email">Email</labels>
    <input type="email" placeholder="Enter Email" bind:value={email}>
    <labels for="password">Password</labels>
    <input type="password" placeholder="Enter Password" bind:value={password}>
    <button type="submit">Sign up</button>
    <p> <Link to="/login">Already have an account? </Link></p>
</form>

