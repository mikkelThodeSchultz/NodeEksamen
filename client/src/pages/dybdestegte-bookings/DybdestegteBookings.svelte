<script>
    import ShowList from "../../components/show/ShowList.svelte";

    let selectedShow;
    function handleSelectedShow(event) {
        selectedShow = event.detail
        console.log(selectedShow);
    }
</script>

<h1>DET HER ER BOOKINGS</h1>
<ShowList on:showSelected={handleSelectedShow}/>

<style>
    h1{
        margin-top: 5vh;
    }
</style>