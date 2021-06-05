<template>
  <div>
    <div class="d-flex justify-content-between">
      <b-button size="sm" variant="primary" @click="back">Back</b-button>
      <b-button size="sm" variant="dark" @click="submit" :disabled="isSubmitting">
        <b-spinner v-if="isSubmitting" small class="text-white mr-3"></b-spinner>
        <span v-if="isSubmitting" >Submitting...</span>
        <span v-if="!isSubmitting" >Submit</span>
      </b-button>
    </div>
    
    <h4 class="mt-4">Options</h4>
    <div class="ml-4 mt-3 mb-4">
      <b-form-checkbox v-model="submitForm.isAssignToAll" switch>Assign to All Student</b-form-checkbox>
      <b-form-checkbox v-model="submitForm.isSaveAsDraft" switch :disabled="!submitForm.isAssignToAll" >Save as Draft</b-form-checkbox>

      <div> 
        <label class="mt-3">Points</label>
        <b-form-input v-model.number="submitForm.points" type="number" min="0"/>
        <small>Set value to '0' for ungraded assignment</small>
      </div>

      <label class="mt-3">Due Date</label>
      <b-form-datepicker v-model="submitForm.date" :min="minDate"></b-form-datepicker>
      <label class="mt-3">Due Time</label>
      <b-form-timepicker v-model="submitForm.time"></b-form-timepicker>

      <label class="mt-3">Topic</label>
      <b-form-select v-model="submitForm.topicId" :options="topicOptions"></b-form-select>
    </div>

    <h4>Classwork Data</h4>
    <b-table 
      bordered
      striped 
      fill
      :items="selectedClassworks" 
      :fields="fields">
      <template v-slot:cell(no)="data">
        {{data.index + 1 }}
      </template>
      <template v-slot:cell(maxPoints)="data">
        <b-form-input v-model.number="data.item.maxPoints" type="number"/>
      </template>
    </b-table>
  </div>
</template>

<script>

export default {
  name: "ReuseSubmit",
  props: ["selectedClassworks", "topics"],
  data(){
    return {
      fields : [
        "no",
        "title",
        "maxPoints",
      ],
      submitForm : {
        isAssignToAll: true,
        isSaveAsDraft: false,
        points : 0,
        date : null,
        time: "",
        topicId: null
      },
      isSubmitting: false
    }
  },
  methods: {
    back(){
      this.$emit("back")
    },
    submit(){
      this.selectedClassworks.forEach(element => {
        element.assigneeMode = this.assigneeMode
        element.state = this.statePublish
        !element.maxPoints && (element.maxPoints = 0)
        if(this.dueDate){
          const { year, month, day } = this.dueDate
          let localDate
          if(this.dueTime){
            const { hours, minutes } = this.dueTime
            localDate = new Date(year, month-1, day, hours, minutes);
          } else {
            localDate = new Date(year, month-1, day, 23, 59);
          }
          

          element.dueDate = {
            year: localDate.getUTCFullYear(),
            month: localDate.getUTCMonth()+1,
            day: localDate.getUTCDate()
          }

          element.dueTime = {
            hours: localDate.getUTCHours(),
            minutes: localDate.getUTCMinutes()
          }

        }   
        this.submitForm.topicId && (element.topicId = this.submitForm.topicId)
        element.materials && element.materials.filter(material => material.form === undefined) //keluarkan material form
      });

      this.isSubmitting = true
      this.$store.dispatch("createClassworks", {
        courseId: this.$route.params.courseId,
        classWorks: this.selectedClassworks
      })
      .then( isSuccess => {
        if(isSuccess){
         this.$emit('reset-selected')
         this.$emit('recompute')
         this.back()
         this.$emit('change-tab', 1)
         this.submitForm = {
            isAssignToAll: true,
            isSaveAsDraft: false,
            points : 0,
            date : null,
            time: "",
            topicId: null
          }
        }
      })
      .finally(_ => {
        this.isSubmitting = false
      })

    }
  },
  watch: {
    'submitForm.points'(value){      
      this.selectedClassworks.forEach(element => {
        element.maxPoints = value
      }); 
    },
    "submitForm.isAssignToAll"(value){
      if(value === false){
        this.submitForm.isSaveAsDraft = true
      }
    }
  },
  computed: {
    topicOptions(){
      let options = [{
        value: null,
        text: "No Topic"
      }]
      return this.topics && options.concat(this.topics.map(topic => {
        return {
          value : topic.topicId,
          text: topic.name
        }
      }))
    },
    minDate(){
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      return today
    },
    points(value){
      this.selectedClassworks = this.selectedClassworks.map(item => ({...item, maxPoints: value}))
    },
    assigneeMode(){
      return this.submitForm.isAssignToAll ? "ALL_STUDENTS" : "ASSIGNEE_MODE_UNSPECIFIED"
    },
    statePublish(){
      return this.submitForm.isSaveAsDraft ? "DRAFT" : "PUBLISHED"
    },
    dueDate(){
      if(this.submitForm.date){
        let [year, month, day] = this.submitForm.date.split("-")
        return {
          year: Number(year),
          month: Number(month),
          day: Number(day)
        }
      }
    },
    dueTime(){
      if(this.submitForm.time){
        let [hours, minutes] = this.submitForm.time.split(":")

        return {
          hours: Number(hours),
          minutes: Number(minutes)
        }
      }
    }
  }
}
</script>

<style>

</style>