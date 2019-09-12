import axios from 'axios';

const state = {
    ranks: []
}

const getters = {
    allRanks: state => state.ranks
}

const mutations = {
    setRanks: (state, payload) => {
        state.ranks = payload
    },
    addRank: (state, payload) => {
        state.ranks.push(payload)
    }
}

const actions = {
     async getAllRanks({ commit }) {
        try {
            const response = await axios.get();
            if(response.status == 200){
                commit('setRanks', response)
            }
        } catch (error) {
            console.log(error)
        }
    },
    async addRank({ commit }, rank) {
        try {
            const response = await axios.post('',rank);
            if(response.status == 200){
                commit('addRank', response)
            }
        } catch (error) {
            console.log(error)
        } 
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}