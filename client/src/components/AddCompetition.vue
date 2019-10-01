<template>
  <div class="form-wrapper">
    <v-btn class="ma-2" outlined color="primary" @click.native="showForm = !showForm"> Add </v-btn>
     <div v-if="showForm">
        <v-form @submit.prevent="addCompetition">
        <h3>Create Competition</h3>
        <v-text-field name="name" label="Name" v-model="competition.name" required />
        <v-text-field
            type="text"
            label="Description"
            name="description"
            v-model="competition.description"
            required
        />
        <v-text-field
            type="date"
            label="Deadline_date"
            name="deadline_date"
            v-model="competition.deadline_date"
            required
        />
        <v-text-field
            type="text"
            label="Experience"
            name="experience"
            v-model="competition.experience"
        />
        <v-btn type="submit" color="primary"> Submit </v-btn>
        </v-form>
     </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
        showForm: false,
        competition: {},
    };
  },
  methods: {
    addCompetition() {
      this.$store.dispatch("addCompetition", this.competition);
      this.competition = {};
    }
  },
    
};
</script>

<style lang="scss" scoped>
.v-form {
  width: 50%;
  margin: 100px auto;
}
</style>
