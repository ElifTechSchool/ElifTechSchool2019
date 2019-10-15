import axios from "axios";

const state = {
<<<<<<< HEAD
        competitions: [],
        competition: [],
        countCompetitions: 0,
        
};

const getters = {
    getCompetitions : state => state.competitions,
    getCompetition : state => state.competition,
    getCountCompetitions: state => state.countCompetitions
    
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
=======
  competitions: [],
  competition: []
};

const getters = {
  getCompetitions: state => state.competitions,
  getCompetition: state => state.competition
};

const actions = {
  loadCompetitions({ commit }) {
    axios
      .get("competitions")
      .then(res => res.data)
      .then(competitions => {
        commit("getCompetitions", competitions);
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
        context.dispatch("loadCompetitions");
      })
      .catch(err => console.log(err));
  },
>>>>>>> e046ccfd1b0a0e04359206dee718aff47991460a

  updateCompetition(context, updateData) {
    axios
      .put("competitions/" + updateData.id, updateData)
      .then(() => {
        context.commit("getCompetitionById", updateData);
      })
      .catch(err => console.log(err));
  },

  deleteCompetition(context, id) {
    axios
      .delete("competitions/" + id)
      .then(() => {
        context.dispatch("loadCompetitions");
      })
      .catch(err => console.log(err));
  }
};

<<<<<<< HEAD
const mutations =  {
    getCompetitions: (state, competitions) => {
        state.competitions = competitions;
      },
    getCompetitionById: (state, competition) => {
        state.competition = competition;
    },
    setCountCompetitions: (state, countCompetitions) => {
      state.countCompetitions = countCompetitions;
    }
=======
const mutations = {
  getCompetitions: (state, competitions) => {
    state.competitions = competitions;
  },
  getCompetitionById: (state, competition) => {
    state.competition = competition;
  }
>>>>>>> e046ccfd1b0a0e04359206dee718aff47991460a
};

export default {
  state,
  getters,
  actions,
  mutations
};
