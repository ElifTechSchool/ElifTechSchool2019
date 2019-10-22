import axios from "axios";

const state = {
  competitions: [],
  competition: [],
  countCompetitions: 0,
  followers: []
};

const getters = {
  getCompetitions: state => state.competitions,
  getCompetition: state => state.competition,
  getCountCompetitions: state => state.countCompetitions,
  getFollowers: state => state.followers
};

const actions = {
  loadCompetitions(context, competitionParams) {
    axios
      .get("competitions", { params: competitionParams })
      .then(res => res.data)
      .then(data => {
        context.commit("getCompetitions", data.rows);
        context.commit("setCountCompetitions", data.count);
      })
      .catch(err => console.log(err));
  },

  loadCompetitionById(context, id) {
    axios
      .get(`competitions/${id}`)
      .then(res => res.data)
      .then(competition => {
        context.commit("getCompetitionById", competition);
      })
      .catch(err => console.log(err));
  },

  addCompetition(context, newCompetition) {
    axios
      .post("competitions", newCompetition)
      .then(() => {
        context.dispatch("loadCompetitions", { limit: 5, page: 1 });
      })
      .catch(err => console.log(err));
  },

  updateCompetition(context, updateData) {
    axios
      .put("competitions/" + updateData.id, updateData)
      .then(() => {
        context.commit("getCompetitionById", updateData);
      })
      .then(() => {
        context.dispatch("loadCompetitions", { limit: 5, page: 1 });
        context.dispatch("countCompetitions");
      })
      .catch(err => console.log(err));
  },

  deleteCompetition(context, id) {
    axios
      .delete("competitions/" + id)
      .then(() => {
        context.dispatch("loadCompetitions", { limit: 5, page: 1 });
        context.dispatch("countCompetitions");
      })
      .catch(err => console.log(err));
  },

  // Followers subscribe

  subscribeFollower(context, data) {
    axios
      .post(`competitions/${data.competition_id}/followers/`, data)
      .then(() => {
        context.dispatch("getSubscribedFollowers", data.competition_id);
      })
      .catch(err => console.log(err));
  },

  getSubscribedFollowers(context, competitionId) {
    axios
      .get(`competitions/${competitionId}/followers`)
      .then(res => res.data)
      .then(followers => {
        context.commit("setFollowers", followers);
      })
      .catch(err => console.log(err));
  },

  unsubscribeFollower(context, data) {
    axios
<<<<<<< HEAD
      .delete(`competitions/${data.competition_id}/followers/${data.userId}`)
      .then( () => {
=======
      .delete(`competitions/${data.competition_id}/followers/${data.user_id}`)
      .then(() => {
>>>>>>> 4cd038b2e7fe774e6f0c2d02a4e62c871463b55b
        context.dispatch("getSubscribedFollowers", data.competition_id);
      })
      .catch(err => console.log(err));
  }
};

const mutations = {
  getCompetitions: (state, competitions) => {
    state.competitions = competitions;
  },
  getCompetitionById: (state, competition) => {
    state.competition = competition;
  },
  setCountCompetitions: (state, countCompetitions) => {
    state.countCompetitions = countCompetitions;
  },
  setFollowers: (state, followers) => {
    state.followers = followers;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
