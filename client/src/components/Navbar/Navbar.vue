<template lang="html">
  <div>
    <v-toolbar class="toolbar">
      <v-toolbar-title>R{!}P</v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-toolbar-items>
        <v-btn text to="/">
          Home
        </v-btn>
        <v-btn text to="/about">
          About
        </v-btn>
        <v-btn text to="/users">
          User List
        </v-btn>
        <v-btn text to="/add_user">
          Add user
        </v-btn>
        <v-btn text to="/competitions">
          Competitions
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script lang="js">
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

  },
  computed: {

  }
}
</script>

<style scoped lang="scss">
.toolbar {
  margin-bottom: 2.5rem;
}
</style>
