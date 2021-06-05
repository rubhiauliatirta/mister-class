<template>
  <b-col v-if="loading" class="d-flex justify-content-center">
    <Loading message="Loading classes.."/>
  </b-col>
  <b-col class="d-flex flex-wrap" v-else>
    <CourseCard 
      v-for="course in courses" 
      :key="course.id" 
      :course="course"
      />
    <h1 v-if="courses.length == 0">You don't have any classes</h1>
  </b-col>
</template>

<script>
import axios from "axios"
import { CourseCard, Loading } from "../components"
import { mapActions, mapState } from "vuex"

export default {
  name: 'Home',
  components: {
    CourseCard,
    Loading
  },
  data(){
    return {
      loading: false
    }
  },
  created(){
    if(this.courses === null){
      this.loading = true
      this.getCourses()
      .finally(_ => {
        this.loading = false
      })
    }
  },
  methods : {
    ...mapActions(["getCourses"])
  },
  computed: {
    ...mapState(["courses"])
  }
}
</script>
