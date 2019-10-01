<template>
  <v-row justify="center">
    <v-col md="6">
      <v-card :elevation="5" class="mx-auto">
        <v-row key="1" v-if="!isEditing">
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
              <v-btn
                color="orange lighten-2"
                @click="toggleEdit"
                absolute
                right
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn color="primary lighten-2" outlined>
                Change password
              </v-btn>
              <v-btn to="/users" color="grey" outlined>
                Go back
              </v-btn>
            </v-card-actions>
          </v-col>
          <v-col>
            <v-card-title class="font-weight-bold"
              >{{ userData.name }} {{ userData.surname }}</v-card-title
            >
          </v-col>
        </v-row>

        <v-row key="2" justify="center" v-else>
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
              <v-btn color="grey lighten-2" class="bt" @click="toggleEdit">
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
  name: "userDetail",
  data() {
    return {
      isEditing: false
    };
  },
  methods: {
    toggleEdit() {
      this.isEditing = !this.isEditing;
    },
    updateUser() {
      console.log(this.user);
      this.$store.dispatch("updateUser", this.userData);
      this.toggleEdit();
    }
  },
  created() {
    this.userData = this.$store.getters.userById(this.$route.params.Uid);
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
