<template>
  <v-row justify="center">
    <v-col md="6">
      <v-card :elevation="5" class="mx-auto">
        <v-row>
          <v-col md="4">
            <v-img
              position="center left"
              :src="this.userData.image_url"
              alt="user image"
              aspect-ratio="1"
            />
            <p class="rank">{{ userData.rank }}</p>
            <v-card-text>
              <p>
                <v-icon color="primary" class="ma-2"
                  >mdi-swap-vertical-bold</v-icon
                >
                <b>Experience:</b>
                {{ userData.experience }}
              </p>
              <p>
                <v-icon color="primary" class="ma-2">mdi-email</v-icon>
                <b>Email:</b>
                {{ userData.email }}
              </p>
              <p>
                <v-icon color="primary" class="ma-2"
                  >mdi-account-badge-outline</v-icon
                >
                <b>Description:</b>
                {{ userData.description }}
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="orange lighten-2" @click="goToEdit" absolute right>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                color="primary lighten-2"
                @click="warnDialog = true"
                outlined
              >
                Change password
              </v-btn>
              <v-btn to="/users" color="grey" outlined>
                Go back
              </v-btn>
            </v-card-actions>
          </v-col>
          <v-col md="7" justify-self="center">
            <v-card-title class="font-weight-bold"
              >{{ userData.name }} {{ userData.surname }}</v-card-title
            >
            <ProgressBar
              :rank="rankData"
              :userExperience="userData.experience"
            ></ProgressBar>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <ChangePass :show="warnDialog" @hideModal="warnDialog = false" />
  </v-row>
</template>

<script>
import ProgressBar from "@/components/Users/ProgressBar.vue";
import ChangePass from "@/components/Users/ChangePass.vue";

import { mapGetters } from "vuex";

export default {
  name: "userDetail",
  components: {
    ProgressBar,
    ChangePass
  },
  data() {
    return {
      id: this.$route.params.Uid,
      warnDialog: false
    };
  },
  computed: {
    ...mapGetters(["findUserById", "userById", "rankData"]),
    userData() {
      return this.userById;
    }
  },
  methods: {
    goToEdit() {
      this.$router.push({
        name: "editUser",
        params: { Uid: this.id }
      });
    },
    goBack() {
      this.$store.commit("setUser", {});
      this.$router.push({ name: "users" });
    }
  },
  mounted() {
    if(this.$route.params.Uid !== this.$store.getters.userById.id){
      this.$store.dispatch("getUserById", this.$route.params.Uid);
    }
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
</style>
