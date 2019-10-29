<template lang="html">
  <v-row class="mx-auto" align="center" justify="center">
    <v-col md="6">
       <v-hover v-slot:default="{ hover }">
         <v-card class="mx-auto" :elevation="hover ? 16 : 2" style="cursor: pointer;">
           <v-col md="12" sm="12" class="d-flex flex-row cursor" @click="goToDetail">
            <v-col sm="3" md="3">
              <v-img
                position="center left"
                :src="event.image_url"
                alt="event image"
                max-width="250px"
                max-height="250px"
              />
            </v-col>
            
            <v-col md="9" class="float-left pa-2">
              <h2>{{ event.title }}</h2>             
              <p class="mb-1">{{ event.description | truncate(370) }}</p>
              <p class="mb-1"><b>Location:</b> {{ event.location }}</p>
              <p><b>Max number of people: </b> {{ event.max_people }}</p>
            </v-col>
           </v-col>
           <v-card-actions align="center" v-if="$store.getters.meRole === 1">
            <!--  -->
            <div class="flex-grow-1"></div>
            <v-btn text @click="warnDialog = true" class="mx-4 mb-2">
              <v-icon>delete</v-icon>
              <span class="subheading">Delete</span>
            </v-btn>
          </v-card-actions>
         </v-card>
       </v-hover>
    </v-col>
    <ModalBox
      :show="warnDialog"
      @deleteItem="deleteEvent"
      @hideModal="warnDialog = false"
    />
  </v-row>
    
</template>

<script>
import ModalBox from "@/components/ModalBox/ModalBox.vue";

import moment from "moment";
import Vue from "vue";
Object.defineProperty(Vue.prototype, "$moment", { value: moment });

export default {
  name: "event",
  components: {
    ModalBox,
  },
  props: {
    event: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      warnDialog: false
    };
  },
  methods: {
    deleteEvent() {
      this.$store.dispatch("deleteEvent", this.event.id);
    },
    goToDetail() {
      this.$router.push({
        name: "eventDetails",
        params: { Eid: this.event.id, page: this.$route.query.page, event: this.event}
      });
    }
  }
};
</script>

<style scoped lang="scss">
.card {
  margin-bottom: 1rem;
}
</style>
