<template lang="html">
  <div>
    <v-hover v-slot:default="{ hover }" close-delay="200">
      <v-card max-width="400" class="mx-auto card" :elevation="hover ? 16 : 2">
        <v-list-item class="grow">
          <v-list-item-avatar size="65" class="grey lighten-2"
            ><img :src="rank.photo_url" />
          </v-list-item-avatar>
          <v-list-item-content class="align-self-start">
            <v-list-item-title class="headline mb-3"
              >{{ rank.name }}
            </v-list-item-title>
            <v-list-item-subtitle
              >Exp: {{ rank.experience }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <v-card-actions align="center">
          <div class="flex-grow-1"></div>
          <v-btn text @click="editDialog = true">
            <v-icon>edit</v-icon>
            <span class="subheading">Edit</span>
          </v-btn>
          <v-btn text @click="warnDialog = true">
            <v-icon>delete</v-icon>
            <span class="subheading">Delete</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-hover>
    <EditModal
      :rank="rank"
      :show="editDialog"
      @hideModal="editDialog = false"
    />
    <ModalBox
      :show="warnDialog"
      @deleteItem="deleteRank"
      @hideModal="warnDialog = false"
    />
  </div>
</template>

<script>
import ModalBox from "../ModalBox/ModalBox";
import EditModal from "./EditModal";
export default {
  name: "ranks-item",
  components: {
    ModalBox,
    EditModal
  },
  props: {
    rank: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editDialog: false,
      warnDialog: false
    };
  },
  methods: {
    deleteRank() {
      this.$store.dispatch("deleteRank", this.rank.id);
    }
  }
};
</script>

<style scoped lang="scss">
.card {
  margin-bottom: 1rem;
}
</style>
