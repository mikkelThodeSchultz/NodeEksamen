<script>
    import { Link } from "svelte-navigator";


    let email;
    let password;
</script>


<h3>Login</h3>
<form>
    <labels for="email">Email</labels>
    <input type="email" placeholder="Enter Email" bind:value={email}>
    <labels for="password">Password</labels>
    <input type="password" placeholder="Enter Password" bind:value={password}>
    <button type="submit">Login</button>
    <p> <Link to="/ForgotPassword">Forgot password?</Link> </p>
</form>