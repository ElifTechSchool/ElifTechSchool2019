<template>
  <v-card class="container-achievement">
    <div class="img-achievement">
      <img v-bind:src="photo_url">
    </div>
    <div class="info-block">
      <v-card-title>
        {{ name }} 
      </v-card-title>
      <v-card-text>
        {{ created_at }}
      </v-card-text>
    </div>
    <v-card-actions class="text-xs-right">
      <v-btn @click="showDetails" color="info">Details</v-btn>
      <v-btn @click="deleteAchievement" color="red accent-2">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "achievement",
  props: ["id", "name", "description", "type", "experience", "photo_url", "created_at"],
  methods: {
    showDetails() {
      this.$router.push({name:'achievementDetails', params: { id: this.id }})
    },
    deleteAchievement() {
      this.$store.dispatch("deleteAchievement", { id: this.id })
    }
  }
};
</script>

<style scoped lang="scss">
  .container-achievement {
    margin: 20px;
    display: table;
    background-color: #F0EFEF;

    .img-achievement{
      display: table-cell;
      text-align: left;
      width: 5%;

      img {
      width: 150px;
      height: 150px;
      margin: 10px;
      }
    }

    .info-block {
      display: table-cell;
      vertical-align: middle;
      text-align: left;

      div {
        padding: 5px;
      }

      .name {
        font-size: 20px;
      }
    }
  }
</style>
