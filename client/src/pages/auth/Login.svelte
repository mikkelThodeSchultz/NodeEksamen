<script>
    import { Link, navigate } from "svelte-navigator";
    import toastr from "toastr";
    import { BASE_URL, loggedInUser, userRole } from "../../stores/globalStore";
    import { createEventDispatcher } from "svelte";

    let email;
    let password;
    const dispatchLogin = createEventDispatcher();
    const dispatchForgotPassword = createEventDispatcher();

    const handleLogin = async () => {
        if (!email || !password) {
            toastr.warning("Please fill out both email and password");
            return;
        }
        try {
            const response = await fetch($BASE_URL + '/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            if (response.status === 400) {
                toastr.warning("Wrong email or password");
                }
            if (response.status === 200) {
                toastr.success("Welcome my friend!");
                setTimeout(async () => {
                    const data = await response.json();
                    loggedInUser.set(data.data.userName);
                    userRole.set(data.data.role);
                    dispatchLogin("login");
                    navigate("/");
                }, 2000);
            }
        } catch (error) {
            toastr.warning("An unexpected error has occurred. Please try again");
            console.error(error);
    }
};

    function handleForgotPassword () {
        dispatchForgotPassword("openForgotPassword");
    }


</script>

<div id="wrapper">
    <form on:submit|preventDefault={handleLogin}>
        <labels for="email">Email</labels>
        <input type="email" placeholder="Enter Email" bind:value={email}>
        <labels for="password">Password</labels>
        <input type="password" placeholder="Enter Password" bind:value={password}>
        <button type="submit">Login</button>
        <p on:click={handleForgotPassword} on:keydown={handleForgotPassword}>Forgot password?</p>
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