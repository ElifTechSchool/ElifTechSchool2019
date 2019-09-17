export default {
    state: {
        competitions: []
    },
    mutations: {
        getCompetitions(state, competitions) {
            state.competitions = competitions;
        },
        getCompetitionById(state,competition) {
            state.competitions = competition;
        }
    },
    actions: {
        async fetchCompetitions(ctx) {
            const res = await fetch("http://localhost:3000/api/v1/competitions/", {
            method: "GET"
            })
            
            const competitions = await res.json();
            
            ctx.commit("getCompetitions", competitions);
        },
        async fetchCompetitionById(ctx, id="") {
            const res = await fetch("http://localhost:3000/api/v1/competitions/" + id, {
            method: "GET"
            })
            
            const competition = await res.json();
            
            ctx.commit("getCompetitionById", competition);
        },
    },
    getters: {
        getCompetitions(state){
            return state.competitions;
        }
    },
}