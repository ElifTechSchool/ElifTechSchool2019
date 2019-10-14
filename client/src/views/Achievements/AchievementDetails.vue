<template>
  <div>
    <v-btn to="/achievements" icon class="ms-6">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-row align="center" justify="center">
      <v-col cols="4">
        <v-card class="pa-5">
          <div v-if="!isEditing">
            <v-row>
              <v-col cols="12" sm="5">
                <v-avatar size="200">
                  <v-img
                    v-bind:src="achievement.photo_url"
                    alt="achievement image"
                  />
                </v-avatar>
              </v-col>
              <v-col cols="12" sm="7">
                <v-card-title>
                  {{ achievement.name }}
                </v-card-title>
                <v-spacer></v-spacer>
                <v-card-text>
                  <p><b>Type:</b> {{ achievement.type }}</p>
                  <p><b>Experience:</b> {{ achievement.experience }}</p>
                  <p><b> Description:</b> {{ achievement.description }}</p>
                </v-card-text>
              </v-col>
              <v-card-actions>
                <v-btn @click="startEdit" color="green" absolute right>
                  <v-icon>mdi-pencil</v-icon>
                    Edit
                </v-btn>
              </v-card-actions>
            </v-row>
          </div>
          <div v-if="isEditing">
            <v-form @submit.prevent="updateAchievement">
              <v-col cols="auto">
                <v-text-field
                  name="name"
                  label="Name"
                  v-model="achievement.name"
                  outlined
                />
                <v-row>
                  <v-col cols="12" sm="9">
                    <v-select
                      name="type"
                      label="Type"
                      :items="['one', 'two', 'three', 'four']"
                      v-model="achievement.type"
                      outlined
                      required
                    ></v-select>
                    </v-col>
                      <v-col cols="12" sm="3">
                    <v-text-field
                      name="experience"
                      label="Experience"
                      type="number"
                      v-model="achievement.experience"
                      outlined
                      required
                    />
                  </v-col>
                </v-row>
                <v-text-field
                  name="photo_url"
                  label="Photo url"
                  type="url"
                  v-model="achievement.photo_url"
                  outlined
                />
                <v-text-field
                  name="description"
                  label="Description"
                  v-model="achievement.description"
                  outlined
                />
              </v-col>
              <v-btn color="green" type="submit" class="ma-3">
                Update
              </v-btn>
            </v-form>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
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
  mounted() {
    this.getAchievementById(this.$route.params.id).then(res => {
      this.achievement = res.data.data[0];
    });
  }
};
</script>
