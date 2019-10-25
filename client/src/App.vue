<template>
  <v-app>
    <Navbar />
    <router-view />
    <Snackbar />
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar/Navbar";
import Snackbar from "./components/Snackbar/Snackbar";

export default {
  name: "App",
  components: {
    Navbar,
    Snackbar
  },
  data: () => ({
    //
  }),
  async mounted() {
    await this.$store.dispatch("authUser", this.$store.getters.token);
    this.$store.dispatch("getMeRole", this.$store.getters.userMe.user.id);
  }
};
</script>
