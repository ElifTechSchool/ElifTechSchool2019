<template>
  <v-container>
    <v-row class="wrapme" justify="center">
      <v-col md="5">
        <v-text-field
          class="search-bar"
          type="text"
          label="Find user"
          name="search"
          solo
          rounded
          clearable
          v-model="searchVal"
          prepend-inner-icon="search"
          @click:prepend-inner="searchUser"
          v-on:keyup.enter="searchUser"
        />
      </v-col>
    </v-row>

    <User v-for="user in users" :userData="user" :key="user.id" />
    <v-btn
      class="mx-2"
      fab
      dark
      large
      to="add_user"
      color="primary"
      v-if="$store.getters.meRole < 3"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-pagination
      v-model="page"
      :length="numOfPages"
      @input="nextPage"
    ></v-pagination>
  </v-container>
</template>

<script>
import User from "@/components/Users/User.vue";

import { mapGetters } from "vuex";

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
    ...mapGetters(["users", "numOfPages", "search", "pageSize"]),
    searchVal: {
      get() {
        return this.search;
      },
      set(val) {
        this.$store.commit("setSearch", val);
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
    nextPage(page) {
      if (this.searchVal === "") {
        this.$router.replace({
          name: "users",
          query: {
            page: page || this.page,
            pageSize: this.$store.getters.pageSize
          }
        });
      } else {
        this.$router.replace({
          name: "users",
          query: {
            page: page || this.page,
            pageSize: this.$store.getters.pageSize,
            search: this.searchVal
          }
        });
      }
      this.$store.dispatch("loadUsers", {
        page: page || this.page,
        pageSize: this.$store.getters.pageSize,
        search: this.searchVal
      });
    },
    searchUser() {
      this.nextPage(1);
    }
  },
  mounted() {
    this.pageProxy = Number(this.$route.query.page) || 1;
    this.page = Number(this.$route.query.page) || 1;
    this.$store.dispatch("loadUsers", {
      page: Number(this.$route.query.page) || 1,
      pageSize: this.$route.query.pageSize || this.$store.getters.pageSize,
      search: this.$route.query.search
    });
    this.$store.dispatch("getMeRole", this.$store.getters.userMe.user.id);
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
  margin: auto;
}

.search-bar {
  width: 100%;
}
</style>
