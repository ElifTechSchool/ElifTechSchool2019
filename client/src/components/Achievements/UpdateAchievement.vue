<template>
  <v-form @submit.prevent="updateAchievement">
    <v-text-field name="name" label="Name" v-model="achievement.name"/>
    <v-text-field name="description" label="Description" v-model="achievement.description"/>
    <v-text-field name="type" label="Type" v-model="achievement.type"/>
    <v-text-field name="experience" label="Experience" type="number" v-model="achievement.experience"/>
    <v-text-field name="photo_url" label="Photo url" type="url" v-model="achievement.photo_url"/>
    <v-btn color="green" type="submit">
      Update
    </v-btn>
  </v-form>
</template>

<script>
import {mapActions} from "vuex";
export default {
  name: "UpdateAchievement",
  data() {
    return {
      achievement: {},
    };
  },
  methods: {
    ...mapActions(["getAchievementById"]),
    updateAchievement() {
      this.$store.dispatch("updateAchievement", {achievement: this.achievement, id: this.achievement.id});
    }
  },
  mounted() {
    this.getAchievementById(this.$route.params.id).then(res => {
      this.achievement = res.data.data[0]
    })
  }
};
</script>