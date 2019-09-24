<template>
  <v-card class="user">
    <v-row justify="center" v-if="!isEditing">
      <img :src="this.userData.image_url" alt="" />
      <p class="rank">{{ userData.rank }}</p>
      <div class="userDetail">
        <h1><b>Name:</b> {{ userData.name }} {{ userData.surname }}</h1>
        <p><b>Experience:</b> {{ userData.experience }}</p>
        <p><b>Email:</b> {{ userData.email }}</p>
        <p><b>Description:</b> {{ userData.description }}</p>
      </div>
      <v-btn color="orange lighten-2" class="mt-12" @click="toggleEdit">
        Edit
      </v-btn>
    </v-row>

    <v-row justify="center" class="userEdit" v-else>
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
          type="password"
          label="Password"
          name="password"
          v-model="userData.password"
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
        <v-btn color="orange lighten-2" class="mt-12" type="submit">
          Update
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
  width: 70%;
  height: 70%;
  padding: 30px;
  margin: auto;
  margin-top: 35px;

  .rank {
    width: 50px;
    font-weight: 700;
  }
  .userDetail {
    background-color: lightgray;
    width: 100%;
    text-align: left;
    padding-left: 25px;

    .meter {
      height: 10px; /* Can be anything */
      width: 50%;
      position: relative;
      background: #555;
      padding: 10px;
      box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.3);
    }
    .meter > span {
      display: block;
      height: 100%;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      background-color: rgb(219, 181, 10);
      background-image: linear-gradient(
        center bottom,
        rgb(194, 154, 43) 37%,
        rgb(219, 221, 84) 69%
      );
      box-shadow: inset 0 2px 9px rgba(255, 255, 255, 0.3),
        inset 0 -2px 6px rgba(0, 0, 0, 0.4);
      position: relative;
      overflow: hidden;
    }
  }

  .userEdit {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;

    .v-form {
      width: 50%;
    }
  }
}
img {
  width: 140px;
  height: 140px;
  margin-bottom: 10%;
}
</style>
