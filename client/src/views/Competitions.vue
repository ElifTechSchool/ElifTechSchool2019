<template>
  <div class="competitions">
    <h1>Competitions list</h1>
    <div v-for="competition in getCompetitions" :key="competition.id" class="row"   >
      <div class="data col-sm text-right">
        DEADLINE_DATE: {{ competition.deadline_date }}
      </div>
      <div class="info col-sm">
        <li class="text-left">ID: {{ competition.id }}</li>
        <li class="text-left">NAME: {{ competition.name }}</li>
        <li class="text-left">DESCRIPTION: {{ competition.description }}</li>
        <li class="text-left">EXPERIENCE: {{ competition.experience }}</li>
        <li><router-link :to="{ name: 'details', params: { id: competition.id }}">Details</router-link></li>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex"
export default {
  computed: mapGetters(["getCompetitions"]),
  methods: mapActions(["fetchCompetitions"]),
  async mounted() {
    this.fetchCompetitions();
  },
  
};
</script>
