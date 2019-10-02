<template>
  <v-card class="competition" :elevation="5">
    <v-row key="1" v-if="!isEditing" class="userInfo d-flex">
      <div class="competitionDetail" v-for="competition in getCompetitions" :competitionData="competition" :key="competition.id">
        <h1>{{$route.params.id}}</h1>
        <h1><b>Name:</b> {{ competitionData.name }}</h1>
        <p><b>Description:</b> {{ competitionData.description }}</p>
        <p><b>Deadline_date:</b> {{ competitionData.deadline_date }}</p>
        <p><b>Experience:</b> {{ competitionData.experience }}</p>
      </div>
      <v-btn
        color="orange lighten-2"
        class="align-self-end"
        @click="toggleEdit"
      >
        Edit
      </v-btn>
    </v-row>

    <v-row key="2" justify="center" class="userEdit" v-else>
      <v-form @submit.prevent="updateUser">
        <v-text-field
          type="text"
          name="name"
          label="Name"
          v-model="competitionData.name"
          required
        />
        <v-text-field
          type="text"
          name="description"
          label="Description"
          v-model="competitionData.description"
          required
        />
        <v-text-field
          type="date"
          label="Deadline_date"
          name="deadline_date"
          v-model="competitionData.deeadline_date"
        />
        <v-text-field
          type="text"
          label="Experience"
          name="experience"
          v-model="competitionData.experience"
        />
        <v-btn color="orange lighten-2" class="bt" type="submit">
          Update
        </v-btn>
        <v-btn color="grey lighten-2" class="bt" @click="toggleEdit">
          Cancel
        </v-btn>
      </v-form>
    </v-row>
  </v-card>
</template>

<script>

export default {
  props: ["competitionData"],
  data() {
    return {
      isEditing: false
    };
  },
  computed: {
    getCompetitionById() {
      return this.$store.getters.getCompetitions;
    },
  },
  methods: {
    toggleEdit() {
      this.isEditing = !this.isEditing;
    },
  },
  mounted() {
    this.$store.dispatch("loadCompetitionById", this.$route.params.id);
  },
  
};
</script>
<style lang="scss" scoped>
.user {
  width: 50vw;
  height: 600px;
  padding: 40px;
  margin: auto;
  margin-top: 80px;

  .userInfo {
    display: flex;

    .v-btn {
      margin: 15px;
      margin-left: auto;
    }
  }
  .rank {
    width: 50px;
    font-weight: 700;
  }
  .userDetail {
    width: 350px;
    text-align: left;
  }

  .userEdit {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;

    .v-form {
      width: 50%;
    }
    .v-btn {
      margin: 10px;
    }
  }
}
img {
  width: 140px;
  height: 140px;
  margin-bottom: 30px;
}
</style>
