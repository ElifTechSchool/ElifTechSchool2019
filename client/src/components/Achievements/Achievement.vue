<template>
  <v-row align="center" justify="center">
    <v-col cols="9">
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
          <v-card-actions>
            <v-btn @click="confirmDelete" absolute right>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
            <Dialog :achievement="selectedAchievement" v-if='confirmModal' @confirm='deleteAchievement' @cancel="cancelDelete"></Dialog>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script>
import Dialog from "./Dialog"

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
  components: {
    Dialog
  },
  data() {
    return {
    selectedAchievement: null,
    confirmModal: false,
    }
  },
  methods: {
    showDetails() {
      this.$router.push({
        name: "achievementDetails",
        params: { id: this.id },
      });
    },
    confirmDelete(achievement) {
      this.selectedAchievement = achievement;
      this.confirmModal = true;
		},
		cancelDelete() {
			this.confirmModal = false;
			this.selectedAchievement = null;
		},
    deleteAchievement() {
      this.$store.dispatch("deleteAchievement", { id: this.id });
      this.selectedAchievement = null
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
   .appear-enter {
        opacity: 0;
    }
    
    .appear-enter .modal-window {
        transform: translate(-75%, -50%);
    }
    
    .appear-enter-active {
        transition: .5s;
    }
    
    .appear-leave-active .modal-window {
     transform: translate(0, -50%);
    }
    
    .appear-leave-active {
     opacity: 0;
     transition: .5s;
    }
</style>
