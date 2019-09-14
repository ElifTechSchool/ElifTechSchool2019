<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <RanksList/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import RanksList from "@/components/RanksList/RanksList.vue"

export default {
  name: "home",
  components: {
    RanksList
  }
};
</script>
