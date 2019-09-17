<template>
    <div class="details">
      <h2>Competition №: {{ $route.params.id }}</h2>
      <div  v-for="competition in getCompetitions" v-bind:key="competition.id">
          <li>DEADLINE_DATE: {{competition.deadline_date}}</li>
          <li>NAME: {{competition.name}}</li>
          <li>DESCRIPTION: {{competition.description}}</li>
          <li>EXPERIENCE: {{competition.experience}}</li>
      </div>
    </div> 
</template>

<script>
import {mapGetters, mapActions} from "vuex"
export default {
  computed: mapGetters(["getCompetitions"]),
  methods: mapActions(["fetchCompetitionById"]),
  async mounted() {
    this.fetchCompetitionById(this.$route.params.id);
  },
  
};
</script>