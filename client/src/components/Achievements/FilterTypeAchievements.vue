<template>
  <v-row justify="center">
    <v-checkbox
      v-model="selected"
      label="one"
      value="one"
      @change="handleChange($event)"
    >
    </v-checkbox>
    <v-checkbox
      v-model="selected"
      label="two"
      value="two"
      @change="handleChange($event)"
    >
    </v-checkbox>
    <v-checkbox
      v-model="selected"
      label="three"
      value="three"
      @change="handleChange($event)"
    >
    </v-checkbox>
    <v-checkbox
      v-model="selected"
      label="four"
      value="four"
      @change="handleChange($event)"
    >
    </v-checkbox>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      selected: []
    };
  },
  methods: {
    handleChange() {
      this.$emit("filter", this.selected);
    }
  }
};
</script>

<style lang="scss">
v-checkbox {
  display: inline-block;
}
</style>
