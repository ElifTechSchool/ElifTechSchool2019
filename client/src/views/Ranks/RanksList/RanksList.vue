<template lang="html">
  <div v-if="!rankIsEmpty">
    <div v-for="rank in allRanks" :key="rank.number">
      <RanksItem :rank="rank" />
    </div>
    <v-btn class="mx-2" fab dark large color="primary" to="/ranks/add">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-pagination v-model="pageProxy" :length="pageQty" @input="nextPage"></v-pagination>
  </div>
  <v-container fluid fill-height v-else>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title class="headline">Oops! No ranks</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-img src="https://res.cloudinary.com/dphouqbtl/image/upload/v1570958072/images/23821330-min_oggay1.jpg"
              aspect-ratio="1.7" class="grey lighten-2" max-width="550" max-height="300"></v-img>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-fab-transition>
              <v-btn color="primary" dark absolute bottom right fab to="/ranks/add">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-fab-transition>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {
    mapGetters
  } from "vuex";
  import RanksItem from "../RanksItem/RanksItem";

  export default {
    components: {
      RanksItem
    },
    name: "ranks-list",
    mounted() {
      this.pageProxy = Number(this.$route.query.page) || 1;
      const page = this.pageProxy;
      const pageSize = this.ranksPageSize;
      const search = this.$route.query.search;
      this.$store.dispatch("getAllRanks", { page, pageSize, search });
    },
    data() {
      return {
        pageProxy: Number(this.$route.query.page)
      };
    },
    watch: {
      pageProxy: function(newPage, oldPage) {
        this.nextPage(newPage);
      }
    },
    computed: {
      ...mapGetters(["allRanks", "rankIsEmpty", "pageQty", "ranksPageSize", "searchRank"])
    },
    methods: {
      nextPage(newPage) {
        this.$router.replace({
          name: "ranks",
          query: { page: newPage }
        }).catch(err => {});
        const page = newPage;
        const pageSize = this.ranksPageSize;
        const search = this.search;
        this.$store.dispatch("getAllRanks", { page, pageSize, search });
      }
    },
  };

</script>

<style scoped lang="scss">
  .mx-2 {
    position: fixed;
    bottom: 50px;
    right: 80px;
  }

</style>
