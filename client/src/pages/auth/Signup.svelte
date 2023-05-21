<script>
    import { Link, navigate } from "svelte-navigator";
    import toastr from "toastr";
    import { BASE_URL, loggedInUser, userRole } from "../../stores/globalStore";
    import { createEventDispatcher } from "svelte";

    let userName;
    let email;
    let password;
    const dispatchSignup = createEventDispatcher();
    const dispatchAlreadyHaveAccount = createEventDispatcher();

    function handleSignUp() {
        if(!userName || !email || !password){
            toastr.warning("Please fill out both username, email and password");
            return;
        }
        fetch($BASE_URL + '/auth/signup',{
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
                    result.json().then(data => {
                    loggedInUser.set(data.data.userName);
                    userRole.set(data.data.role);
                    dispatchSignup("signup");
                })
                    navigate("/");
                }, 2000);
            }
        })
        .catch(error => {
            toastr.warning("An unexpected error has occurred. Please try again")
            console.error(error);
        })
    }

    function handleAlreadyHaveAnAccount() {
        dispatchAlreadyHaveAccount("alreadyHaveAccount")
    }

</script>
<div id="wrapper">
    <form on:submit|preventDefault={handleSignUp}>
        <labels for="username">Username</labels>
        <input type="text" placeholder="Enter Username" bind:value={userName}>
        <labels for="email">Email</labels>
        <input type="email" placeholder="Enter Email" bind:value={email}>
        <labels for="password">Password</labels>
        <input type="password" placeholder="Enter Password" bind:value={password}>
        <button type="submit">Sign up</button>
        <p on:click={handleAlreadyHaveAnAccount} on:keydown={handleAlreadyHaveAnAccount}> Already have an account?</p>
    </form>
</div>

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



input {
width: 100%;
padding: 10px;
margin-bottom: 10px;
border: solid #000000;

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

p {
margin-top: 10px;
text-align: center;
cursor: pointer;
color: blue;
}


</style>