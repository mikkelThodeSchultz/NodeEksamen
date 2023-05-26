<script>
    import ShowList from "../../components/show/ShowList.svelte";

    let selectedShow;
    function handleSelectedShow(event) {
        selectedShow = event.detail
        console.log(selectedShow);
    }
</script>
<div class="wrapper">
    <h1>DET HER ER BOOKINGS</h1>
    <ShowList on:showSelected={handleSelectedShow}/>
</div>
<style>
    h1{
        padding-top: 5vh;
    }

    .wrapper{
        background-image: url("../../images/backgrounds/cole.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        background-attachment: fixed;
        background-color: rgba(0, 0, 0, 0.2);
        background-blend-mode: multiply;
    }
</style>