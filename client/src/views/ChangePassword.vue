<template>
  <v-container>
    <ChangePass></ChangePass>
  </v-container>
</template>
<script>
import ChangePass from "@/components/Users/ChangePass.vue";

export default {
  name: "changePassword",
  components: {
    ChangePass
  },
  data() {
    return {
      data: this.$route.query.token
    };
  },
  mounted() {}
};
</script>
