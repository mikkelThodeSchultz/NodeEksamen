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
    import Chat from "../chat/Chat.svelte";
    import MusicList from "../../components/musicList/MusicList.svelte";
    import ChatMessageList from "../../components/chatMessageList/ChatMessageList.svelte";
    import UserList from "../../components/userList/UserList.svelte";
    import Admin from "../admin/Admin.svelte";


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

    let showModalLogin = false;
    let showModalSignup = false;
    let showModalForgotPassword = false;

    function openModalLogin() {
        showModalLogin = true;
        showModalSignup = false;
        showModalForgotPassword = false;
    }
    function closeModalLogin() {
        showModalLogin = false;
    }
    function openModalSignup() {
        showModalSignup = true;
        showModalLogin = false;
        showModalForgotPassword = false;
    }
    function closeModalSignup() {
        showModalSignup = false;
    }
    function openModalForgotPassword() {
        showModalForgotPassword = true;
        showModalSignup = false;
        showModalLogin = false;
    }
    function closeModalForgotPassword() {
        showModalLogin = true;
        showModalForgotPassword = false;
    }
</script>

{#if isSessionDataLoaded}
    <Router>
        <nav>
                <Link to="/">
                    <img src="" alt="Home">
                </Link>
            {#if $loggedInUser}
                <Signout/>
                <Link to="/admin">Admin</Link>
                <Link to="/chat">Group chat</Link>
            {:else}
                <img src="" alt="Login" on:click={openModalLogin} on:keydown={openModalLogin}>
                <img src="" alt="Signup" on:click={openModalSignup} on:keydown={openModalSignup}>
                
            {/if}
            {#if $userRole === "Admin"}
                <Link to = "/adminmessage">Admin send message</Link>
            {/if}

            {#if showModalLogin}
                <div class="modal">
                    <div class="modal-content">
                        <Login  on:login={closeModalLogin} on:openForgotPassword={openModalForgotPassword} />
                        <button class="close-button" on:click={closeModalLogin}>
                            Close
                        </button>
                    </div>
                </div>
            {/if}
            {#if showModalSignup}
                <div class="modal">
                    <div class="modal-content">
                        <Signup  on:signup={closeModalSignup} on:alreadyHaveAccount={openModalLogin} />
                        <button class="close-button" on:click={closeModalSignup}>
                            Close
                        </button>
                    </div>
                </div>
            {/if}
            {#if showModalForgotPassword}
                <div class="modal">
                    <div class="modal-content">
                        <ForgotPassword  on:changePassword={closeModalForgotPassword} />
                        <button class="close-button" on:click={closeModalForgotPassword}>
                            Close
                        </button>
                    </div>
                </div>
            {/if}
        
        </nav>

        <!--DEN HER SKAL KUN VÆRE FOR ADMINS-->
        <Route path ="/admin"><Admin/></Route>


        <Route path="/"><Home/></Route>
        {#if  $loggedInUser}
        <Route path="/chat" primary={false}><Chat/></Route>
        {/if}
        <Route path="/dybdestegterecords" ><DybdestegteRecords/></Route>
        <Route path="/dybdestegtebookings" ><DybdestegteBookings/></Route>
        {#if $userRole === "Admin"}
        <Route path = "/adminallmusic"><MusicList/></Route>
        <Route path = "/adminallmessage"><ChatMessageList/></Route>
        <Route path = "/adminallusers"><UserList/></Route>
        <Route path = "/adminmessage" ><AdminSendPopup/></Route>
        {/if}
        <Route path="*"><NotFound/></Route>
    </Router>
{:else}



<p>Loading...</p>
{/if}

    

<style>
        nav {
        position: fixed;
        top: 0;
        left: 0;
        margin-left: 1em;
        margin-top: 1em;
        z-index: 1;
    }

    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
    }

    img:hover{
        cursor: pointer;
    }
    button{
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

</style>