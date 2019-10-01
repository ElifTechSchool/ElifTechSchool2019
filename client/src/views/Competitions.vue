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
  computed: {
    getCompetitions() {
      return this.$store.getters.getCompetitions;
    },
  },
  methods: {
    loadCompetitions() {
      this.$store.dispatch("loadCompetitions");
    }
  },
  mounted() {
    this.$store.dispatch("loadCompetitions");
  },
  components: { AddCompetition, Competition },
};

</script>
