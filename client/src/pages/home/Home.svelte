<script>
    import { navigate } from "svelte-navigator";

    function handleNavigate(event) {
        const hasLeftClass = event.currentTarget.classList.contains("left");
        if(hasLeftClass){
            navigate("/dybdestegterecords")
            }
        else {
            navigate("/dybdestegtebookings")
        }
    }
    function handleKeyDown(){
    }

</script>

<div id="wrapper">
    <div class="container">
        <div class="split left" on:click={handleNavigate} on:keydown={handleKeyDown}> 
            <h1>Dybdestegte Records</h1>
        </div>
        <div class="split right" on:click={handleNavigate} on:keydown={handleKeyDown}>
            <h1>Dybdestegte Bookings</h1>
        </div>
    </div>
</div>

<style>

    .split.left:hover h1,
    .split.right:hover h1 {
        color: rgba(255, 255, 255);
        -webkit-text-stroke: black 1.2px;
    }

    .left{
        background-image: url("../../images/backgrounds/church.jpg");
        
    }
    .right{
        background-image: url("../../images/backgrounds/cole.jpg");
    
    }
    #wrapper {
        display: flex;
        width: 100%;
        height: 100vh;
    }

    .container {
        display: flex;
        flex: 1;
    }

    .split {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        position: relative;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        transition: flex-grow 1.5s ease;
    }

    .right:hover{
        flex-grow: 2;
    }

    .left:hover{
        flex-grow: 2;
    }

    .split:hover{
        cursor: pointer;
    }

    h1 {
    font-size: 2.5rem;
    color: rgba(255, 255, 255, 0.3);
    position: absolute;
    left: 50%;
    top: 35%;
    transform: translateX(-50%);
    white-space: nowrap;
    -webkit-text-stroke: black 0.8px;
    font-family: 'Trirong', serif;
    }



</style>