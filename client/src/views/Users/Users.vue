<template>
  <v-container>
    <User v-for="user in users" :userData="user" :key="user.id" />
    <v-btn class="mx-2" fab dark large @click="addUser" color="primary">
      <v-icon>mdi-plus</v-icon>
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
  components: {
    User
  },
  data() {
    return {
      pageProxy: Number(this.$route.query.page)
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    pagesNum() {
      return this.$store.getters.numOfPages;
    },
    page: {
      get() {
        return this.pageProxy || this.$route.query.page;
      },
      set(val) {
        this.pageProxy = val;
      }
    }
  },
  methods: {
    addUser() {
      this.$router.push({
        name: "add_user"
      });
    },
    nextPage() {
      this.$router.replace({
        name: "users",
        query: { page: this.page, pageSize: this.$store.getters.pageSize }
      });
      const page = this.page;
      const pageSize = this.$store.getters.pageSize;
      this.$store.dispatch("loadUsers", { page, pageSize });
    }
  },
  mounted() {
    this.page = Number(this.$route.query.page) || 1;
    const page = this.$route.query.page || 1;
    const pageSize = this.$store.getters.pageSize;
    this.$store.dispatch("loadUsers", { page, pageSize });
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
