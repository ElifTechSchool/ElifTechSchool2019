<template>
  <div class="competitions">
    <AddCompetition />
    <h2>Competitions list</h2>
    <div v-for="competition in getCompetitions" :key="competition.id" class="row"   >
      <div class="data col-sm text-right">
        DEADLINE_DATE: {{ competition.deadline_date }}
      </div>
      <div class="info col-sm">
        <li class="text-left">ID: {{ competition.id }}</li>
        <li class="text-left">NAME: {{ competition.name }}</li>
        <li class="text-left">DESCRIPTION: {{ competition.description }}</li>
        <li class="text-left">EXPERIENCE: {{ competition.experience }}</li>
        <router-link :to="{ name: 'CompetitionDetails', params: { id: competition.id }}" tag="button">Details</router-link>
        <v-btn v-on:click="deleteCompetition(competition.id)">DELETE</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex"
import AddCompetition from "../components/AddCompetition";
export default {
  computed: mapGetters(["getCompetitions"]),
  components: { AddCompetition },
  methods: 
    mapActions(["fetchCompetitions", "deleteCompetition", "createCompetition"]),

    async mounted() {
      return this.fetchCompetitions();
    },

};

</script>
