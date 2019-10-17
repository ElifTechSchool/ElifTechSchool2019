<template>
  <v-container>
    <Login v-if="this.$store.getters.showLogin"></Login>
    <Me v-else></Me>
  </v-container>
</template>

<script>
import Login from '@/components/Login.vue';
import Me from '@/components/Me.vue';

export default {
  components: { 
    Login,
    Me,
  }
};
</script>
<style lang="scss"></style>
