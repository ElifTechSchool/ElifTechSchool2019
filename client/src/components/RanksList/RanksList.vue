<template lang="html">
  <div>
    <div v-for="rank in allRanks" :key="rank.id">
      <RanksItem :rank="rank" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RanksItem from "../RanksItem/RanksItem";

export default {
  components: {
    RanksItem
  },
  name: "ranks-list",
  props: [],
  mounted() {
    this.$store.dispatch("getAllRanks");
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapGetters(["allRanks"])
  }
};
</script>

<style scoped lang="scss"></style>
