<template>
  <div>
    <v-row>
      <v-btn @click="startEditing" color="green">
        Edit
      </v-btn>
    </v-row>
    <v-row class="updateAchievement" v-if="isEditing">>
      <v-form @submit.prevent="updateAchievement">
        <v-text-field name="name" label="Name" v-model="achievement.name"/>
        <v-text-field name="description" label="Description" v-model="achievement.description"/>
        <v-text-field name="type" label="Type" v-model="achievement.type"/>
        <v-text-field name="experience" label="Experience" type="number" v-model="achievement.experience"/>
        <v-text-field name="photo_url" label="Photo url" type="url" v-model="achievement.photo_url"/>
      <v-btn color="green" type="submit">
        Update achievement
      </v-btn>
      </v-form>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "updateAchievement",
  data() {
      return {
        isEditing: false,
        achievement: {}
      }
  },
  methods: {
    startEditing() {
      this.isEditing = !this.isEditing;
    },
    updateAchievement() {
      this.$store.dispatch("updateAchievement", this.achievement);
      this.startEditing();
    }
  }
};