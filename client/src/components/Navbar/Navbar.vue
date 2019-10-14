<template lang="html">
  <div>
    <v-toolbar class="toolbar">
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer"
          >R{!}P
        </router-link>
      </v-toolbar-title>

      <!-- <div class="flex-grow-1"></div> -->

      <v-toolbar-items>
        <v-btn text to="/about">
          About
        </v-btn>
        <v-btn text to="/users">
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
  margin-bottom: 1.5rem;
}
</style>
