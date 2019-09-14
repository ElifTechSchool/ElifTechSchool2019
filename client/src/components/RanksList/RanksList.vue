<template lang="html">

    <div class="container">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Experience</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rank in ranks" :key="rank.id">
          <td>{{ rank.id }}</td>
          <td>{{ rank.experience }}</td>
          <td>{{ rank.photo_url }}</td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import { mapState } from "vuex";

  export default  {
    name: 'ranks-list',
    props: [],
    mounted() {
       this.$store.dispatch("getAllRanks")
       console.log(this.ranks)
    },
    created() {
      
    },
    data() {
      return {
      }
    },
    methods: {

    },
    computed: {
      ...mapState(['ranks'])
    }
}
</script>

<style scoped lang="scss">

</style>
