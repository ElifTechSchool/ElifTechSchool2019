<template>
  <div class="home">
    <RanksList/>
  </div>
</template>

<script>
// @ is an alias to /src
import RanksList from "@/components/RanksList/RanksList.vue"

export default {
  name: "home",
  components: {
    RanksList
  }
};
</script>
