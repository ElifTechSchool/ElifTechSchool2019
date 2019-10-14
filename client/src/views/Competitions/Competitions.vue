<template>
  <div class="competitions">
    <h2>Competitions list</h2>
    <v-layout>
      <v-btn small slat color="primery" @click="sortByDate">
        <v-icon left>event</v-icon>
        <span class="caption text-lowercase">By date</span>
      </v-btn>
    </v-layout>
    <Competition
      v-for="competition in getCompetitions"
      :competitionData="competition"
      :key="competition.id"
    />
    <v-col>
      <v-btn class="mx-2" fab dark color="indigo" @click="addCompetition">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    </v-col>
  </div>
</template>

<script>
import AddCompetition from "../Competitions/AddCompetition";
import Competition from "../../components/Competitions/Competition";
export default {
  name: "Competitions",
  components: { AddCompetition, Competition },
  computed: {
    getCompetitions() {
      return this.$store.getters.getCompetitions;
    }
  },
  mounted() {
    this.$store.dispatch("loadCompetitions");
  },
  methods: {
    sortByDate() {
      const competitions = this.$store.getters.getCompetitions;
      return competitions.sort((a, b) =>
        a.deadline_date < b.deadline_date ? 1 : -1
      );
    },
    addCompetition() {
      this.$router.push({
        name: "add_competition",
      });
    }
  }
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
