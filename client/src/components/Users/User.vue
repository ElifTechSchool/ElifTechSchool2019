<template>
  <v-row class="mx-auto" justify="center" align="center">
    <v-col md="5">
      <v-hover v-slot:default="{ hover }">
        <v-card class="user d-flex mx-auto" :elevation="hover ? 9 : 1">
          <v-col md="9" @click="goToDetail" class="d-flex flex-row cursor">
            <v-col md="4">
              <v-img
                position="center left"
                :src="userData.image_url"
                alt="user image"
                max-width="150px"
                max-height="150px"
              />
            </v-col>
            <v-col md="1">
              <p class="rank">{{ userData.rank }}</p>
            </v-col>
            <v-col md="7" class="float-left pa-3">
              <div class="userDetail">
                <h3>{{ userData.name }} {{ userData.surname }}</h3>
                <p>Experience: {{ userData.experience }}</p>
                <p>Email: {{ userData.email }}</p>
              </div>
            </v-col>
          </v-col>
          <v-col md="3">
            <v-card-actions>
              <v-btn @click="warnDialog = true" color="error">Delete</v-btn>
            </v-card-actions>
          </v-col>
        </v-card>
      </v-hover>
    </v-col>
    <ModalBox
      :show="warnDialog"
      @deleteItem="deleteUser"
      @hideModal="warnDialog = false"
    />
  </v-row>
</template>

<script>
import ModalBox from "../ModalBox/ModalBox";
export default {
  name: "User",
  props: ["userData"],
  components: {
    ModalBox
  },
  data() {
    return {
      warnDialog: false
    };
  },
  methods: {
    deleteUser() {
      const id = this.userData.id;
      const page = this.$route.query.page;
      const pageSize = this.$route.query.pageSize;
      const search = this.$route.query.search;
      this.$store.dispatch("deleteUser", { id, page, pageSize, search });
    },
    goToDetail() {
      this.$router.push({
        name: "userDetails",
        params: { Uid: this.userData.id }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.user {
  align-items: center;
  margin-bottom: 20px;

  .v-btn {
    width: 95px;
    margin: 5px;
  }
  .rank {
    width: 50px;
    font-weight: 700;
  }
}
.cursor {
  cursor: pointer;
}
.col {
  padding: 0;
}
p {
  margin: 0;
}
</style>
