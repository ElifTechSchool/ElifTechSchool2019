<template lang="html">
  <v-snackbar v-model="show" :color="color" :right="true">
    {{ message }}
  </v-snackbar>
</template>

<script lang="js">
import { mapGetters } from "vuex";

  export default  {
    name: 'snackbar',
    props: [],
    mounted () {
      this.$store.watch(state => this.getSnackText, () => {
        if(this.getSnackText !== "") {
          this.show = true
          this.color = this.getSnackColor
          this.message = this.getSnackText
          this.$store.commit("setSnack", { response: "", color: "" })
        }
      })
    },
    data() {
      return {
        show: false,
        message: "",
        color: ""
      }
    },
    computed: {
     ...mapGetters(['getSnackText', 'getSnackColor'])
    }
}
</script>
