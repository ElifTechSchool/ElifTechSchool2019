<template lang="html">
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md5>
        <v-card class="elevation-12">
          <v-card-title class="headline">Add event</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                label="Title"
                v-model="title"
                :rules = "titleRules"
                :counter="50"
                required
              ></v-text-field>
          <v-text-field
            label="Description"
            v-model="description"
            :rules = "descriptionRules"
            required
          ></v-text-field>
              <v-text-field
                label="Location"
                v-model="location"
                :rules="locationRules"
                :counter="80"
                required
          ></v-text-field>
          <v-text-field
            label="Max people:"
            v-model="max_people"
            type="number"
            min=0
            required
            :rules = "maxPeopleRules"
          ></v-text-field>
              <v-file-input
                prepend-icon="add_photo_alternate"
                v-model="eventImage"
                accept="image/png, image/jpeg"
                placeholder="Pick event image"
                required
              >
              </v-file-input>
            </v-form>
          </v-card-text>
          <v-card-actions align="center">
            <div class="flex-grow-1"></div>
            <v-btn text @click="addEvent">
              <v-icon>save_alt</v-icon>
              <span class="subheading">Submit</span>
            </v-btn>
            <v-btn text to="/events">
              <v-icon>close</v-icon>
              <span class="subheading">Cancel</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="js">
  export default  {
    name: 'add-event',
    props: [],
    mounted() {
    },
    data() {
      return {
        title: '',
        titleRules: [
          v => !!v || "Title is required",
          v => (v && v.length <= 50) || "Title must be less than 50 characters"
        ],
        locationRules: [
          v => !!v || "Location is required",
          v => (v && v.length <= 80) || "Title must be less than 80 characters"
        ],
        descriptionRules: [
          v => !!v || "Description is required",
        ],
        maxPeopleRules: [
          v => !!v || "Max count of people is required",
        ],
        eventImage: null,
        max_people: null,
        location: '',
        description: '',
      }
    },
    methods: {
      addEvent() {
        if (this.$refs.form.validate()) {
          const formData = new FormData();
          formData.append("title", this.title);
          formData.append("description", this.description);
          formData.append("location", this.location);
          formData.append("max_people", this.max_people);
          formData.append("image_url", this.eventImage);

          this.$store.commit("addEvent", formData);
          this.$router.push({ path: '/events' });
        }
      }
    },
    computed: {

    }
}
</script>

<style scoped lang="scss">


</style>
