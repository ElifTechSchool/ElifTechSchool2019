<template>
  <v-row align="center" justify="center">
    <v-col md="5">
      <v-hover v-slot:default="{ hover }">
        <v-card :elevation="hover ? 12 : 2" class="pa-4">
          <v-col @click="showDetails" class="container-achievement">
            <v-row>
              <v-col sm="4">
                <v-img 
                  v-bind:src="photo_url"
                  alt="achievement image"
                />
              </v-col>
              <v-col sm="7" class="card_text">
                <v-card-title>
                  {{ name }}
                </v-card-title>
                <v-spacer></v-spacer>
                <v-card-text class="grey--text">
                  {{ $moment(created_at).format("HH:mm MMM Do YY") }}
                </v-card-text>
              </v-col>
            </v-row>
          </v-col>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="confirmModal = true" v-if="$store.getters.meRole === 1" color="red" tile outlined>
                  Delete
                  <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
        </v-card>
      </v-hover>
    </v-col>
   <ModalBox
      :show="confirmModal"
      @deleteItem="deleteAchievement"
      @hideModal="confirmModal = false"
    />
  </v-row>
</template>

<script>
import Vue from "vue";
import moment from "moment";
Object.defineProperty(Vue.prototype, "$moment", { value: moment });
import ModalBox from "../ModalBox/ModalBox";

export default {
  name: "achievement",
  props: [
    "id",
    "name",
    "description",
    "type",
    "experience",
    "photo_url",
    "created_at"
  ],
  components: {
    ModalBox
  },
  data() {
    return {
      confirmModal: false
    };
  },
  methods: {
    showDetails() {
      this.$router.push({
        name: "achievementDetails",
        params: { id: this.id }
      });
    },
    deleteAchievement() {
      this.$store.dispatch("deleteAchievement", { id: this.id });
    }
  }
};
</script>

<style scoped lang="scss">
.container-achievement {
  cursor: pointer;
}
.delete-btn-container {
  text-align: right;
}
.card_text {
  text-align: left;
}
</style>
