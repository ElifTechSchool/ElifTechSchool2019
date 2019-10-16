<template>
  <v-card class="competition">
    <v-row key="1" justify="center" class="userInfo d-flex">
      <div v-for="competition in getCompetition" :key="competition.id">
        <v-col >
          <h2><b>Name:</b> {{ competition.name }}</h2>
          <p><b>Description:</b> {{ competition.description }}</p>
          <p><b>Deadline_date:</b> {{ formatDateRead(competition.deadline_date) }}</p>
          <p><b>Experience:</b> {{ competition.experience }}</p>
        </v-col>
        <v-col>
          <v-btn color="success" outlined @click="updateCompetition(competition.id)">
          <i class="material-icons">
          create
          </i> Edit
          </v-btn>
          <v-btn color="red lighten-2" outlined @click="hidden = !hidden">
            <i class="material-icons">{{ hidden ? "person_add_disabled" : "person_add" }}</i>
            {{ hidden ? "Unsubscribe" : "Subscribe" }}
          </v-btn>
        </v-col>
      </div>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "CompetitionDetails",
  data() {
    return {
      hidden: false,
    };
  },
  computed: {
    getCompetition() {
      return [this.$store.getters.getCompetition];
    },
  },
  methods: {
    updateCompetition(competitionId) {
      this.$router.push({
      name: "editCompetition",
      params: { id: competitionId }
    });
    },
    formatDateRead(competitionDate) {
        const date = new Date(competitionDate);
        let month = date.getMonth();
        let day = date.getDate();
        let year = date.getFullYear();

        return day + '/' + month + '/' + year;
    },
  },
  mounted() {
    this.$store.dispatch("loadCompetitionById", this.$route.params.id);
  },
  

}
</script>
<style lang="scss" scoped>
.v-card {
  width: 50%;
  margin: 100px auto;
}
</style>