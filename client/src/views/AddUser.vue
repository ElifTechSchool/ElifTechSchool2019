<template>
  <div class="form-wrapper">
    <v-form @submit.prevent="submitUser">
      <h3>Create new user</h3>
      <v-text-field name="name" label="Name" v-model="user.name" required />
      <v-text-field
        name="surname"
        label="Surname"
        v-model="user.surname"
        required
      />
      <v-text-field
        type="email"
        label="E-mail"
        name="email"
        v-model="user.email"
        required
      />
      <v-text-field
        type="password"
        label="Password"
        name="password"
        v-model="user.password"
        required
      />
      <v-text-field
        type="url"
        label="Image url"
        name="img_url"
        v-model="user.image_url"
      />
      <v-text-field
        type="text"
        label="Description"
        name="description"
        v-model="user.description"
      />
      <v-text-field
        type="text"
        label="Experience"
        name="experience"
        v-model="user.experience"
      />
      <div class="btn-wrapper">
        <v-btn type="submit" color="primary"> Submit </v-btn>
        <v-btn
            to="/users"
            class="goBack"
            color="grey lighten-2"
          >
            Go back
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {}
    };
  },
  methods: {
    submitUser() {
      console.log(this.user);
      this.$store.dispatch("submitUser", this.user);
      this.user = {};
    },
  }
};
</script>
<style lang="scss" scoped>
.v-form {
  width: 50%;
  margin: 100px auto;
}
.btn-wrapper {
  display: flex;
  justify-content: flex-end;
}
.goBack {
  margin-left: 20px;
}
</style>
