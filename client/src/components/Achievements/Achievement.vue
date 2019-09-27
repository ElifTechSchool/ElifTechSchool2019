<template>
  <div class="container-achievement">
    <div class="img-achievement">
      <img v-bind:src="photo_url">
    </div>
    <div class="info-block">
      <div>
        {{ name }} 
      </div>
      <div>
        {{ created_at }}
      </div>
      <div>
        {{ id }}
      </div>
      </div>
    <v-btn @click="showDetails" class="show-details" color="#D7D6D6">Details</v-btn>
  </div>
</template>

<script>
export default {
  name: "achievement",
  props: ["id", "name", "description", "type", "experience", "photo_url", "created_at"],
  methods: {
    showDetails() {
      this.$router.push({name:'achievementDetails', params:{id: this.id}})
    }
  }
};
</script>

<style scoped lang="scss">
  .container-achievement {
    border: 1px solid black;
    border-radius: 20px;
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
