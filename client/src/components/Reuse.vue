<template>
  <div>
    <ReuseSelection 
      v-show="!submitPage" 
      @next="next"/>
    <ReuseSubmit 
      :topics="topics"
      :selectedClassworks="selectedClassworks"
      v-show="submitPage"
      @change-tab="changeTab"
      @reset-selected="reset"
      @back="back"/>
  </div>
</template>

<script>
import ReuseSubmit from "./ReuseSubmit"
import ReuseSelection from "./ReuseSelection"

export default {
  name : "Reuse",
  props: ["topics"],
  components : {
    ReuseSubmit, 
    ReuseSelection
  },
  data(){
    return {
      submitPage: false,
      selectedClassworks: [],
    }
  },
  methods: {
    back(){
      this.submitPage = false
    },
    next(selectedClassworks){
      this.submitPage = true
      this.selectedClassworks =  selectedClassworks
    },
    reset(){
      this.selectedClassworks = []
    },
    changeTab(index){
      this.$emit('change-tab', index)
    }
  },
}
</script>

<style>

</style>

