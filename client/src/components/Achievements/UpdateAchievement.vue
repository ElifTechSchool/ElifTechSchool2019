<template>
  <div class="achievement">
    <v-row justify="center" v-if="!isEditing">
      <img v-bind:src="achievement.photo_url"/>
      <div class="name">
        {{ achievement.name }} 
      </div>
      <div class="achievementDetail">
        <p>{{ achievement.description }}</p>
        <p><b>Type:</b>  {{ achievement.type }}</p>
        <p><b>Experience:</b>  {{ achievement.experience }}</p>
      </div>
      <v-btn
        color="orange lighten-2"
        class="mt-12"
        @click="startEditing"
      >
        Edit
      </v-btn>
    </v-row>

    <v-row justify="center" class="updateAchievement" v-else>
      <v-form @submit.prevent="updateAchievement">
        <v-text-field name="name" label="Name" v-model="achievement.name"/>
        <v-text-field name="description" label="Description" v-model="achievement.description"/>
        <v-text-field name="type" label="Type" v-model="achievement.type"/>
        <v-text-field name="experience" label="Experience" type="number" v-model="achievement.experience"/>
        <v-text-field name="photo_url" label="Photo url" type="url" v-model="achievement.photo_url"/>
      <v-btn
        color="orange lighten-2"
        class="mt-12"
        type="submit"
      >
        Update achievement
      </v-btn>
      </v-form>
    </v-row>

  </div>
</template>

<script>
export default {
  name: "achievementDetail",
  data() {
      return {
        isEditing: false,
      }
  },
  methods: {
     startEditing() {
      this.isEditing = !this.isEditing;
    },
    updateAchievement() {
      console.log(this.achievement);
      this.$store.dispatch("updateAchievement", this.achievement);
      this.startEditing();
    }
  },
  created() {
    this.achievement = this.$store.getters.achievementById(this.$route.params.id)
  },
};