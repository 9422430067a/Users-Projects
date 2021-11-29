import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
import localStoragePlugin from '../plugins/localStorage'
import {uid} from '../plugins/uidGenerator'

const users = JSON.parse(localStorage.getItem('users')) || [];
const projects = JSON.parse(localStorage.getItem('projects')) || [];

export const store = new Vuex.Store({
  plugins: [localStoragePlugin],
  state: {
    users,
    projects,
  },
  mutations: {
    addUser(state, payload) {
      var id = uid();
      state.users.push({
        id: id,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        roll: payload.roll,
        status: 'Aktive',
        projects: payload.projects
      });
    },
    updateAssigned(state,{projects,act}) {
      console.log(projects);
        console.log(act);
      projects.forEach(pro => {
        var found = state.projects.find(project => project.id === pro.id);
        if (found){
          if (act === 'add')
            found.assigned ++;
          else found.assigned --;
        }
      })
    },
    editUser(state, payload) {
      let found = state.users.find(user => user.id === payload.id);
      if (found) {
        found.firstName = payload.firstName;
        found.lastName = payload.lastName;
        found.email = payload.email;
        found.roll = payload.roll;
        found.projects = payload.projects;
      } else
        this.commit('addUser', payload);
    },
    removeUser(state, payload) {
      let index = state.users.indexOf(payload);
      if (index > -1) {
        state.users.splice(index, 1);
      }
    },
    addProject(state, payload) {
      state.projects.push({
        id: uid(),
        pid: payload.pid,
        name: payload.name,
        street: payload.street,
        number: payload.number,
        plz: payload.plz,
        ort: payload.ort,
      });
    },
    editProject(state, payload) {
      let found = state.projects.find(project => project.id === payload.id);
      if (found) {
        found.pid = payload.pid,
          found.name = payload.name,
          found.street = payload.street,
          found.number = payload.number,
          found.plz = payload.plz,
          found.ort = payload.ort
      } else
        this.commit('addProject', payload);
    },
    removeProject(state, payload) {
      let index = state.projects.indexOf(payload);
      if (index > -1) {
        state.users.forEach(u =>{
          var project = u.projects.find(pro => pro.id === payload.id);
          if (project)
            u.projects.splice(u.projects.indexOf(project),1)          // remove project from user's assigned projects
        });
        state.projects.splice(index, 1);
      }
    },
  },
  getters: {
    getUserById: (state) => (id) => {
      return state.users.find(user => user.id === id)
    },
    getProjectsByUserId: (state) => (id) => {
      var projects = [];
      var user = state.users.find(user => user.id === id);
      if (user) {
        state.projects.forEach(p =>{    //check if project is assigned to any user
          var found = false;
          state.users.forEach(u =>{
            var project = u.projects.find(pro => pro.id === p.id);
            if (project)
              found =true;
          });
          if (!found)
            projects.push(p);
        });
        projects = user.projects.concat(projects);
      }
      return projects
    },
  },


  actions: {},
  modules: {},
});
