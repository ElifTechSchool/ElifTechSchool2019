<template>
  <v-row justify="center">
    <v-col lg="6" md="8" sm="10">
      <v-card :elevation="5" class="mx-auto">
        <v-row>
          <v-col md="4">
            <v-img
              position="center left"
              :src="userById.image_url"
              alt="user image"
              aspect-ratio="1"
            />
            <p class="rank">{{ userById.rank }}</p>
            <v-card-text>
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
            </v-card-text>
            <v-card-actions>
              <v-btn
                class="editBtn"
                color="orange lighten-2"
                @click="goToEdit"
                fab
                v-if="
                  $store.getters.meRole < 3 ||
                    this.$route.params.Uid ===
                      this.$store.getters.userMe.user.id
                "
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                color="primary lighten-2"
                @click="changePassDialog = true"
                v-if="
                  $store.getters.meRole < 3 ||
                    this.$route.params.Uid ===
                      this.$store.getters.userMe.user.id
                "
                outlined
                >Change Password</v-btn
              >
              <v-btn
                color="primary"
                fab
                class="achivBtn"
                v-if="$store.getters.meRole < 3"
                @click="achivDialog = true"
              >
                <v-icon>mdi-trophy</v-icon>
              </v-btn>

              <v-btn @click="goBack" color="grey" outlined>
                Go back
              </v-btn>
            </v-card-actions>
          </v-col>
          <v-col md="7" justify-self="center">
            <v-row class="justify-space-between mb-2 flex-column">
              <v-card-title class="font-weight-bold"
                >{{ userById.name }} {{ userById.surname }}</v-card-title
              >
              <h4>
                {{
                  userByIdRole === 1
                    ? "Administrator"
                    : userByIdRole === 2
                    ? "Moderator"
                    : "User"
                }}
              </h4>
            </v-row>
            <v-row>
              <ProgressBar
                :rank="rankData"
                :userExperience="userById.experience"
              ></ProgressBar>
            </v-row>
            <v-row> 
              <v-col v-for="achievement in achievements" :key="achievement.id">
                <v-img class="achievement"
                  :src="achievement.photo_url"
                  max-width="60px"
                  max-height="60px"
                  @click="goToAchievementDetails(achievement.id)"
                />

              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <Multiselect
      type="achiv"
      :show="achivDialog"
      @hideModal="achivDialog = false"
    ></Multiselect>
    <v-dialog v-model="changePassDialog" persistent max-width="600">
      <ChangePass @hideModal="changePassDialog = false" loggedIn="1" />
    </v-dialog>
  </v-row>
</template>

<script>
import ProgressBar from "@/components/Users/ProgressBar.vue";
import ChangePass from "@/components/Users/ChangePass.vue";
import Multiselect from "@/components/Users/Multiselect.vue";

import { mapGetters } from "vuex";
import axios from 'axios';

export default {
  name: "userDetail",
  components: {
    ProgressBar,
    ChangePass,
    Multiselect
  },
  data() {
    return {
      id: this.$route.params.Uid,
      changePassDialog: false,
      achivDialog: false,
      achievements: []
    };
  },
  computed: {
    ...mapGetters(["findUserById", "userById", "rankData", "userByIdRole", "achievementById"])
  },
  methods: {
    goToEdit() {
      this.$router.push({
        name: "editUser",
        params: { Uid: this.id }
      });
    },
    goBack() {
      this.$router.replace({
        name: "users",
        query: {
          page: this.$route.params.page || 1,
          pageSize: this.$store.getters.pageSize,
          search: this.$store.getters.search,
        }
      });
    },
    getOwnAchievements() {
      axios.get(`users/${this.id}/achievements`)
        .then(res => {
          console.log(res.data);
          this.achievements = res.data;
        })        
        .catch(err => {
          console.log(err);
        })
    },
    goToAchievementDetails(achievementId) {
      this.$router.push(`/achievements/${achievementId}`)
    }
  },
  created() {
    if (this.$store.getters.userById === undefined) {
      this.$store.dispatch("getUserById", this.$route.params.Uid);
      this.$store.dispatch("getUserRole", this.$route.params.Uid);
    } else if (this.$route.params.Uid !== this.$store.getters.userById.id) {
      this.$store.dispatch("getUserById", this.$route.params.Uid);
      this.$store.dispatch("getUserRole", this.$route.params.Uid);
    }
     this.getOwnAchievements()
  }
};
</script>

<style lang="scss" scoped>
.col-md-4 {
  padding-top: 0;
}
.v-card__text {
  padding-right: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
  opacity: 0;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transition: opacity 0.5s;
  opacity: 0;
}
.achivBtn {
  position: absolute;
  top: 10px;
  right: -28px;
}
.editBtn {
  position: absolute;
  bottom: -20px;
  right: -28px;
}
.v-card__title {
  padding: 0px;
  padding-bottom: 0px;
}
.achievement:hover {
  cursor: pointer;
  -webkit-box-shadow: -3px 4px 17px 0px rgba(0,0,0,0.59);
  -moz-box-shadow: -3px 4px 17px 0px rgba(0,0,0,0.59);
  box-shadow: -3px 4px 17px 0px rgba(0,0,0,0.59);
}
</style>
