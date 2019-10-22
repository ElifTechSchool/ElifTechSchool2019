<template>
  <v-row justify="center">
    <v-col>
      <v-col cols="2" sm="1" class="select_type">
        <v-select  v-model="selected" @change="selectType"
          :items="type"
          :value="type"
           label="Type"
          dense
          outlined
        >
        </v-select>
      </v-col>
      <FilterTypeAchievements class="mt-0 pt-0" @filter="selectTypes" />
      <div class="block-achievements">
        <div v-for="achievement in allAchievements" v-bind:key="achievement.id">
          <Achievement
            :id="achievement.id"
            :photo_url="achievement.photo_url"
            :name="achievement.name"
            :created_at="achievement.created_at"
          />
        </div>
        <div>
          <v-pagination
            v-model="page"
            :length="getPages()"
            @input="page => getAchievementPerPage(page)"
          >
          </v-pagination>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import Achievement from "./Achievement";
import { mapGetters } from "vuex";
import FilterTypeAchievements from "./FilterTypeAchievements";

export default {
  components: {
    Achievement,
    FilterTypeAchievements
  },
  name: "achievements-list",
  props: [],
  data() {
    return {
      limit: 5,
      page: null,
      selected: "all",
      type: ["my", "wanted", "all"]
    };
  },
  mounted() {
    this.$store.dispatch("setCurrentPage", this.getPage || 1);
    this.$store.dispatch("getAllAchievements");
  },
  methods: {
    getPages() {
      return Math.ceil(this.achievementsCount / this.limit);
    },
    getAchievementPerPage(page) {
      this.$store.dispatch("setCurrentPage", page);
      this.$store.dispatch("getAllAchievements");
    },
    selectType(type) {
      this.$store.dispatch("setType", type);
      this.$store.dispatch("getAllAchievements");
    },
    selectTypes(types) {
      this.$store.dispatch("setTypes", types);
      this.$store.dispatch("getAllAchievements");
    }
  },
  computed: {
    ...mapGetters(["allAchievements", "achievementsCount", "getPage"])
  }
};
</script>

<style lang="scss">
.block-achievements {
  margin-left: 30px;
}
.select_type {
  display: inline-block;
  padding: 0;
}
</style>
