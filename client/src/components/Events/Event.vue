<template lang="html">
  <div>
    <v-hover v-slot:default="{ hover }" close-delay="200">
      <v-card max-width="400" class="mx-auto card" :elevation="hover ? 16 : 2">
        <v-list-item class="grow">
          <v-list-item-avatar size="65" class="grey lighten-2"
            ><img :src="event.image_url" />
          </v-list-item-avatar>
          <v-list-item-content class="align-self-start">
            <v-list-item-title class="headline mb-3"
              >{{ event.title }}
            </v-list-item-title>
            <v-list-item-subtitle
              >Date: {{ event.date }}</v-list-item-subtitle
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
    <EditEvent
      :event="event"
      :show="editDialog"
      @hideModal="editDialog = false"
    />
    <ModalBox
      :show="warnDialog"
      @deleteItem="deleteEvent"
      @hideModal="warnDialog = false"
    />
  </div>
</template>

<script>
import ModalBox from "@/components/ModalBox/ModalBox.vue";
import EditEvent from "./EditEvent";
export default {
  name: "event",
  components: {
    ModalBox,
    EditEvent
  },
  props: {
    event: {
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
    deleteEvent() {
      this.$store.dispatch("deleteEvent", this.event.id);
    }
  }
};
</script>

<style scoped lang="scss">
.card {
  margin-bottom: 1rem;
}
</style>
