<template>
  <v-row justify="center">
    <v-col sm="10" md="7" lg="5">
      <v-form
        @submit.prevent="submitUser"
        enctype="multipart/form-data"
        v-model="valid"
      >
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
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              type="email"
              :rules="emailRules"
              :counter="100"
              label="E-mail"
              name="email"
              v-model="user.email"
              autocomplete="email"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="8" md="8">
            <v-text-field
              label="Password"
              name="password"
              :rules="passRules"
              :counter="100"
              v-model="user.password"
              autocomplete="new-password"
              :append-icon="show ? 'visibility' : 'visibility_off'"
              :type="show ? 'text' : 'password'"
              @click:append="show = !show"
              required
            />
          </v-col>
          <v-col cols="12" sm="2" md="2">
            <v-text-field
              type="number"
              :rules="expRules"
              label="Experience"
              name="experience"
              v-model="user.experience"
            />
          </v-col>
        </v-row>
        <v-file-input
          label="Select you profile picture"
          name="image_url"
          v-model="user.image_url"
          accept=".jpg, .png"
        ></v-file-input>
        <v-radio-group flex-direction: row>
          <label>
            <input
              type="radio"
              v-model="defaultImg"
              name="test"
              :value="'defaultUserIcon.jpg'"
              checked
            />
            <img
              src="https://res.cloudinary.com/dphouqbtl/image/upload/v1570697061/images/defaultUserIcon.jpg"
            />
          </label>
          <label>
            <input
              type="radio"
              v-model="defaultImg"
              name="test"
              :value="'defaultUserIcon2.jpg'"
            />
            <img
              src="https://res.cloudinary.com/dphouqbtl/image/upload/v1570697061/images/defaultUserIcon2.jpg"
            />
          </label>
        </v-radio-group>
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
          <v-btn type="submit" color="primary" :disabled="!valid">
            Submit
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
      user: {
        image_url: undefined,
        experience: 0,
        userRole: 3,
      },
      roles: [
        { text: "user", value: 3 },
        { text: "moderator", value: 2 },
        { text: "administrator", value: 1 }
      ],
      defaultImg: "defaultUserIcon.jpg",
      valid: true,
      nameRules: [
        v => !!v || "This field is required",
        v =>
          (v && v.length <= 50) || "This field must be less than 50 characters"
      ],
      passRules: [
        v => !!v || "This field is required",
        v =>
          (v && v.length <= 50) || "This field must be less than 50 characters",
        v =>
          /.{6,}$/.test(v) ||
          "Password is too short. Must have at least 6 characters",
        v =>
          /^(?=.*?[A-Z])(?=.*?[a-z])/.test(v) ||
          "Password must have at least one upper case and one lower case English letter to be valid",
        v => /(?=.*?[0-9])/.test(v) || "Password must have at least one digit"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => (v && v.length <= 100) || "Field must be less than 100 characters",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      expRules: [
        v => v >= 0 || "Experience must be greater then or equal to zero"
      ],
      textareaRules: [
        v => (v && v.length <= 500) || "Field must be less than 500 characters"
      ],
      show: false,
    };
  },
  methods: {
    submitUser() {
      const formData = new FormData();
      debugger
      this.user.experience < 0
        ? (this.user.experience = 0)
        : this.user.experience;
      this.user.image_url
        ? this.user.image_url
        : (this.user.image_url =
            "https://res.cloudinary.com/dphouqbtl/image/upload/v1570697061/images/" +
            this.defaultImg);
      Object.entries(this.user).forEach(([key, value]) => {
        formData.append(key, value);
      });
      this.$store.dispatch("submitUser", formData);
      this.$store.dispatch("updateUserRole", {
        userRole: this.userRole,
        id: this.user.id,
      });
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
[type="radio"] {
  appearance: none;
}

[type="radio"] + img {
  cursor: pointer;
  width: 70px;
  margin-left: 20px;
}

[type="radio"]:checked + img {
  outline: 2.5px solid rgb(54, 59, 143);
}
</style>
