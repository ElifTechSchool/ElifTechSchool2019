<template>
  <div class="users">
    <h1>Users</h1>
    <button @click="loadUsers" class="waves-effect waves-light btn">
      GET USERS
    </button>
    <br />
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
  computed: {
    users() {
      return this.$store.getters.users;
    }
  },
  methods: {
    loadUsers() {
      this.$store.dispatch("loadUsers");
    },
  },
  mounted() {
    this.$store.dispatch("loadUsers");
  }
};
</script>

<style lang="scss">

</style>
