<template>
  <b-col class="bg-white p-3" >
  <h1>{{course.name}}</h1>
 
      <b-tabs content-class="mt-3 p-3" v-model="tabIndex">
    <div class="text-center" v-if="loading">
      <b-spinner label="Loading data.."></b-spinner>
      <div>Loading data...</div>
    </div>
    
    <b-tab title="Topics" active >
      <Topics v-show="course.topics" :topics="course.topics" @recompute="recompute"/>
    </b-tab>
    <b-tab title="Classworks">
      <Classworks v-show="course.classWorks" :classworks="course.classWorks" :topics="course.topics" />
    </b-tab>
    <b-tab title="Reuse"> 
      <Reuse v-show="course.topics" :topics="course.topics" @recompute="recompute" @change-tab="changeTab"/>
    </b-tab>
  </b-tabs>


  </b-col>
  
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { Topics, Classworks, Reuse } from "../components"

export default {
  created(){
    if(this.courses == null){
      this.getCourses()
    }
    if(!this.course.classWorks || !this.course.topics){
      this.loading = true
      this.getCourseData(this.courseId)
      .then(_ => {
        this.loading = false
      })
    }
  },
  data(){
    return {
      loading : false,
      compute: false,
      tabIndex: 0

    }
  },
  components: {
    Topics, Classworks, Reuse
  },
  methods: {
    ...mapActions(["getCourseData", "getCourses"]),
    recompute(){
      this.compute = !this.compute
    },
    changeTab(index){
      this.tabIndex = index
    }
  },
  computed: {
    course(){
      this.compute
      return this.courses ? this.courses.find(course => course.id === this.courseId) : {}
    },
    courseId(){
      return this.$route.params.courseId
    },
    ...mapState(["courses"])
  },
}
</script>

<style>

</style>