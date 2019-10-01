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
              :counter="10"
              label="Name"
              v-model="user.name"
              required
            />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              name="surname"
              :rules="nameRules"
              :counter="10"
              label="Surname"
              v-model="user.surname"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="10" md="10">
            <v-text-field
              type="email"
              :rules="emailRules"
              :counter="50"
              label="E-mail"
              name="email"
              v-model="user.email"
              required
            />
          </v-col>
          <v-col cols="12" sm="2" md="2">
            <v-text-field
              type="text"
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
          v-model="user.password"
          required
        />
        <v-file-input
          label="Secelt you profile picture"
          name="img_url"
          v-model="user.image_url"
          accept=".jpg, .png"
        ></v-file-input>
        <v-textarea
          label="Description"
          name="description"
          v-model="user.description"
        ></v-textarea>
        <div class="btn-wrapper">
          <v-btn type="submit" color="primary"> Submit </v-btn>
          <v-btn to="/users" class="goBack" color="grey lighten-2">
            Go back
          </v-btn>
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
        v => v.length <= 10 || "Field must be less than 10 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    async submitUser() {
      const formData = new FormData();
      formData.append("image_url", this.user.image_url);
      this.user.experience < 0
        ? (this.user.experience = 0)
        : this.user.experience;
      formData.append("user", JSON.stringify(this.user));
      this.$store.dispatch("submitUser", formData);
      this.user = {};
    }
  }
};
</script>
<style lang="scss" scoped>
.btn-wrapper {
  display: flex;
  justify-content: flex-end;
}
.goBack {
  margin-left: 20px;
}
</style>
