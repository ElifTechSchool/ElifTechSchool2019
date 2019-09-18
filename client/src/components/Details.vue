<template>
    <div class="details">
      <h2>Competition №: {{ $route.params.id }}</h2>
      <div  v-for="competition in getCompetitions" v-bind:key="competition.id">
          <li>DEADLINE_DATE: {{competition.deadline_date}}</li>
          <li>NAME: {{competition.name}}</li>
          <li>DESCRIPTION: {{competition.description}}</li>
          <li>EXPERIENCE: {{competition.experience}}</li>
      </div>
      <UpdateForm />
    </div> 
</template>

<script>
import {mapGetters, mapActions} from "vuex"
import UpdateForm from "./UpdateForm";
export default {
  components: {
    UpdateForm
  },
  computed: mapGetters(["getCompetitions"]),
  methods: mapActions(["fetchCompetitionById", "updateCompetition"]),
  async mounted() {
    this.fetchCompetitionById(this.$route.params.id);
  },
  
};
</script>

<style>
    input {
        display: block;
        margin: 0 auto;
        border: 1px solid #ccc;
        padding: 10px;
        margin-bottom: 10px;
    }
    
    UpdateForm{
      display: none;
    }

</style>