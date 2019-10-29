<template>
  <v-row>
    <v-col cols="4">
      <v-btn
        @click="goBack"
        color="grey"
        dark
        small
        top
        left
        fab
      >
        <i class="material-icons">
          keyboard_backspace
        </i>
      </v-btn>
    </v-col>
    <v-col cols="12">
         <v-card class="mx-auto" max-width="400">
            <v-row key="1" justify="center" class="userInfo d-flex">
              <div v-for="competition in getCompetition" :key="competition.id">
                <v-col>
                  <h2><b>Name:</b> {{ competition.name }}</h2>
                  <h2><b>Winner:</b> {{ competition.winner_id }}</h2>
                  <p><b>Description:</b> {{ competition.description }}</p>
                  <p>
                    <b>Deadline_date:</b>
                    {{ formatDateRead(competition.deadline_date) }}
                  </p>
                  <p><b>Experience:</b> {{ competition.experience }}</p>
                </v-col>
                <v-card-actions>
                  <v-btn v-if="isAdmin" color="success" outlined @click="updateCompetition(competition.id)">
                  <i class="material-icons">
                  create
                  </i> Edit
                  </v-btn>
                  <v-btn
                    v-if="isActive"
                    color="red lighten-2"
                    outlined
                    @click="subscribe(competition.id)"
                  >
                    <i class="material-icons">{{
                      hidden ? "person_add" :  "person_add_disabled" 
                    }}</i>
                    {{ hidden ? "Subscribe"  :  "Unsubscribe"}}
                  </v-btn>
                </v-card-actions>
                <v-col v-if="!isActive && isAdmin">
                  <v-form @submit.prevent="setCompetitionWinner()">
                  <v-select 
                  :items="items"
                  label="Winner id"
                  v-model="winnerData.winner_id"
                  required
                  outlined>
                  </v-select> 
                  <v-btn type="submit" color="success"> Set winner </v-btn>
                  </v-form>
                </v-col>
                <v-col>
                  <h4>Folllowers:</h4>
                  <div v-for="follower in getCompetitionFollowers" :key="follower.id">
                    <a @click="toUserDetails(follower.user.id)">
                      {{ `${follower.user.name} ${follower.user.surname} id: ${follower.user.id}` }}
                    </a>
                  </div>
                </v-col>
              </div>
            </v-row>
  </v-card>
    </v-col>
   
  </v-row>
  
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "CompetitionDetails",
  data() {
    return {
      hidden: true,
      isActive: false,
      isAdmin: false,
      showInput: false,
      items: [],
      dataFollower: {
        competitionId: null,
        userId: null
      }, 
      winnerData: {},
    };
  },
  computed: {
    ...mapGetters(["getCompetition", "getFollowers", "userMe",]),

    getCompetition() {
      return [this.$store.getters.getCompetition];
    },
    getCompetitionFollowers() {
      return this.$store.getters.getFollowers;
    },
    getUserMe() {
      return this.$store.getters.userMe.user;
    },
    // setItems() {
    //   const usersId = getCompetition.users;
    //   for(let i = 0; i < usersId.length; i++){
    //     this.items[items.length -1] = usersId[i].id;
    //   }
      
    // }
  },
  methods: {
    updateCompetition(competitionId) {
      this.$router.push({
        name: "editCompetition",
        params: { id: competitionId }
      });
    },
    formatDateRead(competitionDate) {
      const date = new Date(competitionDate);
      if ( date > new Date(Date.now())) {
        this.isActive = true;
      } 
      let month = date.getMonth();
      let day = date.getDate();
      let year = date.getFullYear();

      return day + "/" + month + "/" + year;
    },
    subscribeCompetition() {
      if (this.$store.getters.userMe.user.id) {
        this.$store.dispatch("subscribeFollower", this.dataFollower);
      }
    },

    unsubscribeCompetition() {
      this.$store.dispatch("unsubscribeFollower", this.dataFollower);
    },

    subscribe(competitionId) {
      this.dataFollower.competitionId = competitionId;

        if (this.hidden) {
          this.subscribeCompetition();
          alert("You are subscribed");
          this.hidden = false;
        } else {
          this.unsubscribeCompetition();
          alert("You are unsubscribed");
          this.hidden = true;
        }
    },
    userProps(followerProps) {
      if (followerProps !== null) {
        const userProps = followerProps;
      }
    },
    toUserDetails(userId) {
      this.$router.push({
        name: "userDetails",
        params: { Uid: userId }
        });
    },
    goBack() {
      this.$router.go(-1);
    },

    setCompetitionWinner() {
        this.winnerData.id = this.$route.params.id,
        this.$store.dispatch("setCompetitionWinner", this.winnerData);
        this.winnerData = {};
    },

  },
   mounted() {
    this.$store.dispatch("loadCompetitionById", this.$route.params.id);
    this.$store.dispatch("getSubscribedFollowers", this.$route.params.id);
  },
  created() {
    if( this.hidden == true) { 
        this.dataFollower.userId = this.userMe.user.id;
        const followersId = this.$store.getters.getFollowers;
        for (let i = 0; i < followersId.length; i++) {
          this.items[this.items.length] =followersId[i].user.id;
          if (this.$store.getters.userMe.user.id == followersId[i].userId) {
            this.hidden = false;
          } 
        }
    };
    if (this.$store.getters.meRole == 2 || this.$store.getters.meRole == 1) {
      this.isAdmin = true;
    };

    
      // const usersId = this.$store.getters.getFollowers;

      // const itemId = [];
      // for (let i =0; i < usersId.length; i++){
      //   itemId[itemId.length] = usersId[i].user;
      // }

      // console.log(itemId);  
      // console.log(usersId);
      // for(let i = 0; i < usersId.length; i++){
      //   this.items = usersId[i].id;
      // }
      
    
  }, 
  
};
</script>
<style lang="scss" scoped>
.v-card {
  width: 50%;
  margin: 100px auto;
}
</style>
