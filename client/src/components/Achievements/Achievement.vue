<template>
  <v-row align="center" justify="center">
    <v-col cols="3">
      <v-hover v-slot:default="{ hover }">
        <v-card :elevation="hover ? 12 : 2" class="pa-4">
          <div @click="showDetails" class="container-achievement">
            <v-row>
              <v-col cols="12" sm="4">
                <v-img 
                    v-bind:src="photo_url || 'https://where2go.tech/assistant/img/achievements/win.png'" 
                    alt="achievement image"
                />
              </v-col>
              <v-col cols="12" sm="7" class="card_text">
                <v-card-title>
                  {{ name }}
                </v-card-title>
                  <v-spacer></v-spacer>
                <v-card-text>
                  {{ $moment(created_at).format("MMM Do YY HH:mm") }}
                </v-card-text>
              </v-col>
            </v-row>
          </div>
          <template>
            <v-layout row justify-center class="delete_btn_container">
              <v-dialog max-width="600" v-model="confirmModal">
                <template v-slot:activator="{ on }">
                  <v-col>
                    <v-btn v-on="on" color="grey lighten-3">
                      <v-icon>mdi-delete</v-icon>
                      Delete
                    </v-btn>
                  </v-col>
                </template>
                <v-card>
                  <v-card-title
                    >Are you sure to delete {{ name }} achievement
                    ?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="confirmModal = false" color="green"
                      >Cancel</v-btn
                    >
                    <v-btn @click="deleteAchievement" color="red">Delete</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
          </template>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script>
import Vue from 'vue';
import moment from 'moment';
Object.defineProperty(Vue.prototype, '$moment', { value: moment });

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

.delete_btn_container {
  text-align: right;
}
.card_text {
  text-align: left;
}
</style>
