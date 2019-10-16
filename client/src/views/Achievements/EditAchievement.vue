<template>
  <div>
    <v-btn to="/achievements" icon class="ms-6">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-row align="center" justify="center">
      <v-col cols="4">
        <v-card class="pa-5">
          <div v-if="true">
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
                    <v-text-field
                      name="type"
                      label="Type"
                      v-model="achievement.type"
                      outlined
                      required
                    ></v-text-field>
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
                
                  <v-file-input
                    name="photo_url"
                    label="achievement.photo_url"
                    v-model="achievement.photo_url"
                    accept=".jpg, .png"
                    outlined
                  ></v-file-input>
                <v-text-field
                  name="description"
                  label="Description"
                  v-model="achievement.description"
                  outlined
                />
              </v-col>
              <v-btn :disabled="updating" color="green" type="submit" class="ma-3">
                <span v-if="updating">Updating...</span>
                <span v-if="!updating">Update</span>
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
import axios from 'axios';
export default {
  name: "editAchievement",
  data() {
    return {
      id: this.$route.params.id,
      achievement: {},
      updating: false,
    };
  },
  methods: {
    ...mapActions(["getAchievementById"]),
    updateAchievement() {
      const formData = new FormData();
      Object.entries(this.achievement).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const achievementsURL = "http://localhost:3000/api/v1/achievements/";
      this.updating = true;
      axios.put(achievementsURL + this.achievement.id, formData)
        .then(res => {
            this.updating = false;
          this.$router.go(-1)
        })
        .catch(err => {
          this.updating = false;
          alert(err.message)
        })
    }
  },
  mounted() {
    this.getAchievementById(this.$route.params.id).then(res => {
      this.achievement = res.data.data[0]
      console.log(this.achievement)
    });
  },
};
</script>
