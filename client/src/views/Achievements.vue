<template>
  <div class="achievements">
    <h1>All achievements</h1>
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
  }
};
</script>
