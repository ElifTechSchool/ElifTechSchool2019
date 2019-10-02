<template>
    <v-row justify="center">
    <v-col md="6">
      <v-card :elevation="5" class="mx-auto">
        <v-row justify="center">
          <v-col md="6">
            <v-form @submit.prevent="updateUser">
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    name="name"
                    label="Name"
                    v-model="userData.name"
                    required
                  />
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    name="surname"
                    label="Surname"
                    v-model="userData.surname"
                    required
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="10" md="10">
                  <v-text-field
                    type="email"
                    label="E-mail"
                    name="email"
                    v-model="userData.email"
                    required
                  />
                </v-col>
                <v-col cols="12" sm="2" md="2">
                  <v-text-field
                    type="text"
                    label="Experience"
                    name="experience"
                    v-model="userData.experience"
                  />
                </v-col>
              </v-row>
              <v-text-field
                type="url"
                label="Image url"
                name="img_url"
                v-model="userData.image_url"
              />
              <v-textarea
                label="Description"
                name="description"
                v-model="userData.description"
              ></v-textarea>
              <v-btn color="orange lighten-2" class="bt" type="submit">
                Update
              </v-btn>
              <v-btn color="grey lighten-2" @click="goToDetail" class="bt">
                Cancel
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  methods: {
    updateUser() {
      this.$store.dispatch("updateUser", this.userData);
      this.goToDetail();
    },
    goToDetail() {
      this.$router.push({
        name: "userDetails",
        params: { Uid: this.userData.id }
      });
    }
  },
  created() {
    this.userData = this.$store.getters.userById(this.$route.params.Uid);
  }
}
</script>