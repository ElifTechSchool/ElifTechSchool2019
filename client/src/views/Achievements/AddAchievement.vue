<template>
  <div class="form-add-achievement">
    <v-btn to="/achievements" icon class="hidden-xs-only">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-form @submit.prevent="addAchievement" ref="form">
      <h1>Create new achievement</h1>
      <v-text-field
        name="name"
        label="Name"
        solo
        v-model="achievement.name"
        required
      />
      <v-text-field
        name="description"
        label="Description"
        solo
        v-model="achievement.description"
        required
      />
      <v-text-field
        name="type"
        label="Type"
        solo
        v-model="achievement.type"
        required
      />
      <v-text-field
        name="experience"
        label="Experience"
        type="number"
        solo
        v-model="achievement.experience"
        required
      />
      <v-text-field
        name="photo_url"
        label="Photo url"
        type="url"
        solo
        v-model="achievement.photo_url"
        hint="https:/example.com/page"
        required
      />
      <v-btn type="submit" color="green"> Create </v-btn>
      <v-btn color="error" class="ma-5" @click="reset">Reset Form</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      achievement: {},
      errors: []
    };
  },
  methods: {
    addAchievement() {
      this.$store.dispatch("addAchievement", this.achievement);
      this.achievement = {};
      this.$router.push({ name: "achievements" });
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style scoped lang="scss">
.v-form {
  width: 50%;
  margin: 100px auto;

  h1 {
    margin: 50px;
  }
}
</style>
