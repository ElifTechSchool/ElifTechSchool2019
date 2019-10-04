<template>
  <div class="achievements">
    <h1>All achievements</h1>
    <v-flex xs12 offset-xs8>
      <v-btn class="mx-2" fab dark large @click="AddAchievement" color="green">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-flex>
    <div>
      <AchievementsList />
    </div>
  </div>
</template>

<script>
import AchievementsList from "../../components/Achievements/AchievementsList.vue";

export default {
  components: {
    AchievementsList
  },
  methods: {
    AddAchievement() {
      this.$router.push("/achievements/create");
    }
  }
};
</script>

<style lang="scss">
.achievements {
  text-align: center;
}
</style>
