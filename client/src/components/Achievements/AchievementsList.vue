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
  </div>
</template>

<script>
import axios from 'axios'; 
import Achievement from './Achievement'
import { mapGetters } from "vuex";

  export default {
    components: {
     Achievement
    },
    name: "achievements-list",
    props: [],
    mounted() {
      this.$store.dispatch("getAllAchievements");
    },
    data() {
      return {};
    },
    methods: {},
    computed: {
      ...mapGetters(["allAchievements"])
   }
};
</script>

<style lang="scss">
  .block-achievements{
    margin-left: 30px;
  }
</style>