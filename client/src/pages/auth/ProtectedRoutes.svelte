<script>
    import { Router, Link, Route } from "svelte-navigator";
    import Login from "./Login.svelte";
    import ForgotPassword from "./ForgotPassword.svelte";
    import Signup from "./Signup.svelte";
    import NotFound from "../not-found/NotFound.svelte";
    import Signout from "./Signout.svelte";
    import AdminSendPopup from "../../components/adminSendPopup/AdminSendPopup.svelte";
    import { onMount } from "svelte";
    import Home from "../home/Home.svelte";
    import DybdestegteBookings from "../dybdestegte-bookings/DybdestegteBookings.svelte";
    import DybdestegteRecords from "../dybdestegte-records/DybdestegteRecords.svelte";
    import { BASE_URL, loggedInUser, userRole } from "../../stores/globalStore";
    import { initializeSocket } from "../../socketManager/socketManager.js";
    import Wrapper from "../../components/wrapper/Wrapper.svelte";
    import Chat from "../chat/Chat.svelte";


    let userRoleFromSession;
    let isUserLoggedIn;
    let userName;
    let isSessionDataLoaded = false;

    const handleGetSession = async () => {
        try{
        const response = await fetch($BASE_URL + '/api/session', {
            method: 'GET',
            credentials: 'include',
        });
        const result = await response.json();
            userRoleFromSession = result.userRole;
            isUserLoggedIn = result.isUserLoggedIn;
            userName = result.userName;
            isSessionDataLoaded = true;
            loggedInUser.set(userName);
            userRole.set(userRoleFromSession);
        }catch(error){
            console.log(error);
        }
    }
    onMount(handleGetSession)
    onMount(initializeSocket);

    

</script>

{#if isSessionDataLoaded}
    <Router>
        <nav>
                <Link to="/">Home</Link>
            {#if $loggedInUser}
                <Link to="/signout">Sign out</Link>
                <Link to="/chat">Group chat</Link>
            {:else}
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign up</Link>
            {/if}
                <Link to="/dybdestegterecords">Dybdestegte Records</Link>
                <Link to="/dybdestegtebookings">Dybdestegte Bookings</Link>
            {#if $userRole === "Admin"}
                <Link to = "/adminmessage">Admin send message</Link>
            {/if}

        </nav>
        
        <Route path="/"><Home/></Route>
        {#if  $loggedInUser}
        <Route path="/signout" primary={false} ><Signout/></Route>
        <Route path="/chat" primary={false}><Chat/></Route>
        {:else}
        <Route path="/signup" ><Signup/></Route>
        <Route path="/login" ><Login/></Route>
        {/if}
        <Route path="/forgot-password"><ForgotPassword/></Route>
        <Route path="/dybdestegterecords" ><DybdestegteRecords/></Route>
        <Route path="/dybdestegtebookings" ><DybdestegteBookings/></Route>
        {#if $userRole === "Admin"}
        <Route path = "/adminmessage" ><AdminSendPopup/></Route>
        {/if}
        <Route path="*"><NotFound/></Route>
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