<template>
    <div class="achievements">
      <h1>All achievements</h1>
      <v-flex xs12 offset-xs8>
        <v-btn @click="AddAchievement" color="green" >+ new achievement</v-btn>
      </v-flex>
      <div>
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

<style lang="scss">
  .achievements {
    text-align: center;
  }
</style>