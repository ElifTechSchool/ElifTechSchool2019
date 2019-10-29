<template>
<div>
    <v-btn @click="goBack" icon class="ms-6">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    
    <v-row class="mx-auto" align="center" styalign="center" justify="center">
      <v-col md="7">
        <v-card class="pl-3 pr-6 pb-4">
            <v-row>
              <v-col sm="3" md="3">
              <v-img
                position="center left"
                :src="event.image_url"
                alt="event image"
                max-width="250px"
                max-height="250px"
              />
            </v-col>
            <v-col md="9" class="float-left pa-2">
              <h2>{{ event.title }}</h2>
              <p class="grey--text mb-3">{{ $moment(event.created_at).format("HH:mm MMM Do YY") }}</p>
              <p class="mb-1">{{ event.description }}</p>
              <p class="mb-1"><b>Location:</b> {{ event.location }}</p>
              <p><b>Max number of people: </b> {{ event.max_people }}</p>
            </v-col>
              <v-card-actions>
                <v-btn @click="editDialog = true" text absolute right>
                  <v-icon>mdi-pencil</v-icon>
                  Edit
                </v-btn>
              </v-card-actions>
              <EditEvent
                :event="event"
                :show="editDialog"
                @hideModal="editDialog = false"
              ></EditEvent>
            </v-row>
        </v-card>
      </v-col>
    </v-row>
</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import EditEvent from "@/components/Events/EditEvent.vue";

export default {
  name: "eventDetails",
  components: {
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
      id: this.$route.params.id,
      event: {},
    };
  },
  computed: {
    ...mapGetters(["allEvents", "eventIsEmpty", "countOfPages", "eventsPageSize", "searchEvent", "eventById"])
  },
  methods: {
    ...mapActions(["getEventById"]),
    startEdit() {
      this.$router.push(`/events/${this.id}/edit`);
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.getEventById(this.$route.params.Eid).then(res => {
      this.event = res.data[0];
    });
  }
};
</script>

<style lang="scss">
.achivBtn {
  position: absolute;
  top: 10px;
  right: -28px;
}
</style>
