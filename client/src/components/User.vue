<template>
  <v-row class="mx-auto" justify="center">
    <v-col md="5">
      <v-hover v-slot:default="{ hover }">
        <v-card
          class="user d-flex mx-auto"
          @click="goToDetail"
          :elevation="hover ? 9 : 3"
        >
          <img :src="userData.image_url" alt="" />
          <p class="rank">{{ userData.rank }}</p>
          <div class="userDetail">
            <h3>{{ userData.name }} {{ userData.surname }}</h3>
            <p>Experience: {{ userData.experience }}</p>
            <p>Email: {{ userData.email }}</p>
          </div>
          <v-card-actions>
            <v-btn @click="deleteUser" color="error">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "User",
  props: ["userData"],
  methods: {
    deleteUser() {
      this.$store.dispatch("deleteUser", this.userData.id);
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
  cursor: pointer;
  padding: 15px;
  align-items: center;
  margin-bottom: 15px;

  .v-btn {
    width: 95px;
    margin: 5px;
  }
  .rank {
    width: 50px;
    font-weight: 700;
  }
  .userDetail {
    //background-color: lightgray;
    width: 100%;
    text-align: left;
    padding-left: 25px;
  }
}

p {
  margin: 5px;
}
img {
  width: 140px;
  height: 140px;
}
</style>
