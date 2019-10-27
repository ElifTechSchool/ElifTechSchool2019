<template>
  <div>
    <v-btn to="/achievements" icon class="ms-6">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-row justify="center">
      <v-col sm="8">
        <v-form @submit.prevent="addAchievement" v-model="validate" ref="form">
          <h1>Create new achievement</h1>
          <v-text-field
            name="name"
            label="Name"
            :rules="nameRules"
            v-model="achievement.name"
            :counter="50"
            outlined
            required
          />
          <v-row>
            <v-col cols="12" sm="8">
              <v-text-field
                name="type"
                label="Type"
                :rules="typeRules"
                autocomplete="type"
                :counter="30"
                v-model="achievement.type"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                name="experience"
                label="Experience"
                :rules="experienceRules"
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
          <v-textarea
            name="description"
            label="Description"
            :rules="descriptionRules"
            :counter="500"
            v-model="achievement.description"
            outlined
            required
          ></v-textarea>
          <v-btn type="submit" color="green" :disabled="!validate"> Create </v-btn>
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
      achievement: {
        photo_url: undefined
      },
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
        v => /^[0-9]{1,}$/.test(v) || "Experience must be a positive number",
      ],
      descriptionRules: [
        v => !!v || "This field is required",
        v => (v && v.length <= 500) || "Field must be less than 500 characters"
      ]
    };
  },
  methods: {
    addAchievement() {
      const formData = new FormData();
      this.achievement.photo_url ? this.achievement.photo_url 
        : this.achievement.photo_url = "https://res.cloudinary.com/dphouqbtl/image/upload/v1572027418/images/nmtbsun9rslbesw2ggbz.jpg"
        console.log("this.achievement.photo_url", this.achievement.photo_url)
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
