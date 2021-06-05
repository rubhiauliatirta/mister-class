<template>
  <div>
    <b-navbar toggleable="sm" class="d-flex justify-content-between py-1 px-3 bg-primary">
        <b-navbar-brand>
          <b-img :src="require('../assets/lg.png')" style="width: 50px; height: 50px;"/>
          <b-img :src="require('../assets/text.png')" style="height: 23px;" class="ml-2"/>

        </b-navbar-brand>
      <div>
        <b-link v-if="$store.state.isLogin" to="/" class="mr-3" style="color: whitesmoke">Classes</b-link>
        <b-link v-if="$store.state.isLogin" to="/auth" @click="logout" style="color: whitesmoke">Logout</b-link>
      </div>
      
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    async logout(){
      const response = await this.$gAuth.signOut()
      localStorage.removeItem("access_token")
      this.$store.commit("SET_LOGIN", false)
      this.$store.commit("SET_COURSE", null)
    }
  }
}
</script>

<style scoped>
a {
  color: whitesmoke
}
</style>