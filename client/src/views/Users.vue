<template>
  <div class="users">
    <h1>Users</h1>
    <button @click="loadUsers" class="waves-effect waves-light btn">
      GET USERS
    </button>
    <br />
    <form @submit="submitUser">
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
      <button
        type="button"
        @click="submitUser"
        class="waves-effect waves-light btn"
      >
        SUBMIT
      </button>
    </form>
    <User v-for="(user, index) in users" :userData="user" :key="index" />
  </div>
</template>

<script>
import User from "@/components/User.vue";

export default {
  name: "Users",
  components: {
    User
  },
  data() {
    return {
      user: {
        name: "",
        surname: "",
        email: "",
        password: "",
        img_url: "",
        description: ""
      }
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
    }
  },
  methods: {
    loadUsers() {
      this.$store.dispatch("loadUsers");
    },
    submitUser() {
      this.$store.dispatch("submitUser", this.user);
    }
  },
  created() {
    this.$store.dispatch("loadUsers");
  }
};
</script>

<style lang="scss">
form {
  display: flex;
  flex-direction: column;
  width: 25%;
  margin: 30px auto 100px auto;

  button {
    margin: auto;
    margin-top: 30px;
    width: 50%;
  }
}
</style>
