<template lang="html">
  <div v-if="!eventIsEmpty">
    <div v-for="event in allEvents" :key="event.number">
      <Event :event="event" />
    </div>
    <v-btn class="mx-2" fab dark large color="primary" to="/events/add">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-pagination v-model="page" :length="countOfPages" @input="nextPage"></v-pagination>
  </div>
  <v-container fluid fill-height v-else>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title class="headline">Oops! No events</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-img src="https://res.cloudinary.com/dphouqbtl/image/upload/v1570958072/images/23821330-min_oggay1.jpg"
              aspect-ratio="1.7" class="grey lighten-2" max-width="550" max-height="300"></v-img>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-fab-transition>
              <v-btn color="primary" dark absolute bottom right fab to="/events/add">
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
  import Event from "../../components/Events/Event";


  export default {
    components: {
      Event
    },
    name: "events",
    props: [],
    created() {
      this.page = Number(this.$route.query.page) || 1;
      const page = this.$route.query.page || 1;
      const pageSize = this.eventsPageSize;
      const search = this.$route.query.search;
      this.$store.dispatch("getAllEvents", { page, pageSize, search });
    },
    data() {
      return {
        pageProxy: Number(this.$route.query.page)
      };
    },
    computed: {
      ...mapGetters(["allEvents", "eventIsEmpty", "countOfPages", "eventsPageSize", "searchEvent"]),
      page: {
        get() {
          return this.pageProxy || this.$route.query.page;
        },
        set(val) {
          this.pageProxy = val;
        }
      }
    },
    methods: {
      nextPage() {
        this.$router.replace({
          name: "events",
          query: { page: this.page }
        })
        const page = this.page;
        const pageSize = this.eventsPageSize;
        const search = this.search;
        this.$store.dispatch("getAllEvents", { page, pageSize, search });
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
