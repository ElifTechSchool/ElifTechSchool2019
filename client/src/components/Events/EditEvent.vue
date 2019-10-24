<template lang="html">
  <v-dialog v-model="show" persistent max-width="800">
    <v-card>
      <v-card-title class="headline">Edit event</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            label="Title"
            v-model="editEvent.title"
            :rules="nameRules"
            :counter="50"
            required
          ></v-text-field>
          <v-text-field
            label="Description"
            v-model="editEvent.description"
            :counter="1000"
            required
          ></v-text-field>
          <v-text-field
            label="Location"
            v-model="editEvent.location"
            :rules="nameRules"
            :counter="80"
            required
          ></v-text-field>
          <v-text-field
            label="Max people:"
            v-model="editEvent.max_people"
            type="number"
            min="0"
            required
          ></v-text-field>
          <v-file-input
            prepend-icon="add_photo_alternate"
            v-model="eventImage"
            accept="image/png, image/jpeg"
            placeholder="Pick event image"
          >
          </v-file-input>
        </v-form>
      </v-card-text>
      <v-card-actions align="center">
        <div class="flex-grow-1"></div>
        <v-btn text @click="updateEvent">
          <v-icon>save_alt</v-icon>
          <span class="subheading">Save</span>
        </v-btn>
        <v-btn text @click="hideModal">
          <v-icon>close</v-icon>
          <span class="subheading">Close</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="js">
export default {
  name: 'edit-event',
  props: {
    event: {
      type: Object,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
        editEvent: { ...this.event },
        eventImage: null,
        nameRules: [
          v => !!v || "Title is required",
          v => (v && v.length <= 50) || "Title must be less than 50 characters"
        ],
      }
  },
  methods: {
    updateEvent() {
      if (this.$refs.form.validate()) {
        const formData = new FormData();
        formData.append("title", this.editEvent.title);
        formData.append("description", this.editEvent.description);
        formData.append("location", this.editEvent.location);
        formData.append("max_people", this.editEvent.max_people);
        formData.append("image", this.eventImage);

        this.$store.dispatch("updateEvent", {
          id: this.event.id,
          data: formData
        });
        this.hideModal();
      }
    },
    hideModal() {
      this.editEvent = { ...this.event }
      this.eventImage = null
      this.$emit("hideModal")
    }
  },
}
</script>

<style scoped lang="scss"></style>
