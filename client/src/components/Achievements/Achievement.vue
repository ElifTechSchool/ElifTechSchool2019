<template>
  <v-row align="center" justify="center">
    <v-col cols="5">
      <v-hover v-slot:default="{ hover }">
        <v-card :elevation="hover ? 12 : 2">
          <div @click="showDetails" class="container-achievement">
            <div class="img-achievement">
              <img v-bind:src="photo_url" />
            </div>
            <div class="info-block">
              <v-card-title>
                {{ name }}
              </v-card-title>
              <v-card-text>
                {{ created_at }}
              </v-card-text>
            </div>
          </div>
          <template>
            <v-layout row justify-center>
              <v-dialog persistent max-width="600" v-model="confirmModal">
                <template v-slot:activator="{ on }">
                  <v-col>
                    <v-btn v-on="on" color="red">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </template>
                <v-card>
                  <v-card-title
                    >Are you sure to delete {{ name }} achievement
                    ?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="confirmModal = false" color="red"
                      >Cancel</v-btn
                    >
                    <v-btn @click="deleteAchievement" color="green"
                      >Delete</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
          </template>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "achievement",
  props: [
    "id",
    "name",
    "description",
    "type",
    "experience",
    "photo_url",
    "created_at"
  ],

  data() {
    return {
      confirmModal: false
    };
  },
  methods: {
    showDetails() {
      this.$router.push({
        name: "achievementDetails",
        params: { id: this.id }
      });
    },
    deleteAchievement() {
      this.$store.dispatch("deleteAchievement", { id: this.id });
    }
  }
};
</script>

<style scoped lang="scss">
.container-achievement {
  margin: 20px;
  display: table;
  cursor: pointer;

  .img-achievement {
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

    .name {
      font-size: 20px;
    }
  }
}
</style>
