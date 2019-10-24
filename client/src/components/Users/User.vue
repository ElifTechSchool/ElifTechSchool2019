<template>
  <v-row class="mx-auto" justify="center" align="center">
    <v-col xl="4" lg="5" md="8" sm="8">
      <v-hover v-slot:default="{ hover }">
        <v-card class="user d-flex mx-auto" :elevation="hover ? 6 : 2">
          <v-col md="10" @click="goToDetail" class="d-flex flex-row cursor">
            <v-col md="7">
              <v-img
                position="center left"
                :src="userData.image_url"
                alt="user image"
                max-width="190px"
                max-height="190px"
              />
            </v-col>
            <v-col md="5" class="float-left pa-3">
              <div class="userDetail">
                <h3>{{ userData.name }} {{ userData.surname }}</h3>
                <p>{{ userData.email }}</p>
                <p>Experience: {{ userData.experience }}</p>
              </div>
            </v-col>
          </v-col>
          <v-col md="2">
            <v-card-actions>
              <v-btn class="deleteBtn" fab @click="warnDialog = true" color="primary" :elevation="hover ? 0 : 5">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
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
      warnDialog: false,
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
        params: { Uid: this.userData.id, page: this.$route.query.page }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.user {
  align-items: center;
  margin-bottom: 13px;

  .deleteBtn {
    margin: 5px;
    position: absolute;
    bottom: 50;
    right: -35px;
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
