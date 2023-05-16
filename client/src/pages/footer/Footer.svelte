<script>
const copyrightYear = `© ${new Date().getFullYear() }`
</script>


<div id="footerContainer">
    <footer>
        <div id="link-container">
            <a href="https://dybdestegte.bandcamp.com/" target="_blank"> <i class="fa-brands fa-bandcamp"></i></a>
            <a href="https://www.facebook.com/profile.php?id=100067826059278" target="_blank"> <i class="fa-brands fa-facebook" ></i></a>
        </div>
        <p id="copyright">{copyrightYear}</p>
    </footer>
</div>



<style>
#footerContainer{
    position: fixed;
    bottom: 0%;
    margin: 0 auto;
    width: 100%;
    text-align: center;
}
#copyright{
    color: rgb(195, 195, 195);
}
i{
    text-decoration: none;
    color: rgb(195, 195, 195);
    font-size: 200%;
}
i:hover{
    scale: 120%;
    transition: ease-in;
    color: rgb(255, 255, 255);
}
</style>