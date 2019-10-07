<template>
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
      <button
        v-for="page in getPages()"
        @click="() => getAchievementPerPage(page)"
      >
        {{page}}
      </button>
   
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Achievement from "./Achievement";
import { mapGetters } from "vuex";

export default {
  components: {
    Achievement
  },
  name: "achievements-list",
  props: [],
  data() {
    return { 
      limit: 5
    }
  },
   mounted() {
     this.$store.dispatch("getAllAchievements", { page: 1, limit: this.limit });
   },
  methods: { 
     getPages () {
       const pages = [];
       let numberOfPages = Math.ceil(this.achievementsCount / this.limit);
       for (let index = 1; index <= numberOfPages; index++) {
         pages.push(index);
       }
       return pages;
     },
    getAchievementPerPage(page) {
      this.$store.dispatch("getAllAchievements", { page, limit: this.limit });
    }
  },
   computed: {
     ...mapGetters(["allAchievements", "achievementsCount"]),
   }
}
</script>

<style lang="scss">
.block-achievements {
  margin-left: 30px;
}
</style>
