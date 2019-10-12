<template>
  <v-container>
    <v-text-field
      type="text"
      label="Find user"
      name="search"
      v-model="searchProxy"
      append-icon="search"
      @click:append="searchUser"
      v-on:keyup.enter="searchUser"
    />
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
      pageProxy: Number(this.$route.query.page),
      searchProxy: this.$route.query.search,
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    pagesNum() {
      return this.$store.getters.numOfPages;
    },
    search: {
      get() {
        return this.searchProxy || this.$route.query.search;
      },
      set(val) {
        this.searchProxy = val;
      }
    },
    page: {
      get() {
        return this.$route.query.page || this.pageProxy;
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
    nextPage(p) {
      this.$router.replace({
        name: "users",
        query: { page: p || this.page, pageSize: this.$store.getters.pageSize, search: this.search }
      });
      const page = p || this.page;
      const pageSize = this.$store.getters.pageSize;
      const search = this.search;
      this.$store.dispatch("loadUsers", { page, pageSize, search });
    },
    searchUser() {
      if(this.search){
        this.nextPage(1)
      }
      this.searchProxy = '';
    }
  },
  mounted() {
    this.pageProxy = Number(this.$route.query.page) || 1;
    this.page = Number(this.$route.query.page) || 1;
    const page = this.$route.query.page || 1;
    const pageSize = this.$route.query.pageSize || this.$store.getters.pageSize;
    const search = this.$route.query.search;
    this.$store.dispatch("loadUsers", { page, pageSize, search });
  }
};
</script>

<style lang="scss" scoped>
.mx-2 {
  position: fixed;
  bottom: 50px;
  right: 80px;
}
.v-input{
  position: absolute;
  top: 5px;
  right: 30px;
}
</style>
