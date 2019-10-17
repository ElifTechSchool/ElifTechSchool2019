import axios from "axios";

const state = {
        competitions: [],
        competition: [],
        countCompetitions: 0,
        followers: [],
        
};

const getters = {
    getCompetitions : state => state.competitions,
    getCompetition : state => state.competition,
    getCountCompetitions: state => state.countCompetitions,
    getFollowers: state => state.followers,
    
}; 

const actions = {
  loadCompetitions(context, competitionParams) {
    axios 
      .get("competitions", { params: competitionParams})
      .then(res => res.data)
      .then(competitions => {
        context.commit("getCompetitions", competitions);
      })
      .then( () => {
        context.dispatch("countCompetitions");
      })
      .catch(err => console.log(err));
  },

  countCompetitions(context) {
    axios
      .get("competitions", { params: {limit: 10000, page: 1}})
      .then(res => res.data)
      .then(competitions => {
        context.commit("setCountCompetitions", competitions.length);
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
    axios.post("competitions", newCompetition)
    .then( () => {
        context.dispatch("loadCompetitions", {limit: 5, page: 1})
    })
    .catch(err => console.log(err));
  },

  updateCompetition(context, updateData) {
    axios
      .put("competitions/" + updateData.id, updateData)
      .then(() => {
        context.commit("getCompetitionById", updateData);
      })
      .then( () => {
        context.dispatch("loadCompetitions", {limit: 5, page: 1});
        context.dispatch("countCompetitions");
      })
      .catch(err => console.log(err));
  },

  deleteCompetition(context, id) {
    axios
      .delete("competitions/" + id)
      .then(() => {
        context.dispatch("loadCompetitions", {limit: 5, page: 1});
        context.dispatch("countCompetitions");
      })
      .catch(err => console.log(err));
  },


  // Followers subscribe
  
  subscribeFollower(context, data){
    axios
      .post(`competitions/${data.competitionId}/followers`, data )
      .then( () => {
        context.commit("getCompetitionById", competition);
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

  unsubscribeFollower(context, data){
    axios
      .delete(`competitions/${data.competitionId}/followers/${data.userId}`)
      .then( () => {
        context.commit("getCompetitionById", competition);
      })
      .catch(err => console.log(err));
  },

};

const mutations =  {
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
