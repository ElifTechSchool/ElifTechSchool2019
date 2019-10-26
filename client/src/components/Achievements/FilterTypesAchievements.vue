<template>
  <v-row justify="center" v-if="showFiters && types">
    <v-checkbox
      v-for="(type, index) in types"
      :key="`type-${index}`"
      v-model="selected"
      :label="type"
      :value="type"
      @change="handleChange($event)"
    >
    </v-checkbox>
  </v-row>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      showFiters: false,
      types: null
    };
  },
  methods: {
    handleChange() {
      this.$emit("filter", this.selected);
    },
    typesAchievements() {
      const achievementsURL = "http://localhost:3000/api/v1/achievements/types";
      this.showFiters = false;
      axios
        .get(achievementsURL)
        .then(res => {
          this.showFiters = true;
          this.types = res.data.data;
        })
        .catch(err => console.log(err));
    }
  },
  mounted() {
    this.typesAchievements();
  },
  computed: {
    ...mapGetters(["getTypes"]),
    selected: {
      get() {
        return this.getTypes || [];
      },
      set(val) {
        this.$store.commit("setTypes", val);
      }
    },
  }
};
</script>

<style lang="scss">
v-checkbox {
  display: inline-block;
}
</style>
