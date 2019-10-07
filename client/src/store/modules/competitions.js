import axios from 'axios';


const state = {
        competitions: [],
        competition: [],
};

const getters = {
    getCompetitions : state => state.competitions,
    getCompetition : state => state.competition,
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
        axios.post("competitions", newCompetition)
        .then( () => {
            context.dispatch("loadCompetitions")
        })
        .catch(err => console.log(err));
        
      },
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
          .delete("competitions/"+id)
          .then(() => {
              context.dispatch("loadCompetitions")
          })
          .catch(err => console.log(err));
      }
};

const mutations =  {
    getCompetitions: (state, competitions) => {
        state.competitions = competitions;
      },
    getCompetitionById: (state, competition) => {
        state.competition = competition;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};


