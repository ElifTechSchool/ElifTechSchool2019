<template>
  <v-app>
    <Home/>
    <Snackbar/>
  </v-app>
</template>

<script>
import Home from "./views/Home";
import Snackbar from "./components/Snackbar/Snackbar";

export default {
  name: 'App',
  components: {
    Home,
    Snackbar
  },
  data: () => ({
    //
  }),
};
</script>
