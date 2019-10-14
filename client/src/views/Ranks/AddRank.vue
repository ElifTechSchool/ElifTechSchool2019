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
          
            :counter="50"
            required
          ></v-text-field>
          <v-text-field
            label="Experience"
        
            type="number"
            min="0"
            required
          ></v-text-field>
          <v-file-input
            prepend-icon="add_photo_alternate"
          
            accept="image/png, image/jpeg"
            placeholder="Pick rank image"
          >
          </v-file-input>
        </v-form>
      </v-card-text>
      <v-card-actions align="center">
        <div class="flex-grow-1"></div>
        <v-btn text @click="updateRank">
          <v-icon>save_alt</v-icon>
          <span class="subheading">Submit</span>
        </v-btn>
        <v-btn text @click="hideModal">
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

      }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
  .add-rank {

  }
</style>
