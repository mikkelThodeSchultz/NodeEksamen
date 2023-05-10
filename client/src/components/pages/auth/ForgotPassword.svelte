<script>
    let email;
    let forgotPasswordCode;
    let newPassword;

</script>


<h3>Forgot Password</h3>
<h4>Please enter your email, and we will send you a code. Then type in the code and a new password.</h4>
<form>
    <labels for="email">Email</labels>
    <input type="email" placeholder="Enter Email" bind:value={email}>
    <labels for="code">Code</labels>
    <input type="text" placeholder="Enter Code" bind:value={forgotPasswordCode}>
    <labels for="newPassword">New Password</labels>
    <input type="password" placeholder="Enter new password" bind:value={newPassword}>
    <button type="submit">Reset Password</button>

</form>