<template>
  <div class="users">
    <User v-for="user in users" :userData="user" :key="user.id" />
    <v-btn class="mx-2" fab dark large @click="addUser" color="primary">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
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
    addUser() {
      this.$router.push({
        name: "add_user",
      });
    }
  },
  mounted() {
    this.$store.dispatch("loadUsers");
  }
};
</script>

<style lang="scss" scoped>
h1,
.v-btn {
  margin-left: 30px;
}
.mx-2 {
  position: fixed;
  bottom: 50px;
  right: 80px;
}
</style>
