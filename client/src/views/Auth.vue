<template>
  <b-col class="text-center d-flex flex-column justify-content-center align-items-center">
      <b-img id="logo" :src="require('../assets/lg.png')"  class="bounce" /><br>
      <b-img id="logo" :src="require('../assets/textb.png')"/>
      <h5 class="text-black mt-3 typewriter">Easy way to reuse multiple classwork and assignment in your google classroom.</h5>
      <b-button 
        class="mt-3"
        variant="outline-primary"
        :disabled="loading"
        @click="signIn">
        {{loading ? "Signing In...": "Login with Google"}}
      </b-button>
  </b-col>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "Auth",
  data(){
    return {
      loading: false
    }
  },
  methods: {
    ...mapActions(["login"]),
    async signIn(){
      this.loading = true
      try {
         const authCode = await this.$gAuth.getAuthCode()
         
         await this.login(authCode)
         this.$router.replace("/")
        //  .then( _ => {
        //    this.$router.replace("/")
           
        //  })
        //  .finally(_ => {
        //    this.loading = false
        //  })
      }
      catch (e) {
        this.$mytoast("Google Login Failed", true)
      }
      finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
  #logo {
        animation-duration: 2s;
        animation-iteration-count: infinite;
        transform-origin: bottom;
        width: 250px;
  }
  .bounce {
        animation-name: bounce-4;
        animation-timing-function: ease;
    }
    @keyframes bounce-4 {
        0%   { transform: scale(1,1)    translateY(0); }
        10%  { transform: scale(1.1,.9) translateY(0); }
        30%  { transform: scale(.9,1.1) translateY(-50px); }
        50%  { transform: scale(1,1)    translateY(0); }
        100% { transform: scale(1,1)    translateY(0); }
    }

  .typewriter {
    overflow: hidden; /* Ensures the content is not revealed until the animation */
    border-right: .15em solid #850000; /* The typwriter cursor */
    white-space: nowrap; /* Keeps the content on a single line */
    margin: 0 auto; /* Gives that scrolling effect as the typing happens */
    letter-spacing: .10em;  /*Adjust as needed */
    animation: 
      typing 5s steps(40, end),
      blink-caret .75s step-end infinite;
  }
  @keyframes typing {
    from { width: 0 }
    to { width: 100% }
  }

  /* The typewriter cursor effect */
  @keyframes blink-caret {
    from, to { border-color: transparent }
    50% { border-color: #850000; }
  }
</style>
