<template>
  <v-container>
    <User v-for="user in users" :userData="user" :key="user.id" />
    <v-btn class="mx-2" fab dark large @click="addUser" color="primary">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <v-pagination
      v-model="page"
      :length="pagesNum"
      @input="nextPage"
    ></v-pagination>
  </v-container>
</template>

<script>
import User from "@/components/Users/User.vue";

export default {
  name: "users",
  data() {
    return {
      page: 1,
    }
  },
  components: {
    User
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    pagesNum() {
      return Math.ceil(this.$store.getters.usersCount/this.$store.getters.pageSize)
    }
  },
  methods: {
    addUser() {
      this.$router.push({
        name: "add_user"
      });
    },
    nextPage(){
      const page = this.page;
      const pageSize = this.$store.getters.pageSize;
      this.$store.dispatch("loadUsers", {page, pageSize});
    }
  },
  mounted() {
    const page = 1;
    const pageSize = this.$store.getters.pageSize;
    this.$store.dispatch("loadUsers", {page, pageSize});
  },

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
