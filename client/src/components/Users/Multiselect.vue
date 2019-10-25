<template>
  <v-dialog v-model="show" persistent max-width="600">
    <v-card class="pa-9">
      <h2>Set user's achievements</h2>
      <br />
      <v-combobox
        v-model="select"
        :items="items"
        :label="type"
        multiple
        chips
        deletable-chips
        outlined
      ></v-combobox>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn text @click="hideModal">Cancel</v-btn>
        <v-btn color="primary" text @click="saveUserAchiv">Save changes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "Multiselect",
  props: ["type", "show"],
  data() {
    return {
      select: [],
      items: []
    };
  },
  computed: {},
  methods: {
    filter(item, queryText, itemText) {
      if (item.header) return false;

      const hasValue = val => (val != null ? val : "");

      const text = hasValue(itemText);
      const query = hasValue(queryText);

      return (
        text
          .toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      );
    },
    hideModal() {
      this.$emit("hideModal");
    },
    saveUserAchiv() {
      const id = this.$route.params.Uid || this.$route.params.id;
      if (this.type === "achiv") {
        //TODO
        console.log(this.select);
      } else if (this.type === "users") {
        console.log(this.select);

        this.$store.dispatch("addUsersToAchiev", {
          id: id,
          users: this.select
        });
      }
    }
  },
  async created() {
    if (this.type === "achiv") {
      const data = await this.$store.dispatch("getAllAchiev");
      this.items = data.map(
        el => {
          return {
            text: el.name,
            value: el.id,
          }
        }
      );
    } else if (this.type === "users") {
      this.select = await this.$store.dispatch("getUsersByAchiev", this.$route.params.id);
      await this.$store.dispatch("loadUsers", {});
      this.items = this.$store.getters.users.map(el => {
        return {
          text: el.name + " " + el.surname,
          value: el.id
        };
      });
    }
  }
};
</script>
