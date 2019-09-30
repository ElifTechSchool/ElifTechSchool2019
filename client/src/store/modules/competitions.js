import axios from 'axios';


const state = {
        competitions: []
};

const getters = {
    getCompetitions : state => state.competitions,
    competitionById(state) {
        return id => state.competitions.find(el => el.id === id);
      }
    
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
      deleteCompetition({ dispatch }, id) {
        axios
          .delete("competitions/"+id)
          .then(dispatch("loadCompetitions"))
          .catch(err => console.log(err));
      }
};

const mutations =  {
    getCompetitions: (state, competitions) => {
        state.competitions = competitions;
      }
};

export default {
    state,
    getters,
    actions,
    mutations
};


// export default {
//     state: {
//         competitions: [],
//     },
//     mutations: {
//         getCompetitions(state, competitions) {
//             state.competitions = competitions;
//         },
//         getCompetitionById(state,competition) {
//             state.competitions = [];
//             state.competitions = competition;
//         },
       
//     },
//     actions: {
//         async fetchCompetitions(ctx) {
//             const res = await fetch("http://localhost:3000/api/v1/competitions/", {
//             method: "GET"
//             })
            
//             const competitions = await res.json();
            
//             ctx.commit("getCompetitions", competitions);
//         },
//         async fetchCompetitionById(ctx, id="") {
//             const res = await fetch("http://localhost:3000/api/v1/competitions/" + id, {
//             method: "GET"
//             })
            
//             const competition = await res.json();
            
//             ctx.commit("getCompetitionById", competition);
//         },

//         async deleteCompetition(ctx, id) {
//              await fetch("http://localhost:3000/api/v1/competitions/" + id, {
//                 method: "DELETE"
//                 });
//                 ctx.dispatch("fetchCompetitions");
                
//         },

//         async createCompetition(ctx, data) {
//             await fetch("http://localhost:3000/api/v1/competitions", {
//                 method: "POST",
//                 body: JSON.stringify(data),
//                 headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json'
//                 }
//                 });
//             ctx.dispatch("fetchCompetitions");       
//         },

//         async updateCompetition(ctx, data,) {
//             await fetch("http://localhost:3000/api/v1/competitions/"+ data.id, {
//                 method: "PUT",
//                 body: JSON.stringify(data),
//                 headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json'
//                 }
//                 });
//         },
        


//     },
//     getters: {
//         getCompetitions: state => {
//             return state.competitions;
//         },
//         getCompetition: state => {
//             return state.competition;
//         },
//     },
// }