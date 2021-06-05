<template>
  <div>
      <div class="d-flex justify-content-end">
          <b-button size="sm" variant="primary" @click="next">Next</b-button>
      </div>
      <label>Course</label>
      <b-form-select v-model="courseId" :options="courseOptions"></b-form-select>
      
      <label class="mt-3">Topic</label>
      <b-form-select v-model="topicId" :options="topicOptions" :disabled="loading"></b-form-select>

      <b-table   
        small
        bordered
        hover 
        fill
        class="mt-2"
        :filter="topicId"
        :items="course && classWorks" 
        :fields="fields">
        <template v-slot:cell(selected)="data">
          <b-form-checkbox v-model="data.item.selected">
          </b-form-checkbox>
        </template>
        <template v-slot:cell(no)="data">
          {{data.index}}
        </template> 
      </b-table>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import getRequiredKey from '../helpers/getRequiredKey'
export default {
  name: "ReuseSelection",
  data(){
    return {
      courseId : null,
      topicId : null,
      fields: [
        "selected",
        'title',
        'workType',
      ],
      loading : false
    }
  },
  methods : {
    ...mapActions(["getCourseData"]),
    next(){
      let selectedClassworks = this.classWorks
        .filter(item => item.selected === true)
        .map(getRequiredKey)

      if(selectedClassworks.length === 0){
        this.$mytoast('You are not selected any classwork', true)
      } else {
        this.$emit('next', selectedClassworks)
      }
      
    }
  },
  computed : {
    ...mapState(["courses"]),
    courseOptions(){
      let selectOptions = [{
        value: null, text: "Please select a course"
      }]

      if(this.courses){
        return selectOptions.concat(this.courses.map(course => {
          return {
            value : course.id,
            text : course.name
          }
        }))
      } else {
        return selectOptions
      }

    },
    topicOptions(){
      if(!this.courseId || this.courses == null){
        return [
          {
            value: null,
            text: "Please select course",
            disabled : true
          }
        ]
      }
      else if(!this.course.topics){
        this.loading = true
        this.getCourseData(this.courseId)
        .then(_ => {
          this.loading = false
        })
        return [{
          value: null,
          text: "Loading topics..."
        }]
      } else {
        let availableTopicsOptions = [
          {
            value: null,
            text: "All"
          },
        ]
        return availableTopicsOptions.concat(this.course.topics.map(topic => {
          return {
            value: topic.topicId,
            text: topic.name,
          }
        }))
      }
    },
    course(){
      return this.loading ? null : this.$store.getters.getCourseById(this.courseId)
    },
    classWorks(){
      return (this.course && this.course.classWorks) ? this.course.classWorks.map(item => ({...item, selected: false})) : []
    },
  },
  watch : {
    courseId(){
      this.selectedTopicId = null
    }
  },
}
</script>

<style>

</style>