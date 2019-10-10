<template lang="html">
  <v-dialog v-model="show" persistent max-width="800">
    <v-card>
      <v-card-title class="headline">Edit rank</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            label="Name"
            v-model="rank.name"
            :rules="nameRules"
            :counter="50"
            required
          ></v-text-field>
          <v-text-field
            label="Experience"
            v-model="rank.experience"
            type="number"
            min="0"
            required
          ></v-text-field>
          <v-text-field
            label="Number in list"
            v-model="rank.number"
            type="number"
            min="1"
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
        <v-btn text @click="updateRank">
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
  name: 'edit-modal',
  props: {
    rank: {
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
      editRank: null,
      rankImage: null,
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 50) || "Name must be less than 50 characters"
      ],
    }
  },
  methods: {
    updateRank() {
      if (this.$refs.form.validate()) {
        const formData = new FormData();
        formData.append("name", this.editRank.name);
        formData.append("experience", this.editRank.experience);
        formData.append("number", this.editRank.number);
        formData.append("image", this.rankImage);

        this.$store.dispatch("updateRank", {
          id: this.rank.id,
          data: formData
        });
        this.hideModal();
      }
    },
    hideModal() {
      this.$emit("hideModal")
    },
  },
}
</script>

<style scoped lang="scss"></style>
