<template>
  <v-row class="mx-auto" justify="center">
    <v-col md="5">
      <v-hover v-slot:default="{ hover }">
        <v-card class="user d-flex mx-auto" :elevation="hover ? 9 : 1">
          <v-row align="center" justify="center">
            <v-col md="9" @click="goToDetail" class="d-flex flex-row cursor">
              <v-col md="4">
                <v-img
                  position="center left"
                  :src="userData.image_url"
                  alt="user image"
                  width="150px"
                  height="150px"
                  contain
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
                <v-btn @click="deleteUser" color="error">Delete</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
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
