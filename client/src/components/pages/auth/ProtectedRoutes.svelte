<script>
    import { Router, Link, Route } from "svelte-navigator";
    import Login from "./Login.svelte";
    import ForgotPassword from "./ForgotPassword.svelte";
    import Signup from "./Signup.svelte";
    import NotFound from "../not-found/NotFound.svelte";
    import Signout from "./Signout.svelte";
    import { onMount } from "svelte";
    import Home from "../home/Home.svelte";
    import DybdestegteBookings from "../dybdestegte-bookings/DybdestegteBookings.svelte";
    import DybdestegteRecords from "../dybdestegte-records/DybdestegteRecords.svelte";

    let userRole;
    let isUserLoggedIn;
    let userName;
    let isSessionDataLoaded = false;

    const handleGetSession = async () => {
        try{
        const response = await fetch('http://localhost:8080/api/session', {
            method: 'GET',
            credentials: 'include',
        });
        const result = await response.json();
            userRole = result.userRole;
            isUserLoggedIn = result.isUserLoggedIn;
            userName = result.userName;
            isSessionDataLoaded = true;
            console.log(userRole, isUserLoggedIn, userName);
        }catch(error){
            console.log(error);
        }
    }

    onMount(handleGetSession)


</script>
{#if isSessionDataLoaded}
    <Router>
        <nav>
                <Link to="/">Home</Link>
            {#if isUserLoggedIn}
                <Link to="/signout">Sign out</Link>
            {:else}
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign up</Link>
            {/if}
                <Link to="/dybdestegterecords">Dybdestegte Records</Link>
                <Link to="/dybdestegtebookings">Dybdestegte Bookings</Link>

        </nav>

        <Route path="/" component={Home}></Route>
        {#if isUserLoggedIn}
        <Route path="/signout" primary={false} component={Signout}></Route>
        {:else}
        <Route path="/signup" component={Signup}></Route>
        <Route path="/login" component={Login}></Route>
        {/if}
        <Route path="/forgot-password" component={ForgotPassword}></Route>
        <Route path="/dybdestegterecords" component={DybdestegteRecords}></Route>
        <Route path="/dybdestegtebookings" component={DybdestegteBookings}></Route>
        
        <Route path="*" component={NotFound}></Route>
    </Router>
{:else}
<p>Loading...</p>
{/if}

<style>
    nav {
    position: absolute;
    top: 0;
    left: 0;
    margin-left: 1em;
    margin-top: 1em;
}


</style>