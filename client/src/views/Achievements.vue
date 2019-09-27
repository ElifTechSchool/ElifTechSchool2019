<template>
  <div class="achievements">
    <h1>All achievements</h1>
    <div>
    <v-btn @click="AddAchievement" color="blue">Add achievement</v-btn>
     <AchievementsList/>
    </div>
  </div>
</template>

<script>
import AchievementsList from "../components/Achievements/AchievementsList.vue";

export default {
  components: {
    AchievementsList
  },
    methods: {
    AddAchievement() {
      this.$router.push('/create_achievement');
    },
  },
};
</script>
