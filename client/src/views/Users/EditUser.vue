<template>
  <v-row justify="center">
    <v-col lg="6" md="8" sm="10">
      <v-card :elevation="5" class="mx-auto">
        <v-row justify="center">
          <v-col lg="6" md="10" sm="10">
            <v-form @submit.prevent="updateUser" enctype="multipart/form-data">
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    name="name"
                    :rules="nameRules"
                    :counter="50"
                    label="Name"
                    v-model="userData.name"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    name="surname"
                    :rules="nameRules"
                    :counter="50"
                    label="Surname"
                    v-model="userData.surname"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="8" md="8">
                  <v-text-field
                    type="email"
                    label="E-mail"
                    :rules="emailRules"
                    :counter="100"
                    name="email"
                    v-model="userData.email"
                  />
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-select
                    :items="roles"
                    v-if="this.$store.getters.meRole === 1"
                    label="User role"
                    name="role"
                    v-model="userRole"
                  ></v-select>
                </v-col>
              </v-row>
              <v-file-input
                :label="userData.image_url.match(/[\w-]+.(jpg|png)/)[0]"
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
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      nameRules: [
        v => !!v || "This field is required",
        v =>
          (v && v.length <= 50) || "This field must be less than 50 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => (v && v.length <= 100) || "Field must be less than 100 characters",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      textareaRules: [
        v => (v && v.length <= 500) || "Field must be less than 500 characters"
      ],
      image_url: undefined,
      roles: [
        { text: "user", value: 3 },
        { text: "moderator", value: 2 },
        { text: "administrator", value: 1 }
      ],
    };
  },
  computed: {
    ...mapGetters(["findUserById", "userById", "userByIdRole"]),
    userData() {
      if (this.findUserById(this.id)) {
        return this.findUserById(this.id);
      } else {
        return this.userById;
      }
    },
    userRole: {
      get() {
        return this.userByIdRole;
      },
      set(val) {
        console.log(this.userByIdRole);
        this.$store.commit("setUserByIdRole", val);
      }
    }
  },
  methods: {
    async updateUser() {
      const id = this.$route.params.Uid;
      const formData = new FormData();
      Object.entries(this.userData).forEach(([key, value]) => {
        if (key === "image_url") {
          this.image_url === undefined
            ? formData.append("image_url", this.userData.image_url)
            : formData.append("image_url", this.image_url);
        } else {
          formData.append(key, value);
        }
      });
      await this.$store.dispatch("updateUser", { formData, id });
      await this.$store.dispatch("updateUserRole", {
        userRole: this.userByIdRole,
        id: id
      });
      this.goToDetail();
    },
    goToDetail() {
      this.$store.dispatch("getUserById", this.$route.params.Uid);
      this.$router.go(-1);      
    }
  },
  mounted() {
    if (!this.userById) {
      this.$store.dispatch("getUserById", this.$route.params.Uid);
    }
  }
};
</script>

<style lang="scss">
.btn-wrapper {
  margin: 20px;
}
</style>
