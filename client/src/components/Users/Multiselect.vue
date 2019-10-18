<template>
  <v-dialog v-model="show" persistent max-width="600">
    <v-card class="pa-9">
      <h2>Set user's achievements</h2>
      <br>
      <v-combobox
          v-model="select"
          :items="items"
          :label="type"
          multiple
          chips
          deletable-chips outlined
      ></v-combobox>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn text @click="hideModal">Cancel</v-btn>
        <v-btn color="primary" text @click="saveUserAchiv"
          >Save changes</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
    name: "Multiselect",
    props: ["type","show"],
    data() {
        return {
            select: [],
            items: [],
        }
    },
    computed: {
    },
  methods: {
    filter (item, queryText, itemText) {
      if (item.header) return false

      const hasValue = val => val != null ? val : ''

      const text = hasValue(itemText)
      const query = hasValue(queryText)

      return text.toString()
        .toLowerCase()
        .indexOf(query.toString().toLowerCase()) > -1
    },
    hideModal() {
      this.$emit("hideModal")
    },
    saveUserAchiv() {
        const id = this.$route.params.Uid;
        console.log(this.select);

    },
  },
  async created() {
    if(this.type === "achiv"){
        await this.$store.dispatch("getAllAchievements");
        this.items = this.$store.getters.allAchievements.map(el => el.text = el.name);
    } 
    else if(this.type === "users"){
        await this.$store.dispatch("loadUsers", {});
        this.items = this.$store.getters.users.map(el => el.text = el.name);
    }
    console.log(this.items)
  },
}
</script>