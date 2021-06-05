<template>
  <div>
    <Navbar />
    <b-container class="w-100">
      <b-row class="py-5 d-flex justify-content-center" v-if="loading" > 
        <Loading message="Signing in..."/>
      </b-row>
      <b-row class="py-5" v-else> 
        <router-view/>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { Navbar,Loading } from "./components"
export default {
  name: "App",
  data(){
    return {
      loading: false
    }
  },
  components : {
    Navbar, Loading
  },
  created(){
    if(localStorage.getItem("access_token")){
      this.loading = true
       this.$store.dispatch("isValid")
      .then(isVerified => {
        !isVerified && this.$router.replace("/auth")
      })
      .finally(_ => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss">

  @import "assets/_custom.scss";
  @import "~bootstrap/scss/bootstrap.scss";
  @import '~bootstrap-vue/dist/bootstrap-vue.css';

</style>

