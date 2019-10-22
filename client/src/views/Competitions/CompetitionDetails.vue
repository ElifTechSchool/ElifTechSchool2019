<template>
  <v-card class="mx-auto" max-width="400" color="#fcded9">
    <v-row key="1" justify="center" class="userInfo d-flex">
<<<<<<< HEAD
      <div v-for="competition in getCompetition"  :key="competition.id">
        <v-col >
=======
      <div v-for="competition in getCompetition" :key="competition.id">
        <v-col>
>>>>>>> 4cd038b2e7fe774e6f0c2d02a4e62c871463b55b
          <h2><b>Name:</b> {{ competition.name }}</h2>
          <p><b>Description:</b> {{ competition.description }}</p>
          <p>
            <b>Deadline_date:</b>
            {{ formatDateRead(competition.deadline_date) }}
          </p>
          <p><b>Experience:</b> {{ competition.experience }}</p>
        </v-col>
<<<<<<< HEAD
        <v-col v-if="$store.getters.userMe.user" >
          <v-btn color="success" outlined @click="updateCompetition(competition.id)">
          <i class="material-icons">
          create
          </i> Edit
=======
        <v-col>
          <v-btn
            color="success"
            outlined
            @click="updateCompetition(competition.id)"
          >
            <i class="material-icons">
              create
            </i>
            Edit
>>>>>>> 4cd038b2e7fe774e6f0c2d02a4e62c871463b55b
          </v-btn>
          <v-btn
            color="red lighten-2"
            outlined
            @click="subscribe(competition.id)"
          >
            <i class="material-icons">{{
              hidden ? "person_add_disabled" : "person_add"
            }}</i>
            {{ hidden ? "Unsubscribe" : "Subscribe" }}
          </v-btn>
        </v-col>
        <v-col>
          <h4>Folllowers:</h4>
<<<<<<< HEAD
          <div  v-for="follower in getCompetitionFollowers"  :key="follower.id">
            <a @click="toUserDetails(follower.user.id)">
              {{`${follower.user.name} ${follower.user.surname}`}}
            </a>
               
=======
          <div v-for="follower in getCompetitionFollowers" :key="follower.id">
            <p>userId: {{ follower.user_id }}</p>
>>>>>>> 4cd038b2e7fe774e6f0c2d02a4e62c871463b55b
          </div>
        </v-col>
      </div>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "CompetitionDetails",
  data() {
    return {
      hidden: false,
      dataFollower: {
<<<<<<< HEAD
        competitionId: null,
        userId: null,
      },
      
      
    }
=======
        competition_id: null,
        user_id: 153
      }
    };
>>>>>>> 4cd038b2e7fe774e6f0c2d02a4e62c871463b55b
  },
  computed: {
    getCompetition() {
      return [this.$store.getters.getCompetition];
    },
    getCompetitionFollowers() {
      return this.$store.getters.getFollowers;
    }
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
      let month = date.getMonth();
      let day = date.getDate();
      let year = date.getFullYear();

      return day + "/" + month + "/" + year;
    },
    subscribeCompetition() {
      this.$store.dispatch("subscribeFollower", this.dataFollower);
    },

    unsubscribeCompetition() {
      this.$store.dispatch("unsubscribeFollower", this.dataFollower);
    },

    subscribe(competitionId) {
<<<<<<< HEAD
      

            this.dataFollower.competitionId = competitionId;
      
        if (this.hidden == false) {
          this.subscribeCompetition();
          alert("You are subscribed");
          this.hidden = true;
        } else {
          this.unsubscribeCompetition();
          alert("You are unsubscribed");
          this.hidden = false;
        }
    },
    userProps(followerProps) {
      if(followerProps !== null) {
        const userProps = followerProps;
      }
    },
    toUserDetails(userId) {
      this.$router.push({
        name: "userDetails",
        params: { Uid: userId }
        });
=======
      this.dataFollower.competition_id = competitionId;

      if (this.hidden == false) {
        this.subscribeCompetition();
        alert("You are subscribed");
        this.hidden = true;
      } else {
        this.unsubscribeCompetition();
        alert("You are unsubscribed");
        this.hidden = false;
      }
>>>>>>> 4cd038b2e7fe774e6f0c2d02a4e62c871463b55b
    }
  },
  mounted() {
    this.$store.dispatch("loadCompetitionById", this.$route.params.id);
    this.$store.dispatch("getSubscribedFollowers", this.$route.params.id);
<<<<<<< HEAD
  },
  created() {
     
    if (this.$store.getters.userMe.user) {
    this.dataFollower.userId = this.$store.getters.userMe.user.id;
    let followersId = this.$store.getters.getFollowers;

      for(let i=0; i < followersId.length; i++){
        if (this.$store.getters.userMe.user.id == followersId[i].userId )  {
            this.hidden = true;
          }
      }
     
    } else {
        alert("Please login");
    }
    
  }
}
=======
  }
};
>>>>>>> 4cd038b2e7fe774e6f0c2d02a4e62c871463b55b
</script>
<style lang="scss" scoped>
.v-card {
  width: 50%;
  margin: 100px auto;
}
</style>
