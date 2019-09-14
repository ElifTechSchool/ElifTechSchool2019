<template lang="html">
<div>
  <ul >
    <li v-for="rank in allRanks">
      {{ rank.name }}
    </li>
  </ul>
</div>
</template>

<script>
import { mapGetters } from "vuex";

  export default  {
    name: 'ranks-list',
    props: [],
    mounted () {
       this.$store.dispatch("getAllRanks")
    },
    data() {
      return {
      }
    },
    methods: {

    },
    computed: {
     ...mapGetters(['allRanks'])
    }
}
</script>

<style scoped lang="scss">

</style>
