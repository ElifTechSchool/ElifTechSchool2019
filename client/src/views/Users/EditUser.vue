<template>
    <v-row justify="center">
    <v-col md="6">
      <v-card :elevation="5" class="mx-auto">
        <v-row justify="center">
          <v-col md="6">
            <v-form @submit.prevent="updateUser" enctype="multipart/form-data">
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    name="name"
                    :rules="nameRules"
                    :counter="10"
                    label="Name"
                    v-model="userData.name"
                    required
                  />
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    name="surname"
                    :rules="nameRules"
                    :counter="10"
                    label="Surname"
                    v-model="userData.surname"
                    required
                  />
                </v-col>
              </v-row>
              <v-text-field
                type="email"
                label="E-mail"
                :rules="emailRules"
                :counter="100"
                name="email"
                v-model="userData.email"
                required
              />
              <v-file-input
                label="Change your profile picture"
                name="img_url"
                v-model="userData.img_url"
                accept=".jpg, .png"
              ></v-file-input>
              <v-textarea
                label="Description"
                name="description"
                :rules="textareaRules"
                :counter="500"
                v-model="userData.description"
              ></v-textarea>
              <v-row justify="space-around" class="btn-wrapper">
                <v-btn color="orange lighten-2" class="bt" type="submit">
                  Update
                </v-btn>
                <v-btn color="grey lighten-2" @click="goToDetail" class="bt">
                  Cancel
                </v-btn>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      nameRules: [
        v => !!v || "This field is required",
        v => v.length <= 10 || "Field must be less than 10 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    updateUser() {
      const formData = new FormData();
      formData.append("image_url", this.user.img_url);
      formData.append("user", JSON.stringify(this.user));

      this.$store.dispatch("updateUser", formData);
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

<style lang="scss">
  .btn-wrapper {
    margin: 20px;
  }
</style>