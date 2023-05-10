<script>
    import { Router, Link, Route } from "svelte-navigator";
    import Login from "./Login.svelte";
    import ForgotPassword from "./ForgotPassword.svelte";
</script>

<Router>
    <Route path="/login" component={Login}></Route>
    <Route path="/ForgotPassword" component={ForgotPassword}></Route>
</Router>
