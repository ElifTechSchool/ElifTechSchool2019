<template>
  <v-container>
    <v-row>
      <div class="wrapper">

        <div class="filters">
          <FilterTypeAchievements @filter="selectType" />
          <FilterTypesAchievements  @filter="selectTypes" />
        </div>

        <div class="block-achievements">
          <div v-for="achievement in allAchievements" v-bind:key="achievement.id">
            <Achievement
              :id="achievement.id"
              :photo_url="achievement.photo_url"
              :name="achievement.name"
              :created_at="achievement.created_at"
            />
          </div> 
          <v-row v-if="!allAchievements || !allAchievements.length" align="center" justify="center" >
            <v-col md="5">
              <v-card>
                <v-card-title class="justify-center">
                  No items found
                </v-card-title>
              </v-card>
            </v-col>
         
          </v-row>
          <div>
            <v-pagination v-if="achievementsCount > limit"
              v-model="page"
              :length="getPages()"
              @input="page => getAchievementPerPage(page)"
            >
            </v-pagination>
          </div>
        </div>

      </div>
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
    return {};
  },
  mounted() {
    if(!this.paramsExists()) {
      this.setQueryParams()
    } 
    this.setInitialStateParams(this.getQueryparams())

    this.$store.dispatch("setCurrentPage", this.getPage || 1);
    this.$store.dispatch("getAllAchievements");

},
  methods: {
    setInitialStateParams(params) {
      this.$store.dispatch("setInitialStateParams", params);
    },
    getQueryparams() {
      const params = new URLSearchParams(location.search);
      let types = params.get('types');
      types = typeof types === 'string' ? types.split(',') : types;
      return {
        type: params.get('type'),
        types,
        page: params.get('page'),
        limit: params.get('limit'),
      }
    },
    paramsExists() {
      const searchParams = new URLSearchParams(location.search);
      return searchParams.has('page') || searchParams.has('limit') || searchParams.has('type') || searchParams.has('types')
    },
    setQueryParams() {
      const params = new URLSearchParams(location.search);
      params.set('page', this.getPage);
      params.set('limit', this.limit); 
      if (this.getType) {
        params.set('type', this.getType);
      }
      if (this.getTypes && this.getTypes.length) {
        params.set('types', this.getTypes);
      }
      window.history.replaceState({}, '', `${location.pathname}?${params}`);
    },

    getPages() {
      return Math.ceil(this.achievementsCount / this.limit);
    },
    getAchievementPerPage(page) {
      this.$store.dispatch("setCurrentPage", page);
      this.$store.dispatch("getAllAchievements");
      this.setQueryParams()
    },
    selectType(type) {
      this.$store.dispatch("setType", type);
      this.$store.dispatch("getAllAchievements");
      this.setQueryParams()
    },
    selectTypes(types) {
      this.$store.dispatch("setTypes", types);
      this.$store.dispatch("getAllAchievements");
      this.setQueryParams()
    }
  },
  computed: {
    ...mapGetters(["allAchievements", "achievementsCount", "getPage", "getLimit", "getTypes", "getType"]),
      page: {
        get() {
          return this.getPage || 1;
      },
      set(val) {
        this.$store.commit("setCurrentPage", val);
      }
    },
    limit: {
      get() {
        return this.getLimit || 5;
    },
    set(val) {
      this.$store.commit("setLimit", val);
    }
  },
  }
};
</script>

<style lang="scss">
.block-achievements {
  width: 100%;
  margin-left: 10px;
}

.wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
}
</style>
