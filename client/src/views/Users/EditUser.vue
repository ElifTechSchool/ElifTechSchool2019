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
                name="image_url"
                v-model="image_url"
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
import {mapGetters} from 'vuex';

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
      ],
      textareaRules: [
        v => v.length <= 500 || "Field must be less than 500 characters",
      ],
      image_url: underfined,
    };
  },
  computed: {
    ...mapGetters(['findUserById', 'userById']),
    userData() {
      if(this.findUserById(this.id)){
        return this.findUserById(this.id);
      } else {
        return this.userById;
      }
    },
  },
  methods: {
    async updateUser() {
      const id = this.$route.params.Uid;
      const formData = new FormData();

      formData.append("image_url", this.image_url);      
      formData.append("user", JSON.stringify(this.userData));
      this.$store.dispatch("updateUser", {formData, id});
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
    this.$store.dispatch("getUserById", this.$route.params.Uid);
  }
}
</script>

<style lang="scss">
  .btn-wrapper {
    margin: 20px;
  }
</style>