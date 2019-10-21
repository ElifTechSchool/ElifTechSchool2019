<template>
  <v-container>
    <v-row justify="center">
      <v-col md="6">
        <v-card :elevation="5" class="mx-auto">
          <v-row>
            <v-col md="4">
              <v-img
                position="center left"
                :src="userById.image_url"
                alt="user image"
                aspect-ratio="1"
              />
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
            </v-col>
            <v-col md="7" justify-self="center">
              <v-row>
                <v-card-title class="font-weight-bold"
                  >{{ userById.name }} {{ userById.surname }}</v-card-title
                >
              </v-row>
              <v-row>
                <ProgressBar
                  :rank="rankData"
                  :userExperience="userById.experience"
                ></ProgressBar>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <ChangePass :show="warnDialog" @hideModal="warnDialog = false" />
    </v-row>
  </v-container>
</template>
<script>
import ProgressBar from "@/components/Users/ProgressBar.vue";
import ChangePass from "@/components/Users/ChangePass.vue";

export default {
    name: "Me",
    components: {
        ProgressBar,
        ChangePass,
    },
    computed: {
        userById() {
            return this.$store.getters.userMe.user;
        },
        rankData() {
            return this.$store.getters.userMe.userRank;
        }
    },
    mounted() {
        this.$store.dispatch("authUser", this.$store.getters.authData.data.token);
    },
    rankData() {
      return this.$store.getters.userMe.userRank;
    }
  },
  mounted() {
    this.$store.dispatch("authUser", this.$store.getters.authData.token);
  }
};
</script>
