<template>
  <div>
    <FilterTypeAchievements class="mt-0 pt-0" @filter="filterType = $event" />
    <div class="block-achievements">
      <div v-for="achievement in filterByType" v-bind:key="achievement.id">
        <Achievement
          :id="achievement.id"
          :photo_url="achievement.photo_url"
          :name="achievement.name"
          :created_at="achievement.created_at"
        />
      </div>
      <div>
        <v-pagination
          :length="getPages()"
          @input="page => getAchievementPerPage(page)"
        >
        </v-pagination>
      </div>
    </div>
  </div>
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
      filterType: "all"
    };
  },
  mounted() {
    this.$store.dispatch("getAllAchievements", { page: 1, limit: this.limit });
  },
  methods: {
    getPages() {
      return Math.ceil(this.achievementsCount / this.limit);
    },
    getAchievementPerPage(page) {
      this.$store.dispatch("getAllAchievements", { page, limit: this.limit });
    }
  },
  computed: {
    ...mapGetters(["allAchievements", "achievementsCount"]),
    filterByType() {
      return this.filterType === "all"
        ? this.allAchievements
        : this.allAchievements.filter(
            achievement => achievement.type === this.filterType
          );
    }
  }
};
</script>

<style lang="scss">
.block-achievements {
  margin-left: 30px;
}
</style>
