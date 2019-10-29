<template>
    <div class="filterType">
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
    </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      type: ["my", "wanted", "all"]
    };
  },
  methods: {
    handleChange(event) {
      console.log(event)
      this.$emit("filter", this.selected);
    },
  },
  computed: {
    ...mapGetters(["getType"]),
    selected: {
      get() {
        return this.getType || 'all';
      },
      set(val) {
        this.$store.commit("setType", val);
      }
    },
  }
};
</script>

<style lang="scss">
  v-select {
    display: inline-block;
  }

  .filterType {
    display: inline-block;
    width: 150px;
  }
</style>
