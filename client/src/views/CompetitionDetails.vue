<template>
  <v-card class="competition" >
      <div >
        <h1><b>Name:</b> {{ getCompetition.name }}</h1>
        <p><b>Description:</b> {{ getCompetition.description }}</p>
        <p><b>Deadline_date:</b> {{getCompetition.deadline_date }}</p>
        <p><b>Experience:</b> {{ getCompetition.experience }}</p>
      </div>
      <v-btn class="ma-2" tile outlined color="success" @click.native="isShow = !isShow">
        <v-icon left>mdi-pencil</v-icon> Edit
      </v-btn>
  </v-card>
</template>

<script>

export default {
 
  data() {
    return {
      isShow: false
    };
  },
  computed: {
    getCompetition() {
      return this.$store.getters.getCompetitions;
    },
  },
  mounted() {
    this.$store.dispatch("loadCompetitionById", this.$route.params.id);
  },
  
};
</script>


