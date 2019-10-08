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
      <v-pagination
        :length="getPages()"
        @input="(page) => getAchievementPerPage(page)"
      >
      </v-pagination>
   
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
       return Math.ceil(this.achievementsCount / this.limit); 
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
