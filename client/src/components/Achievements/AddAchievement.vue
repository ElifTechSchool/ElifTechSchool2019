<template>
  <div class="form-add-achievement">
    <v-form @submit.prevent="addAchievement">
      <h1>Create new achievement</h1>
        <v-text-field name="name" label="Name" v-model="achievement.name" required/>
        <v-text-field name="description" label="Description" v-model="achievement.description" required/>
        <v-text-field name="type" label="Type" v-model="achievement.type" required/>
        <v-text-field name="experience" label="Experience" type="number" v-model="achievement.experience" required/>
        <v-text-field name="photo_url"  label="Photo url" type="url" v-model="achievement.photo_url" required/>
      <v-btn type="submit" color="blue"> Submit </v-btn>
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
        console.log(this.achievement);
        this.$store.dispatch("addAchievement", this.achievement);
        this.achievement = {};
      }
    }
  }
  </script>

  <style scoped lang="scss">
    .v-form{
      width: 50%;
      margin: 100px auto;
    }
</style>
