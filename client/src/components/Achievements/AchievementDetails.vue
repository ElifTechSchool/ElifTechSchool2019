<template>
  <v-card>
    <div class="achievement-details">
            <img v-bind:src="achievement.photo_url"/>
            <div class="name">
                {{ achievement.name }} 
            </div>
            <div class="achievement-info">
                <p>{{ achievement.description }}</p>
                <p><b>Type:</b>  {{ achievement.type }}</p>
                <p><b>Experience:</b>  {{ achievement.experience }}</p>
            </div>
        </div>
    </v-card>
</template>

<script>
export default {
  name: "achievementDetails",
  data() {
    return {
      title: "achievementDetails",
      id: this.$route.params.id,
      achievement: {}
    }
  },
  created() {
    this.achievement = this.$store.getters.achievementById(this.$route.params.id)
  }
}
</script>
