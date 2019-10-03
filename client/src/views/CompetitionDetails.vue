<template>
  <v-card class="competition" >
    <v-row key="1" v-if="!isShow" justify="center" class="userInfo d-flex">
      <div v-for="competition in getCompetition" :key="competition.id">
        <h2><b>Name:</b> {{ competition.name }}</h2>
        <p><b>Description:</b> {{ competition.description }}</p>
        <p><b>Deadline_date:</b> {{ competition.deadline_date }}</p>
        <p><b>Experience:</b> {{ competition.experience }}</p>
      </div>
      <v-btn  color="success" outlined  @click.native="isShow = !isShow">
        <v-icon left>mdi-pencil</v-icon> Edit
      </v-btn>
      <v-btn color="red lighten-2" outlined  @click="hidden = !hidden" >
        <i class="material-icons">{{hidden ? "work_off" : "work"}}</i>
          {{hidden ? "Unsubscribe" : "Subscribe"}}
      </v-btn>
    </v-row>
    <v-row key="2" justify="center" class="userEdit" v-else>
      <div v-for="competition in getCompetition" :key="competition.id">
      <v-form @submit.prevent="updateCompetition(competition)">
        <v-text-field
          name="name"
          label="Name"
          v-model="competition.name"
          required
        />
        <v-text-field
          type="text"
          label="Description"
          name="description"
          v-model="competition.description"
        />
        <v-text-field
          type="time-date"
          label="Deadlne_date"
          name="deadline_date"
          v-model="competition.deadline_date"
        />
        <v-text-field
          type="text"
          label="Experience"
          name="experience"
          v-model="competition.experience"
        />
        <v-btn color="orange lighten-2" class="bt" type="submit">
          Update
        </v-btn>
        <v-btn color="grey lighten-2" class="bt" @click="isShow = !isShow">
          Cancel
        </v-btn>
      </v-form>
      </div>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions } from "vuex"

export default {
  name: "CompetitionDetails",
  data() {
    return {
      isShow: false,
      competition: {
                id: "",
                name: "",
                description: "",
                deadline_date: "",
                experience: "" 
      },
      hidden: false,
      button: {
        text: "Subscribe",
        icon: "work",
        click: false,
      },
    };
  },
  computed: {
    getCompetition() {
      return [this.$store.getters.getCompetition];
    },
  },
  methods: 

    mapActions(["updateCompetition"])

  ,
  
  mounted() {
    this.$store.dispatch("loadCompetitionById", this.$route.params.id);
  },
  
  
  
  
};
</script>


