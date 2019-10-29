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
      items: [],
      ownAchievs: [],
    };
  },
  computed: {},
  methods: {
    hideModal() {
      this.$emit("hideModal");
    },
    saveUserAchiv() {
      const id = this.$route.params.Uid || this.$route.params.id;
      
      if (this.type === "achiv") {
        const achievData = this.select.map(el => el.value);
        const exp = this.select.map(el => el.experience);
        const expData = exp.reduce((a, b) => a + b);
        if(JSON.stringify(this.select.map(el => el.value)) !== JSON.stringify(this.ownAchievs.map(el => el.id))){
          this.$store.dispatch("addExperienceToUser", { expData, id });
          this.$store.dispatch("addAchievToUser", {
            id: id,
            achievData: achievData,
          });
        }
      } 
      else if (this.type === "users") {
        this.$store.dispatch("addUsersToAchiev", {
          id: id,
          users: data
        });
      }
      this.hideModal();
    }
  },
  async created() {
    if (this.type === "achiv") {
      this.ownAchievs = await this.$store.dispatch("getOwnAchievements", this.$route.params.Uid);
      const allAchievs = await this.$store.dispatch("getAllAchiev");
      this.select = this.ownAchievs.map(
        el => {
          return {
            text: el.name,
            value: el.id,
            experience: el.experience,
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
