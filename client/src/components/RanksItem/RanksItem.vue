<template lang="html">
  <div>
    <v-hover v-slot:default="{ hover }" close-delay="200">
      <v-card max-width="400" class="mx-auto card" :elevation="hover ? 16 : 2">
        <v-list-item class="grow">
          <v-list-item-avatar size="65" class="grey lighten-2"><img :src="url">
          </v-list-item-avatar>
          <v-list-item-content class="align-self-start">
            <v-list-item-title class="headline mb-3">{{
              name
            }}
            </v-list-item-title>
            <v-list-item-subtitle>Exp: {{ experience }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-card-actions align="center">
          <div class="flex-grow-1"></div>
          <v-btn text @click.stop="editDialog = true">
            <v-icon>edit</v-icon>
            <span class="subheading">Edit</span>
          </v-btn>
          <v-btn text @click.stop="warnDialog = true">
            <v-icon>delete</v-icon>
            <span class="subheading">Delete</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-hover>
    <v-dialog v-model="editDialog" max-width="800">
      <v-card>
        <v-card-title class="headline">Edit rank</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field label="Name" v-model="rankName" :rules="nameRules" :counter="50" required></v-text-field>
            <v-text-field label="Experience" v-model="rankExp" type="number" min="0" required></v-text-field>
            <v-text-field label="Number in list" v-model="rankNum" type="number" min="1" required></v-text-field>
            <v-file-input prepend-icon="add_photo_alternate" v-model="rankImage" accept="image/png, image/jpeg"
              placeholder="Pick rank image">
            </v-file-input>
          </v-form>
        </v-card-text>
        <v-card-actions align="center">
          <div class="flex-grow-1"></div>
          <v-btn text @click="updateRank">
            <v-icon>save_alt</v-icon>
            <span class="subheading">Save</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <ModalBox :show="warnDialog"  @deleteItem="deleteRank" @hideModal="warnDialog = false"/>
  </div>
</template>

<script>
import ModalBox from "../ModalBox/ModalBox";
  export default {
    name: 'ranks-item',
     components: {
       ModalBox
     },
    props: ["id", "name", "experience", "number", "url", "imageId"],
    mounted() {

    },
    data() {
      return {
        editDialog: false,
        warnDialog: false,
        rankName: this.name, 
        nameRules: [
          v => !!v || "Name is required",
          v => (v && v.length <= 50) || "Name must be less than 50 characters"
        ],
        rankExp: this.experience,
        rankNum: this.number,
        rankImage: null
      }
    },
    methods: {
      updateRank() {
        if (this.$refs.form.validate()) {
          const formData = new FormData();
          formData.append('name', this.rankName);
          formData.append('experience', this.rankExp);
          formData.append('number', this.rankNum);
          formData.append('image',this.rankImage);
          
          this.$store.dispatch("updateRank", {id: this.id, data: formData});
          this.rankImage = null;
        }
      },
      deleteRank() {
        this.$store.dispatch("deleteRank", this.id);
      }
    }
  }

</script>

<style scoped lang="scss">
  .card {
    margin-bottom: 1rem;
  }

</style>
