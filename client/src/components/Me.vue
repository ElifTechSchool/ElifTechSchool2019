<template>
  <v-container>
    <v-row justify="center">
      <v-col md="10">
          <v-row>
            <v-col lg="3" md="4">
              <v-img
                position="center left"
                :src="userById.image_url"
                alt="user image"
                aspect-ratio="1"
              />
              <v-card-text>
                <v-row class="flex-column">
                <p>
                  <v-icon color="primary" class="ma-2"
                    >mdi-swap-vertical-bold</v-icon
                  >
                  <b>Experience:</b>
                  {{ userById.experience }}
                </p>
                <p>
                  <v-icon color="primary" class="ma-2">mdi-email</v-icon>
                  <b>Email:</b>
                  {{ userById.email }}
                </p>
                <p>
                  <v-icon color="primary" class="ma-2"
                    >mdi-account-badge-outline</v-icon
                  >
                  <b>Description:</b>
                  {{ userById.description }}
                </p>
              </v-row>
                <v-btn
                  color="primary lighten-2"
                  @click="changePassDialog = true"
                  outlined
                >Change Password</v-btn>
              </v-card-text>
            </v-col>
            <v-col md="7" justify-self="center">
              <v-row class="justify-space-between mb-2 flex-column">
                <v-card-title class="font-weight-bold">{{ userById.name }} {{ userById.surname }}</v-card-title>
                <h4>{{ meRole === 1 ? 'Administrator' : meRole === 2 ? 'Moderator' : 'User'}}</h4>
              </v-row>
              <v-row>
                <ProgressBar
                  :rank="rankData"
                  :userExperience="userById.experience"
                ></ProgressBar>
              </v-row>
              <Competition
                v-for="competition in getCompetitions"
                :competitionData="competition"
                :key="competition.id"
                class="competition"
              />
            </v-col>
          </v-row>
      </v-col>
      <v-dialog v-model="changePassDialog" persistent max-width="600">
        <ChangePass @hideModal="changePassDialog=false" loggedIn=true />
      </v-dialog>
    </v-row>
  </v-container>
</template>
<script>
import ProgressBar from "@/components/Users/ProgressBar.vue";
import ChangePass from "@/components/Users/ChangePass.vue";
import Competition from "@/components/Competitions/Competition";

import { mapGetters } from "vuex";

export default {
    name: "Me",
    components: {
        ProgressBar,
        ChangePass,
        Competition
    },
    data() {
      return {
        changePassDialog: false,
      }
    },
    computed: {
      ...mapGetters(["rankData", "userByIdRole", "userMe", "meRole"]),
      userById() {
          return this.userMe.user;
      },
      rankData() {
          return this.$store.getters.userMe.userRank;
      },
      getCompetitions() {
        return this.$store.getters.getCompetitions;
      },
    },
    async mounted() {
      await this.$store.dispatch("authUser", this.$store.getters.token);
      this.$store.dispatch("loadCompetitions", {limit: 3, page: 1});
      this.$store.dispatch("getMeRole", this.userById.id);
    },
  };
</script>
<style lang="scss" scoped>
  .v-application p {
    margin: 0;
  }
  .v-card__title{
    padding-left: 0px;
    font-size: 30px;
  }

</style>