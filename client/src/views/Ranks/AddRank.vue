<template lang="html">
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md5>
        <v-card class="elevation-12">
          <v-card-title class="headline">Add rank</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                label="Name"
                v-model="name"
                :counter="50"
                required
              ></v-text-field>
              <v-text-field
                label="Experience"
                v-model="experience"
                type="number"
                min="0"
                required
              ></v-text-field>
              <v-file-input
                prepend-icon="add_photo_alternate"
                v-model="rankImage"
                accept="image/png, image/jpeg"
                placeholder="Pick rank image"
              >
              </v-file-input>
            </v-form>
          </v-card-text>
          <v-card-actions align="center">
            <div class="flex-grow-1"></div>
            <v-btn text @click="addRank">
              <v-icon>save_alt</v-icon>
              <span class="subheading">Submit</span>
            </v-btn>
            <v-btn text to="/ranks">
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
    name: 'add-rank',
    props: [],
    mounted() {
    },
    data() {
      return {
        name: '',
        nameRules: [
          v => !!v || "Name is required",
          v => (v && v.length <= 50) || "Name must be less than 50 characters"
        ],
        experience: '',
        rankImage: null
      }
    },
    methods: {
      addRank() {
        if (this.$refs.form.validate()) {
          const formData = new FormData();
          formData.append("name", this.name);
          formData.append("experience", this.experience);
          formData.append("image", this.rankImage);

          this.$store.dispatch("addRank", formData);
        }
      }
    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
.add-rank {
}
</style>
