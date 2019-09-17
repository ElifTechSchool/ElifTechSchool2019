import Vue from "vue";
import Vuex from "vuex";
import users from "./modules/users";

Vue.use(Vuex);
import fs from 'fs';
import axios from 'axios';
export default new Vuex.Store({
  state: {
    users: ['Hello'],
  },
  
  getters: {
    users: state => state.users
  },
  
  mutations: {
      setUsers: (state, users) => {
        state.users = users;
      },
      addUser: (state, newUser) => {
        state.users.push(newUser);
      },
  },
  
  actions: {
      loadUsers ({ commit }) {
          axios
          .get('http://localhost:3000/api/v1/users')
          .then(res => res.data)
          .then(users => {
            commit('setUsers', users);
          })
      },
      submitUser({commit}, newUser) {
        axios
        .post('http://localhost:3000/api/v1/users', newUser)
        .then(commit('addUser', newUser))
      },
      deleteUser({commit, state}, id) {
        axios
        .delete(`http://localhost:3000/api/v1/users/${id}`)
        .then(commit ('setUsers', state.users.filter((user) => user.id !== id)))
      }
  },
});