<template>
  <v-row>
    <AchievementsList />
    <v-btn class="mx-2" fab dark large @click="AddAchievement" color="primary">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </v-row>
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
.mx-2 {
  position: fixed;
  bottom: 50px;
  right: 80px;
}
</style>
