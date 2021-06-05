<template>
    <div class="text-center">
      <b-spinner></b-spinner>
      <div>{{message || "loading data..."}}</div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { Topics, Classworks, Reuse } from "../components"

export default {
  props: ["message"],
}
</script>

<style>

</style>