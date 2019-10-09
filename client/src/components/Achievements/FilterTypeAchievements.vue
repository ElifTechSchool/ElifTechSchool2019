<template>
  <v-col sm="1">
    <v-container>
      <v-checkbox
        v-model="selected"
        label="one" 
        value="one"
        @change="handleChange($event)"
      >
      </v-checkbox>
      <v-checkbox
        v-model="selected"
        label="err" 
        value="err"
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
    </v-container>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      selected: [],
    };
  },
  methods: {
    handleChange() {
      this.$emit("filter", this.selected);
    }
  }
};
</script>
