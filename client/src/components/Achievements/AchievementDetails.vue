<template>
  <v-card>
    <div v-if="!isEditing">
      <div>
        <v-avatar size="300">
          <v-img v-bind:src="achievement.photo_url" alt="achievement photo" />
        </v-avatar>
        <v-card-title>
          {{ achievement.name }}
        </v-card-title>
        <v-card-text>
          <p>Type: {{ achievement.type }}</p>
          <p>Experience: {{ achievement.experience }}</p>
          <p>{{ achievement.description }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="startEdit" color="green">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-card-actions>
      </div>
    </div>
    <div v-else>
      <v-form @submit.prevent="updateAchievement">
        <v-text-field name="name" label="Name" v-model="achievement.name" />
        <v-text-field
          name="description"
          label="Description"
          v-model="achievement.description"
        />
        <v-text-field name="type" label="Type" v-model="achievement.type" />
        <v-text-field
          name="experience"
          label="Experience"
          type="number"
          v-model="achievement.experience"
        />
        <v-text-field
          name="photo_url"
          label="Photo url"
          type="url"
          v-model="achievement.photo_url"
        />
        <v-btn color="green" type="submit">
          Update
        </v-btn>
      </v-form>
    </div>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "achievementDetails",
  data() {
    return {
      isEditing: false,
      id: this.$route.params.id,
      achievement: {}
    };
  },
  methods: {
    ...mapActions(["getAchievementById"]),
    startEdit() {
      this.isEditing = !this.isEditing;
    },
    updateAchievement() {
      this.$store.dispatch("updateAchievement", {
        achievement: this.achievement,
        id: this.achievement.id
      });
      this.startEdit();
    }
  },
  created() {
    this.achievement = this.$store.getters.achievementById(
      this.$route.params.id
    );
  },
  mounted() {
    this.getAchievementById(this.$route.params.id).then(res => {
      this.achievement = res.data.data[0];
    });
  }
};
</script>
