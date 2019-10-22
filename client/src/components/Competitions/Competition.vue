<template>
  <v-row>
    <v-col>
<<<<<<< HEAD
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
=======
      <v-card class="mx-auto">
        <v-col col-8 @click="getDetails">
          <v-card-title>Name: {{ competitionData.name }}</v-card-title>
          <v-card-text
            >Description: {{ competitionData.description }}</v-card-text
          >
          <v-card-text>Deadline_date: {{ formatDateRead() }}</v-card-text>
          <v-card-text
            >Experience: {{ competitionData.experience }}</v-card-text
          >
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
>>>>>>> 4cd038b2e7fe774e6f0c2d02a4e62c871463b55b

                  <v-card-text>
                    You want delete comeptition, are you sure?
                  </v-card-text>

<<<<<<< HEAD
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
=======
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
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </template>
        </v-col>
      </v-card>
>>>>>>> 4cd038b2e7fe774e6f0c2d02a4e62c871463b55b
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    };
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

<<<<<<< HEAD
        return day + '/' + month + '/' + year;
    },
    
=======
      return day + "/" + month + "/" + year;
    }
>>>>>>> 4cd038b2e7fe774e6f0c2d02a4e62c871463b55b
  }
};
</script>
