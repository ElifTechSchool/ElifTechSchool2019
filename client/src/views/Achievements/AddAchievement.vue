<template>
  <div>
    <v-btn to="/achievements" icon class="ms-6">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-row justify="center">
      <v-col sm="8">
        <v-form @submit.prevent="addAchievement" ref="form">
          <h1>Create new achievement</h1>
          <v-text-field
            name="name"
            label="Name"
            v-model="achievement.name"
            outlined
            required
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
            label="Select achievement image"
            v-model="achievement.photo_url"
            outlined
            accept=".jpg, .png"
          >
          </v-file-input>
          <v-text-field
            name="description"
            label="Description"
            v-model="achievement.description"
            outlined
            required
          />
          <v-btn type="submit" color="green"> Create </v-btn>
          <v-btn color="error" class="ma-5" @click="reset">Reset Form</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      achievement: {},
      errors: []
    };
  },
  methods: {
    addAchievement() {
      const formData = new FormData();
      Object.entries(this.achievement).forEach(([key, value]) => {
        formData.append(key, value);
      });
      this.$store.dispatch("addAchievement", formData);
      this.achievement = {};
      this.$router.push({ name: "achievements" });
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style scoped lang="scss">
.v-form {
  width: 50%;
  margin: 100px auto;

  h1 {
    margin: 50px;
  }
}
</style>
