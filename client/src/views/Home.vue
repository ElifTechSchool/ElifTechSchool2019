<template>
  <v-container>
    <Login v-if="!isAuthenticated"></Login>
    <h1 v-else>This is home page</h1>
  </v-container>
</template>

<script>
import Login from "@/components/Login.vue";
import Me from "@/components/Me.vue";
import {
    mapGetters
  } from "vuex";
export default {
  components: {
    Login,
    Me
  },
  computed: {
    ...mapGetters(["isAuthenticated"])
  },
};
</script>
<style lang="scss"></style>
