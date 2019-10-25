<template>
  <div>
    <v-btn @click="goBack" icon class="ms-6">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-row align="center" justify="center">
      <v-col cols="4">
        <v-card class="pa-5">
          <div v-if="true">
            <v-form @submit.prevent="updateAchievement" v-model="validate">
              <v-col cols="auto">
                <v-text-field
                  name="name"
                  label="Name"
                  :rules="nameRules"
                  v-model="achievement.name"
                  outlined
                  required
                />
                <v-row>
                  <v-col cols="12" sm="9">
                    <v-text-field
                      name="type"
                      label="Type"
                      :rules="typeRules"
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
                      :rules="experienceRules"
                      v-model="achievement.experience"
                      outlined
                      required
                    />
                  </v-col>
                </v-row>
                <v-file-input
                  name="photo_url"
                  label="Select achievement image"
                  v-model="achievement.photo_url"
                  accept=".jpg, .png"
                  outlined
                ></v-file-input>
                <v-textarea
                  name="description"
                  label="Description"
                  :rules="descriptionRules"
                  v-model="achievement.description"
                  outlined
                  required
                ></v-textarea>
              </v-col>
              <v-btn
                :disabled="!validate"
                color="green"
                type="submit"
                class="ma-3"
                @click="updating"
              >
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
import axios from "axios";
export default {
  name: "editAchievement",
  data() {
    return {
      id: this.$route.params.id,
      achievement: {},
      updating: false,
      validate: true,
      nameRules: [
        v => !!v || "This field is required",
        v =>
          (v && v.length <= 50) || "This field must be less than 50 characters"
      ],
      typeRules: [
        v => !!v || "This field is required",
        v =>
          (v && v.length <= 30) || "This field must be less than 30 characters"
      ],
      experienceRules: [
        v => v >= 0 || "Experience must be greater then or equal to zero"
      ],
      descriptionRules: [
        v => (v && v.length <= 500) || "Field must be less than 500 characters"
      ]
    };
  },
  methods: {
    ...mapActions(["getAchievementById"]),
    updateAchievement() {
      const formData = new FormData();
      Object.entries(this.achievement).forEach(([key, value]) => {
        formData.append(key, value);
      });
      this.updating = true;
      axios
        .put(`achievements/${this.id}`, formData)
        .then(res => {
          this.updating = false;
          this.$router.go(-1);
        })
        .catch(err => {
          this.updating = false;
          alert(err.message);
        });
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.getAchievementById(this.$route.params.id).then(res => {
      this.achievement = res.data.data[0];
    });
  }
};
</script>
