<template>
  <div class="user">
    <img :src="userData.image_url" alt="" />
    <p class="rank">{{ userData.rank }}</p>
    <div class="userDetail">
      <h5>{{ userData.name }} {{ userData.surname }}</h5>
      <div class="meter">
        <span :style="{ width: userData.experience + '%' }"></span>
      </div>
      <p>{{ userData.email }}</p>
    </div>
    <v-btn @click="goTodetail" color="primary">Details</v-btn>
    <v-btn @click="deleteUser" color="error">Delete</v-btn>
  </div>
</template>

<script>
export default {
  name: "User",
  props: ["userData"],
  methods: {
    deleteUser() {
      this.$store.dispatch("deleteUser", this.userData.id);
    },
    goTodetail(prodId) {
      this.$router.push({name:'userDetails', params:{Uid:this.userData.id}})
    }
  }
};
</script>

<style lang="scss" scoped>
.user {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 50%;
  margin: auto;
  margin-bottom: 15px;

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
}

img {
  width: 140px;
  height: 140px;
}
</style>
