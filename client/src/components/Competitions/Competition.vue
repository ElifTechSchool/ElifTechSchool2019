<template>
  <v-row>
    <v-col>
      <v-card class="mx-auto" max-width="400" color="#fcded9" @click="getDetails">
        <v-card-title>Competition: {{ competitionData.name }}</v-card-title>
        <v-card-text class="text--primary">
          <div>Description: {{ competitionData.description }}</div>
          <div>Deadline_date: {{ formatDateRead() }}</div>
          <div>Experience: {{ competitionData.experience }}</div>
        </v-card-text>
          <v-card-actions v-if="this.$store.getters.userMe.user" > 
            <v-btn
              color="error"
              dark
              @click.stop="dialog = true"
            >
              DELETE
            </v-btn>
          </v-card-actions> 
          <v-col>
            <v-dialog
            v-model="dialog"
            max-width="400"
            
          >
            <v-card>
              <v-card-title class="headline">Delete competition {{ competitionData.name }} ?</v-card-title>

              <v-card-text>
                You want delete comeptition, are you sure?
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  color="yellow darken-1"
                  text
                  @click="dialog = false"
                >
                  Cancel
                </v-btn>

                <v-btn
                  color="red darken-1"
                  text
                  @click="deleteCompetition"
                >
                <i class="material-icons">
                  delete_forever
                </i>
                  Delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
