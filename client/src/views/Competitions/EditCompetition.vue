<template>
  <div class="form-wrapper text-right">
    <div v-for="competition in getCompetition" :key="competition.id">
      <v-form @submit.prevent="updateCompetition(competition)">
        <h3>Edit Competition</h3>
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
          type="time-date"
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => {
    return {
      showUpdateForm: false,
      competition: {
        id: "",
        name: "",
        description: "",
        deadline_date: "",
        experience: ""
      },
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
        v => (v && isFinite(v)) || "This field must be a number ",
        v => (v && v.length <= 2) || "This field must have two digitals",
        v =>
          (v && Math.sign(v) !== -1) || "This field must be a positive number "
      ],
      dateRules: [v => !!v || "This field is required"]
    };
  },
  computed: {
    getCompetition() {
      return [this.$store.getters.getCompetition];
    }
  },
  methods: {
    updateCompetition(competition) {
      if (
        competition.experience > 0 &&
        competition.name &&
        competition.description
      ) {
        this.$store.dispatch("updateCompetition", competition);
        this.$router.push({
          path: `/competitions/${competition.id}`
        });
      }
    }
  },
  mounted() {
    this.$store.dispatch("loadCompetitionById", this.$route.params.id);
  }
};
</script>

<style lang="scss" scoped>
.v-form {
  width: 50%;
  margin: 100px auto;
}
</style>
