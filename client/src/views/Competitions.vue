<template>
  <div class="competitions">
    <AddCompetition />
    <h2>Competitions list</h2>
    <Competition v-for="competition in getCompetitions" :competitionData="competition" :key="competition.id"  />
  </div>
  
</template>



<script>
import AddCompetition from "../components/AddCompetition";
import Competition from "../components/Competition";
export default {
  name: "Competitions",
  computed: {
    getCompetitions() {
      return this.$store.getters.getCompetitions;
    },
  },
  mounted() {
    this.$store.dispatch("loadCompetitions");
  },
  components: { AddCompetition, Competition },
};

</script>
<style lang="scss" scoped>
.competitions {
  width: 50vw;
  height: 600px;
  padding: 40px;
  margin: auto;
  margin-top: 80px;
}
</style>