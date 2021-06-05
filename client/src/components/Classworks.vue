<template>
  <div>
    <b-pagination
    size="sm"
      v-model="currentPage"
      :total-rows="classworks && classworks.length"
      per-page="10"
      first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last"
    ></b-pagination>

    <b-table 
      medium
      per-page="10"
      :current-page="currentPage"
      bordered
      striped 
      hover 
      fill
      :items="classworks" 
      :fields="fields">
      <template v-slot:cell(no)="data">
        <!-- {{(data.index + 1) + (currentPage-1 * 10)}} -->
        {{data.index + 1 + (currentPage-1) * 10 }}
      </template>
      <template v-slot:cell(topicId)="data">
        {{ getTopicName(data.item.topicId) }}
      </template>
      <template v-slot:cell(description)="data">
        <p style="white-space: pre-line">{{data.item.description}}</p>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: ["classworks", "topics"],
  data(){
    return {
      fields: [
         'no', 
        'title',
        'description', 
        'maxPoints', 
        'workType',
        { key: "topicId", label: 'Topic'},
      ],
      currentPage : 1

    }
  },
  methods: {
    getTopicName(topicId){
      let topic = this.topics.find(topic => topic.topicId == topicId)
      return topic ? topic.name : ""
    }
  }
}
</script>

<style>

</style>