<template>
  <v-row justify="center">
    <v-col sm="2">
      <v-select  
        v-model="selected"
        @change="handleChange($event)"
        :items="type"
        :value="type"
        label="Type"
        dense
        outlined
      >
      </v-select>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      selected: "all",
      type: ["my", "wanted", "all"]
    };
  },
  methods: {
    handleChange() {
      this.$emit("filter", this.selected);
    },
  },
};
</script>

<style lang="scss">
  v-select {
    display: inline-block;
  }
</style>
