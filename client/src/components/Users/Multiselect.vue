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
    hideModal() {
      this.$emit("hideModal");
    },
    saveUserAchiv() {
      const id = this.$route.params.Uid || this.$route.params.id;
      const data = this.select.map(el => el.value);

      if (this.type === "achiv") {
        console.log(data);
        this.$store.dispatch("addAchievToUser", {
          id: id,
          achievData: data
        });
      } else if (this.type === "users") {
        console.log(data);
        this.$store.dispatch("addUsersToAchiev", {
          id: id,
          users: data
        });
      }
    }
  },
  async created() {
    if (this.type === "achiv") {
      const data = await this.$store.dispatch("getOwnAchievements", this.$route.params.Uid);
      const allAchievs = await this.$store.dispatch("getAllAchiev");
      this.select = data.map(
        el => {
          return {
            text: el.name,
            value: el.id,
          }
        }
      );
      this.items = allAchievs.map(
        el => {
          return {
            text: el.name,
            value: el.id,
          }
        }
      );
    } 
    else if (this.type === "users") {
      const data = await this.$store.dispatch("getUsersByAchiev", this.$route.params.id);
      await this.$store.dispatch("loadUsers", {});

      this.items = this.$store.getters.users.map(el => {
        return {
          text: el.name + " " + el.surname,
          value: el.id
        };
      });

      this.select = this.items.filter((item) => {
        return data.includes(item.value); 
      })
    }
  }
};
</script>
