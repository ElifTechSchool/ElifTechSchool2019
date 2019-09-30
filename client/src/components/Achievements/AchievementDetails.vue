<template>
  <v-card class="justify-center">
    <v-list-item-avatar size="100">
      <img v-bind:src="achievement.photo_url"/>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-card-title>
          {{ achievement.name }} 
      </v-card-title>
      <v-card-text>
          <p>{{ achievement.description }}</p>
          <p><b>Type:</b>  {{ achievement.type }}</p>
          <p><b>Experience:</b>  {{ achievement.experience }} </p>
      </v-card-text>
    </v-list-item-content>
    <uptadeAchievement/>
  </v-card>
</template>

<script>
import uptadeAchievement from "./UpdateAchievement"
import {mapGetters, mapActions} from "vuex"

export default {
  components: {
     uptadeAchievement
    },
  name: "achievementDetails",
  methods: mapActions(["getAchievementById"]),
  data() {
    return {
      title: "achievementDetails",
      id: this.$route.params.id,
      achievement: {}
    }
  },
  created() {
    this.achievement = this.$store.getters.achievementById(this.$route.params.id)
  },
  mounted() {
    this.getAchievementById(this.$route.params.id)
    console.log(typeof this.$route.params.id);
  }
}
</script>
