<script>
    import { navigate } from "svelte-navigator";
    import toastr from "toastr";
    import { BASE_URL } from "../../stores/globalStore";
    import { createEventDispatcher } from "svelte";

    let email;
    let forgotPasswordCode;
    let newPassword;
    const dispatchChangePassword = createEventDispatcher();

    const handleGetCode = async () => {
        if (!email) {
            toastr.warning("Please enter your email");
            return;
        }
        try {
            const response = await fetch($BASE_URL + '/api/forgot-password', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            });
            if (response.status === 400) {
                toastr.warning("Wrong email");
                }
            if (response.status === 200) {
                toastr.success("We have sent a code to your email");
                }
        } catch (error) {
            toastr.warning("An unexpected error has occurred. Please try again");
            console.log(error);
        }
    };

    const handleNewPassword = async () => {
    if (!forgotPasswordCode || !newPassword) {
        toastr.warning("Please enter both your code and a new password");
        return;
    }
    try {
        const response = await fetch($BASE_URL + '/auth/password', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ forgotPasswordCode, newPassword })
            });
        if (response.status === 400) {
            toastr.warning("Wrong code");
            }
        if (response.status === 401) {
            toastr.warning("Code has expired");
            }
        if (response.status === 200) {
            toastr.success("Your password has been changed successfully");
            setTimeout(() => {
                dispatchChangePassword("changePassword");
            }, 2000);
        }
    } catch (error) {
        toastr.warning("An unexpected error has occurred. Please try again");
        console.log(error);
    }
    };

</script>

<div id="wrapper">
    
    <form on:submit|preventDefault={handleGetCode}>
        <h4>Please enter your email, and we will send you a code.</h4>
        <labels for="email">Email</labels>
        <input type="email" placeholder="Enter Email" bind:value={email}>
        <button type="submit">Get code</button>
    </form>

    <form on:submit|preventDefault={handleNewPassword}>
        <h4>Please enter the code and a new password.</h4>
        <labels for="code">Code</labels>
        <input type="text" placeholder="Enter Code" bind:value={forgotPasswordCode}>
        <labels for="newPassword">New Password</labels>
        <input type="password" placeholder="Enter new password" bind:value={newPassword}>
        <button type="submit">Change password</button>
    </form>
</div>

<style>
    #wrapper {
        justify-content: center;
        align-items: center;
        margin: 0;
        padding: 0;
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

</style>