<script>
    import { Link, navigate } from "svelte-navigator";
    import toastr from "toastr";
    import { BASE_URL, loggedInUser, userRole } from "../../stores/globalStore";


    let email;
    let password;

    function handleLogin(){
        if(!email || !password){
            toastr.warning("Please fill out both email and password");
            return;
        }
        fetch($BASE_URL + '/auth/login', {
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
                    result.json().then(data => {
                    loggedInUser.set(data.data.userName);
                    userRole.set(data.data.role);
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

</script>

<div id="wrapper">
    <form on:submit|preventDefault={handleLogin}>
        <labels for="email">Email</labels>
        <input type="email" placeholder="Enter Email" bind:value={email}>
        <labels for="password">Password</labels>
        <input type="password" placeholder="Enter Password" bind:value={password}>
        <button type="submit">Login</button>
        <p> <Link to="/forgot-password">Forgot password?</Link> </p>
    </form>
</div>


<style>
    #wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        padding: 0;
        font-family: 'Trirong', serif;
    }
    
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
    }
    
    
    </style>