<template>
  <v-card class="user" :elevation="5">
    <transition name="fade">
    <v-row key="1" v-if="!isEditing" class="userInfo d-flex">
      <img :src="this.userData.image_url" alt="" />
      <p class="rank">{{ userData.rank }}</p>
      <div class="userDetail">
        <h1><b>Name:</b> {{ userData.name }} {{ userData.surname }}</h1>
        <p><b>Experience:</b> {{ userData.experience }}</p>
        <p><b>Email:</b> {{ userData.email }}</p>
        <p><b>Description:</b> {{ userData.description }}</p>
      </div>
      <div class="btn-wrapper">
        <v-btn
          color="orange lighten-2"
          @click="toggleEdit"
        >
          Edit
        </v-btn>
        <v-btn
          to="/users"
          color="grey lighten-2"
        >
          Go back
        </v-btn>
        <br>
        <v-btn
          color="primary lighten-2"
        >
          Change password
        </v-btn>
      </div>
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
    </transition>
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
    },
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

    .btn-wrapper{
      margin-left: auto;
    }
    .v-btn {
      margin: 5px 8px;
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
  opacity: 0;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transition: opacity .5s;
  opacity: 0;
}
</style>
