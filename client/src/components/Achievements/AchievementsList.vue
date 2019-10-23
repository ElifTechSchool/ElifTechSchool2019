<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <FilterTypeAchievements @filter="selectType" />
        <FilterTypesAchievements class="mt-0 pt-0" @filter="selectTypes" />
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
            <v-pagination v-if="achievementsCount > limit"
              v-model="page"
              :length="getPages()"
              @input="page => getAchievementPerPage(page)"
            >
            </v-pagination>
          </div>

        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Achievement from "./Achievement";
import { mapGetters } from "vuex";
import FilterTypesAchievements from "./FilterTypesAchievements";
import FilterTypeAchievements from "./FilterTypeAchievements"

export default {
  components: {
    Achievement,
    FilterTypeAchievements,
    FilterTypesAchievements
  },
  name: "achievements-list",
  props: [],
  data() {
    return {
      limit: 5,
      page: 1,
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
</style>
