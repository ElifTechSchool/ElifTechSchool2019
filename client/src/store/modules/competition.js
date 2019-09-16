export default {
    state: {
        competitions: []
    },
    mutations: {
        updateCompetitions(state, competitions) {
            state.competitions = competitions;
        }
    },
    actions: {
        async fetchCompetitions(ctx) {
            const res = await fetch("http://localhost:3000/api/v1/competitions", {
            method: "GET"
            })

            const competitions = await res.json()

            ctx.commit("updateCompetitions", competitions)
        }
    },
    getters: {
        getCompetitions(state){
            return state.competitions;
        }
    },
}