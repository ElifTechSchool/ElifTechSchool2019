<template>
  <div>
    <form @submit.prevent="submitUser">
      <h3>Create new user</h3>
      <label>
        <input type="text" name="name" v-model="user.name" />
        <span>Name</span>
      </label>
      <label>
        <input type="text" name="surname" v-model="user.surname" />
        <span>Surname</span>
      </label>
      <label>
        <input type="email" name="email" v-model="user.email" />
        <span>Email</span>
      </label>
      <label>
        <input type="password" name="password" v-model="user.password" />
        <span>Password</span>
      </label>
      <label>
        <input type="url" name="img_url" v-model="user.img_url" />
        <span>Image url</span>
      </label>
      <label>
        <input type="text" name="description" v-model="user.description" />
        <span>Description</span>
      </label>
      <input type="submit" class="waves-effect waves-light btn" />
    </form>
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
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
