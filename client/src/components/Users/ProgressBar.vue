<template>
  <v-row>
    <v-col md="11" sm="10">
      <v-col md="12" sm="12">
      <v-progress-linear
        :value="progress"
        color="primary lighten-2"
        height="10"
      ></v-progress-linear>
    </v-col>
    <v-row justify="space-between">
      <v-col md="6">
        <h4 id="current">{{ rank.current.name }}</h4>
      </v-col>
      <v-col md="6">
        <h4 id="next">{{ rank.next === null ? "" : rank.next.name }}</h4>
      </v-col>
    </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ProgressBar",
  props: ["rank", "userExperience"],
  computed: {
    progress() {
      if (this.rank.next === null) {
        return 100;
      }
      else {
        return Math.round(
          ((this.userExperience - this.rank.current.experience) /
            (this.rank.next.experience - this.rank.current.experience)) *
            100
        );
      }
    }
  },
  created() {
    if (!this.rank.current){
        this.rank.current = {
          experience: 0,
          name: ' ',
        }
    }
  },
};
</script>

<style lang="scss" scoped>
.row {
  width: 100%;
  margin: 0;
}
#current {
  text-align: left;
}
#next {
  text-align: right;
}
.col {
  padding: 0;
}
</style>
