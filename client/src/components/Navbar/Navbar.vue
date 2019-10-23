<template lang="html">
  <div>
    <v-toolbar class="toolbar">
      <v-toolbar-title>
        <router-link class="logo" to="/" tag="span" style="cursor: pointer">R{!}P
        </router-link>

      </v-toolbar-title>
      <v-toolbar-items>
        <v-btn text to="/about">
          About
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <!-- <div class="flex-grow-1"></div> -->

      <v-toolbar-items v-if="isAuthenticated">
        <v-btn text to="/about">
          About
        </v-btn>
        <v-btn text to="/users" @click="refreshUsers">
          Users
        </v-btn>
        <v-btn text to="/competitions">
          Competitions
        </v-btn>
        <v-btn text to="/achievements">
          Achievements
        </v-btn>
        <v-btn text to="/ranks">
          Ranks
        </v-btn>
        <v-btn text @click="userLogout">
          <i class="material-icons">
            exit_to_app
          </i>
          Logout
        </v-btn>
      </v-toolbar-items>

    </v-toolbar>
  </div>
</template>

<script lang="js">
  import {
    mapGetters
  } from "vuex";
  export default {
    name: 'navbar',
    props: [],
    mounted() {

    },
    data() {
      return {

      }
    },
    methods: {
      refreshUsers() {
        this.$router.replace({
          name: "users",
          query: {
            page: 1,
            pageSize: this.$store.getters.pageSize
          }
        });
        this.$store.commit("setSearch", '');
        this.$store.dispatch("loadUsers", {
          page: 1,
          pageSize: this.$route.query.pageSize || this.$store.getters.pageSize
        });
      },
      userLogout() {
        this.$store.dispatch("logOut");
        this.$router.push("/");
      },


    },
    computed: {
      ...mapGetters(["isAuthenticated"])
    }
  }

</script>

<style scoped lang="scss">
  .toolbar {
    margin-bottom: 1.5rem;
  }
  .logo{
    margin:0 15px;
  }
</style>
