<template>
  <v-card class="user" :elevation="5">
    <v-row key="1" v-if="!isEditing" class="userInfo d-flex">
      <img :src="this.userData.image_url" alt="" />
      <p class="rank">{{ userData.rank }}</p>
      <div class="userDetail">
        <h1><b>Name:</b> {{ userData.name }} {{ userData.surname }}</h1>
        <p><b>Experience:</b> {{ userData.experience }}</p>
        <p><b>Email:</b> {{ userData.email }}</p>
        <p><b>Description:</b> {{ userData.description }}</p>
      </div>
      <v-btn
        color="orange lighten-2"
        class="align-self-end"
        @click="toggleEdit"
      >
        Edit
      </v-btn>
    </v-row>

    <v-row key="2" justify="center" class="userEdit" v-else>
      <v-form @submit.prevent="updateUser">
        <v-text-field
          name="name"
          label="Name"
          v-model="userData.name"
          required
        />
        <v-text-field
          name="surname"
          label="Surname"
          v-model="userData.surname"
          required
        />
        <v-text-field
          type="email"
          label="E-mail"
          name="email"
          v-model="userData.email"
          required
        />
        <v-text-field
          type="url"
          label="Image url"
          name="img_url"
          v-model="userData.image_url"
        />
        <v-text-field
          type="text"
          label="Description"
          name="description"
          v-model="userData.description"
        />
        <v-text-field
          type="text"
          label="Experience"
          name="experience"
          v-model="userData.experience"
        />
        <v-btn color="orange lighten-2" class="bt" type="submit">
          Update
        </v-btn>
        <v-btn color="grey lighten-2" class="bt" @click="toggleEdit">
          Cancel
        </v-btn>
      </v-form>
    </v-row>
  </v-card>
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
.user {
  width: 50vw;
  height: 600px;
  padding: 40px;
  margin: auto;
  margin-top: 80px;

  .userInfo {
    display: flex;

    .v-btn {
      margin: 15px;
      margin-left: auto;
    }
  }
  .rank {
    width: 50px;
    font-weight: 700;
  }
  .userDetail {
    width: 350px;
    text-align: left;
  }

  .userEdit {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;

    .v-form {
      width: 50%;
    }
    .v-btn {
      margin: 10px;
    }
  }
}
img {
  width: 140px;
  height: 140px;
  margin-bottom: 30px;
}
</style>
