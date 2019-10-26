<template>
  <div class="form-wrapper text-right">
    <v-form @submit.prevent="addCompetition">
      <h3>Create Competition</h3>
      <v-text-field
        name="name"
        label="Name"
        :rules="nameRules"
        :counter="55"
        v-model="competition.name"
        required
      />
      <v-text-field
        type="text"
        label="Description"
        name="description"
        :rules="descriptionRules"
        :counter="55"
        v-model="competition.description"
        required
      />
      <v-text-field
        type="date"
        label="Deadline_date"
        name="deadline_date"
        :rules="dateRules"
        v-model="competition.deadline_date"
        required
      />
      <v-text-field
        type="number"
        label="Experience"
        name="experience"
        v-model="competition.experience"
        :rules="experienceRules"
        :counter="2"
        required
      />
      <v-btn type="submit" color="primary"> Submit </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      showForm: false,
      competition: {},
      nameRules: [
        v => !!v || "This field is required",
        v =>
          (v && v.length <= 55) || "This field must be less than 50 characters"
      ],
      descriptionRules: [
        v => !!v || "This field is required",
        v =>
          (v && v.length <= 5120) ||
          "This field must be less than 50 characters"
      ],
      experienceRules: [
        v => (v && v !== 0) || "This field must be greater than zero",
        v => (v && v <= this.$store.getters.userMe.user.experience) || "Can`t be more user experience",
        v =>
          (v && Math.sign(v) !== -1) || "This field must be a positive number ",
      ],
      dateRules: [v => !!v || "This field is required"]
    };
  },
  methods: {
    addCompetition() {
      if (
        this.competition.experience > 0 &&
        this.competition.name &&
        this.competition.description
      ) {
        this.$store.dispatch("addCompetition", this.competition);
        this.competition = {};
        this.showForm = false;
        this.$router.push({
          name: "competitions"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.v-form {
  width: 50%;
  margin: 100px auto;
}
</style>
