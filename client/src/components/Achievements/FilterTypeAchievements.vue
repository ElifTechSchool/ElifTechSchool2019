<template>
  <v-col sm="1">
    <v-select
      label="Achievements type"
      v-model="filterAch"
      @change="filterAchievements(filterAch)"
      :items="['all', 'one', 'two', 'three', 'four', 'five']"
    >
    </v-select>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      filterAch: "all"
    };
  },
  methods: {
    filterAchievements(type) {
      if (type) {
        this.$emit("filter", type);
      }
    }
  }
};
</script>
