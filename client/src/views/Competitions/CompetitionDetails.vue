<template>
  <v-card class="mx-auto" max-width="400" color="#fcded9">
    <v-row key="1" justify="center" class="userInfo d-flex">
      <div v-for="competition in getCompetition" :key="competition.id">
        <v-col>
          <h2><b>Name:</b> {{ competition.name }}</h2>
          <p><b>Description:</b> {{ competition.description }}</p>
          <p>
            <b>Deadline_date:</b>
            {{ formatDateRead(competition.deadline_date) }}
          </p>
          <p><b>Experience:</b> {{ competition.experience }}</p>
        </v-col>
        <v-col v-if="$store.getters.userMe.user">
          <v-btn
            color="success"
            outlined
            @click="updateCompetition(competition.id)"
          >
            <i class="material-icons">
              create
            </i>
            Edit
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
          <div v-for="follower in getCompetitionFollowers" :key="follower.id">
            <a @click="toUserDetails(follower.user.id)">
              {{ `${follower.user.name} ${follower.user.surname}` }}
            </a>
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
        competitionId: null,
        userId: null
      }
    };
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
      if (followerProps !== null) {
        const userProps = followerProps;
      }
    },
    toUserDetails(userId) {
      this.$router.push({
        name: "userDetails",
        params: { Uid: userId }
      });
    }
  },
  mounted() {
    this.$store.dispatch("loadCompetitionById", this.$route.params.id);
    this.$store.dispatch("getSubscribedFollowers", this.$route.params.id);
  },
  created() {
    if (this.$store.getters.userMe.user) {
      this.dataFollower.userId = this.$store.getters.userMe.user.id;
      let followersId = this.$store.getters.getFollowers;

      for (let i = 0; i < followersId.length; i++) {
        if (this.$store.getters.userMe.user.id == followersId[i].userId) {
          this.hidden = true;
        }
      }
    } else {
      alert("Please login");
    }
  }
};
</script>
<style lang="scss" scoped>
.v-card {
  width: 50%;
  margin: 100px auto;
}
</style>
