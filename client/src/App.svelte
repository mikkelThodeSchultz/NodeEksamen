<script>
    import Wrapper from "./components/wrapper/Wrapper.svelte";
  import ProtectedRoutes from "./pages/auth/ProtectedRoutes.svelte";
  import Footer from "./pages/footer/Footer.svelte";
  
</script>

  <Wrapper>
  <ProtectedRoutes/>
  <Footer/>
  </Wrapper>

  <style>
    @import '@fortawesome/fontawesome-free/css/all.css';
  </style>
  