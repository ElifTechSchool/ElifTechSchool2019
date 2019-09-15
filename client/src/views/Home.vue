<template>
  <div>
      <v-toolbar>
        <v-toolbar-title>R{!}P</v-toolbar-title>
  
        <div class="flex-grow-1"></div>
  
        <v-toolbar-items>
          <v-btn text>Home</v-btn>
          <v-btn text>About</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <RanksList/>
    </div>
</template>

<script>
import RanksList from "../components/RanksList/RanksList"
export default {
  components: {
    RanksList
  },
};
</script>
