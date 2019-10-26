<template>
  <div class="competitions">
    <h2>Competitions list</h2>
    <v-row align="center">
      <v-col class="text-center" cols="12" md="8">
        <v-layout>
          <v-btn small slat color="primery" @click="sortBy('all')">
            <i class="material-icons">
              timer
              </i>
            <span class="caption text-lowercase">All</span>
          </v-btn>
          <v-btn small slat color="primery" @click="sortBy('active')">
            <i class="material-icons">
             access_time
              </i>
            <span class="caption text-lowercase">Active</span>
          </v-btn>
          <v-btn small slat color="primery" @click="sortBy('past')">
            <i class="material-icons">
              timer_off
              </i>
            <span class="caption text-lowercase">Past</span>
          </v-btn>
        </v-layout>
      </v-col>
      <v-col
        class="text-center"
        cols="6"
        md="4"
      >
        <v-btn
          class="mx-2"
          right
          fab
          dark
          color="indigo"
          @click="addCompetition"
        >
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
        offset: null,
        
      }
    };
  },
  components: { Competition },
  computed: {
    getCompetitions() {
      return this.$store.getters.getCompetitions;
    },
    getCountCompetitions() {
      return this.$store.getters.getCountCompetitions;
    }
  },
  mounted() {
    this.$store.dispatch("loadCompetitions", this.competitionParams);
    
  },
  methods: {
    sortBy(type) {
        if (type == 'active') {
          this.$store.dispatch("loadActiveCompetitions", this.competitionParams);
          
        } else if(type == 'past') {
          this.$store.dispatch("loadPastCompetitions", this.competitionParams);
          
        } else {
          this.$store.dispatch("loadCompetitions", this.competitionParams);
          
        }
        
        
    },
    addCompetition() {
      this.$router.push({
        name: "add_competition"
      });
    },
    getPages() {
      const result = Math.ceil(
        this.$store.getters.getCountCompetitions / this.competitionParams.limit
      );
      return result;
    },
    setCompetitionPage(page) {
      this.competitionParams.page = page;
      this.competitionParams.offset = (this.competitionParams.page - 1) * this.competitionParams.limit;
      this.$store.dispatch("loadCompetitions", this.competitionParams);
    },  
  },
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
