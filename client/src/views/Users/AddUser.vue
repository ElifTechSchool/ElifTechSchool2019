<template>
  <v-row justify="center">
    <v-col sm="10" md="5">
      <v-form @submit.prevent="submitUser" enctype="multipart/form-data">
        <h3>Create new user</h3>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              name="name"
              :rules="nameRules"
              :counter="50"
              label="Name"
              v-model="user.name"
              required
            />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              name="surname"
              :rules="nameRules"
              :counter="50"
              label="Surname"
              v-model="user.surname"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="9" md="9">
            <v-text-field
              type="email"
              :rules="emailRules"
              :counter="100"
              label="E-mail"
              name="email"
              v-model="user.email"
              required
            />
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-text-field
              type="number"
              label="Experience"
              name="experience"
              v-model="user.experience"
            />
          </v-col>
        </v-row>
        <v-text-field
          type="password"
          label="Password"
          name="password"
          :rules="passRules"
          :counter="100"
          v-model="user.password"
          required
        />
        <v-file-input
          label="Select you profile picture"
          name="image_url"
          v-model="user.image_url"
          accept=".jpg, .png"
        ></v-file-input>
        <v-textarea
          label="Description"
          name="description"
          :rules="textareaRules"
          :counter="500"
          v-model="user.description"
        ></v-textarea>
        <div class="btn-wrapper">
          <v-btn to="/users" class="goBack" color="grey lighten-2">
            Go back
          </v-btn>
          <v-btn type="submit" color="primary"> Submit </v-btn>
        </div>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      nameRules: [
        v => !!v || "This field is required",
        v => (v && v.length <= 50) || "This field must be less than 50 characters"
      ],
      passRules: [
        v => !!v || "This field is required",
        v => (v && v.length <= 50) || "This field must be less than 50 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => (v && v.length <= 100) || "Field must be less than 100 characters",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      textareaRules: [
        v => (v && v.length <= 500) || "Field must be less than 500 characters",
      ]
    };
  },
  methods: {
    async submitUser() {
      const formData = new FormData();
      this.user.experience < 0
        ? (this.user.experience = 0)
        : this.user.experience;
      Object.entries(this.user).forEach(([key, value]) => {
          formData.append(key, value);
      });
      this.$store.dispatch("submitUser", formData);
      this.user = {};
      this.$router.push("users");
    }
  }
};
</script>
<style lang="scss" scoped>
.btn-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.goBack {
  margin-right: 20px;
}
</style>
