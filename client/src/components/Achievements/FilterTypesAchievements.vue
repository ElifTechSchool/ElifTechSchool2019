<template>
  <div class="typesItem" v-if="showFiters && types">
    <span class="typesTitle">Types</span>
    <v-checkbox class="pa-0 ma-0"
      v-for="(type, index) in types"
      :key="`type-${index}`"
      v-model="selected"
      :label="type"
      :value="type"
      @change="handleChange($event)"
    >
    </v-checkbox>
  </div>
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
      this.showFiters = false;
      axios
        .get(`achievements/types`)
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
  
}

.typesItem {
  display: block;
}

.typesTitle {
  margin-top: 10px;
  margin-bottom: 10px;
  display: inline-block;
  font-weight: 600;
  
}
</style>
