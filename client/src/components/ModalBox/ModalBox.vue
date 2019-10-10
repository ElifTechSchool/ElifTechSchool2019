<template lang="html">
  <v-dialog v-model="show" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">Are you sure?</v-card-title>
      <v-card-text
        >Do you really want to delete this record? This process cannot be
        undone.</v-card-text
      >
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="red" text @click="deleteItem">Delete</v-btn>
        <v-btn text @click="hideModal">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="js">
export default {
  name: 'modal-box',
  props: ["show", "actionName", "id"],
  mounted() {

  },
  data() {
    return {
    }
  },
  methods: {
    deleteItem() {
      this.$emit("deleteItem")
    },
    hideModal() {
      this.$emit("hideModal")
    }
  }
}
</script>

<style scoped lang="scss"></style>
