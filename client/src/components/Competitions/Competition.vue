<template>
  <v-row>
    <v-col>
      <v-card class="mx-auto" >
        <v-col col-8 @click="getDetails">
          <v-card-title>Name: {{ competitionData.name }}</v-card-title>
          <v-card-text>Description: {{ competitionData.description }}</v-card-text>
          <v-card-text>Deadline_date: {{ formatDateRead() }}</v-card-text>
          <v-card-text>Experience: {{ competitionData.experience }}</v-card-text>
          <v-card-actions> </v-card-actions>
        </v-col>
        <v-col>
          <template>
        <div class="text-right">
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on }">
              <v-btn color="red lighten-2" dark v-on="on">
              <i class="material-icons">delete</i>
                Delete
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title>
                Delete competition {{ competitionData.name }}
              </v-card-title>

              <v-card-text>
                You want delete comeptition, are you sure?
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="primary" text @click="dialog = false">
                  Cancel
                </v-btn>
                <v-btn
                  class="ma-2"
                  outlined
                  color="error"
                  @click="deleteCompetition"
                  >
                  <i class="material-icons">
                  delete_forever
                  </i>
                  Delete
                  </v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </template> 
      </v-col>   
    </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    }
  },
  name: "Competition",
  props: ["competitionData"],
  methods: {
    deleteCompetition() {
      this.$store.dispatch("deleteCompetition", this.competitionData.id);
      this.dialog = false;
    },
    getDetails() {
      this.$router.push({
        name: "competitionDetails",
        params: { id: this.competitionData.id }
      });
    },
    formatDateRead() {
        const date = new Date(this.competitionData.deadline_date);
        let month = date.getMonth();
        let day = date.getDate();
        let year = date.getFullYear();

        return day + '/' + month + '/' + year;
    },
  }
};
</script>
