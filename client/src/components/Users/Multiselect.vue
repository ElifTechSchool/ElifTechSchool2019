<template>
    <v-combobox
          v-model="select"
          :items="items"
          :label="type"
          multiple
          chips
          deletable-chips outlined
    ></v-combobox>
</template>
<script>
export default {
    name: "Multiselect",
    props: ["type"],
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