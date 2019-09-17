<template>
  <v-app>
    <Navbar/>
    <router-view/>
    <Snackbar/>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar/Navbar"
import Snackbar from "./components/Snackbar/Snackbar";

export default {
  name: 'App',
  components: {
    Navbar,
    Snackbar
  },
  data: () => ({
    //
  }),
};
</script>
