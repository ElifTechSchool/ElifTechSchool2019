<template>
  <v-row>
    <v-col>
      <v-card
        v-bind:class="{active: isActive } "
        max-width="400"
        @click="getDetails"
      >
        <v-card-title>Competition: {{ competitionData.name }}</v-card-title>
        <v-card-text class="text--primary">
          <div>Description: {{ competitionData.description }}</div>
          <div>Deadline_date: {{ formatDateRead() }}</div>
          <div>Experience: {{ competitionData.experience }}</div>
          <h4>Followers:</h4>
          <v-col>
            <v-row>
            <div v-for="users in competitionData.users" :key="users.id" >
              <v-avatar size="36px">
                <img 
                  :title="`${users.name} ${users.name}`"
                  :src="users.image_url"
                  :alt="`${users.name} ${users.name}`"
                >
              </v-avatar>
            </div>
          </v-row>
          </v-col>
        </v-card-text>
          <v-card-actions v-if="isActive" > 
            <v-btn
              color="error" 
              dark
              outlined
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
              <v-card-title class="headline"
                >Delete competition {{ competitionData.name }} ?</v-card-title
              >

              <v-card-text>
                You want delete comeptition, are you sure?
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="yellow darken-1" text @click="dialog = false">
                  Cancel
                </v-btn>

                <v-btn color="red darken-1" text @click="deleteCompetition">
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
      hover: false,
      isActive: false,
    };
  },
  name: "Competition",
  props: ["competitionData"],

  methods: {
    deleteCompetition() {
      if(this.$store.getters.userMe.user.id == this.competitionData.owner_id) {
          this.$store.dispatch("deleteCompetition", this.competitionData.id);
          this.dialog = false;
      } alert("Can`t, delete competition. You are not the owner of the competition");
      
    },
    getDetails() {
      this.$router.push({
        name: "competitionDetails",
        params: { id: this.competitionData.id }
      });
    },
    formatDateRead() {
      const date = new Date(this.competitionData.deadline_date);
      let month = date.getMonth()+1;
      let day = date.getDate();
      let year = date.getFullYear();
      return day + '/' + month + '/' + year;
    },
  },
  created () {
    if (new Date(this.competitionData.deadline_date) > new Date(Date.now())) {
        this.isActive = true;
      } 
  }
};
</script>

// <style lang="scss" scoped>
.active {
  background: #C8E6C9;
}
</style>