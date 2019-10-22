<template>
  <div class="competitions">
    <h2>Competitions list</h2>
    <v-row align="center">
    
    <v-col class="text-center" cols="12" md="8">
      <v-layout>
        <v-btn small slat color="primery" @click="sortByDate">
          <v-icon left>event</v-icon>
          <span class="caption text-lowercase">By date</span>
        </v-btn>
      </v-layout>
    </v-col>
    <v-col v-if="this.$store.getters.userMe.user" class="text-center" cols="6" md="4">
      <v-btn class="mx-2" right fab dark color="indigo" @click="addCompetition">
      <v-icon dark>mdi-plus</v-icon>
      </v-btn>  
    </v-col>
    
    </v-row>
    <Competition
      v-for="competition in getCompetitions"
      :competitionData="competition"
      :key="competition.id"
    />
      <div>
          <v-pagination
            :length="getPages()"
            @input="page => setCompetitionPage(page)"
          >
          </v-pagination>
      </div>
  </div>
</template>

<script>
import Competition from "../../components/Competitions/Competition";
export default {
  name: "Competitions",
  data() {
    return {
      
      competitionParams: {
        limit: 5,
        page: 1,
        
      }
    }
  },
  components: { Competition },
  computed: {
    getCompetitions() {
      return this.$store.getters.getCompetitions;
    },
    getCountCompetitions() {
      return this.$store.getters.getCountCompetitions;
    },
  },
  mounted() {
    this.$store.dispatch("loadCompetitions", this.competitionParams);
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
    },
    getPages() {
      const result = Math.ceil(this.getCountCompetitions / this.competitionParams.limit);
      return result;
    },
    setCompetitionPage(page) {
      this.competitionParams.page = page;
      this.$store.dispatch("loadCompetitions", this.competitionParams);
    },
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
