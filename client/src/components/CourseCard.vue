<template>
  <b-card
    :title="course.name"
    title-tag="h5"
    border-variant="primary"
    style="width: 15rem; border"
    body-class="d-flex flex-column"
    class="mx-2 my-3">
    <b-button @click="manageCourse" variant="link" class="align-self-end">Manage Course</b-button>
  </b-card>
</template>

<script>
export default {
  props: ["course"],
  methods: {
    manageCourse(){ 

      this.$router.push(`/course/${this.course.id}`)
    }
  }

}
</script>

<style>

</style>