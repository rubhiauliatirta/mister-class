<template>
  <div>
    <b-form @submit.prevent="submit" class="d-flex">
      <b-form-input v-model="newTopic" placeholder="Create new topic" class="w-50"></b-form-input>
      <b-button type="submit" class="px-4 ml-3" variant="primary" :disabled="isSubmitting">
        <b-spinner small class="text-white mr-2" v-if="isSubmitting"></b-spinner>
        <span v-if="isSubmitting">Adding...</span>
        <span v-if="!isSubmitting">Add</span>
      </b-button>
    </b-form>
    
    
    <b-table 
      class="mt-3"
      bordered
      striped 
      hover 
      fill
      :items="topics" 
      :fields="fields">
    </b-table>
  </div>
</template>

<script>
export default {
  props: ["topics"],
  data(){
    return {
      fields: ['name'],
      newTopic: "",
      isSubmitting: false
    }
  },
  methods: {
    submit(){
      this.isSubmitting = true
      this.$store.dispatch('createTopic', {
        courseId: this.$route.params.courseId,
        name : this.newTopic
      })
      .then(_=> {
        this.newTopic = ""
        this.isSubmitting = false
        this.$emit("recompute")
      })
      
    }
  }
}
</script>

<style>

</style>