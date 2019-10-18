<template>
  <v-container>
    <v-row class="wrapme" justify="center">
      <v-col md="5">
        <v-text-field
          class="search-bar"
          type="text"
          label="Find user"
          name="search"
          solo rounded clearable
          v-model="searchProxy"
          prepend-inner-icon="search"
          @click:prepend-inner="searchUser"
          v-on:keyup.enter="searchUser"
        />
      </v-col>
    </v-row>
    
    <User v-for="user in users" :userData="user" :key="user.id" />
    <v-btn class="mx-2" fab dark large to="add_user" color="primary">
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
        return Number(this.$route.query.page) || this.pageProxy;
      },
      set(val) {
        this.pageProxy = val;
      }
    }
  },
  methods: {
    nextPage(page, search) {
      if (search === ''){
        this.$router.replace({
          name: "users",
          query: { page: page || this.page, pageSize: this.$store.getters.pageSize}
        });
      } 
      else {
        this.$router.replace({
          name: "users",
          query: { page: page || this.page, pageSize: this.$store.getters.pageSize, search: this.search }
        });
      }
      this.$store.dispatch("loadUsers", { page: page || this.page, pageSize: this.$store.getters.pageSize, search: this.search });
    },
    searchUser() {
        this.nextPage(1, this.searchProxy)
    }
  },
  mounted() {
    this.pageProxy = Number(this.$route.query.page) || 1;
    this.page = Number(this.$route.query.page) || 1;
    this.$store.dispatch("loadUsers", { page: Number(this.$route.query.page) || 1, 
                                        pageSize:this.$route.query.pageSize || this.$store.getters.pageSize, 
                                        search: this.$route.query.search 
                                        });
  }
};
</script>

<style lang="scss" scoped>
.mx-2 {
  position: fixed;
  bottom: 50px;
  right: 80px;
}
.wrapme {
  margin:auto;
}

.search-bar {
  width: 100%;
}
</style>
