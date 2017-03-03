import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    authUser: null,
    env: null,
    todos: [],
    storedRequests: [],
    user: {},
    userIsAuthenticated: null
  },
  mutations: {
    env (state, env) {
      state.env = env
    },
    storeRequest (state, axiosRequest) {
      state.storedRequests.push(axiosRequest)
    },
    addTodo (state, text) {
      state.todos.push({
        text: text,
        done: false
      })
    },
    removeTodo (state, todo) {
      let matchIndex = state.todos.findIndex((item) => item.text === todo.text)
      if (matchIndex >= 0) {
        state.todos.splice(matchIndex, 1)
      }
    },
    toggleTodo (state, todo) {
      todo.done = !todo.done
    },
    SET_USER (state, user) {
      state.authUser = user
    }
  },
  actions: {
    nuxtServerInit ({ commit }, context) { // ({ commit }, { req })
      // set ENV variables
      commit('env', context.env)
      // commit('message', context.env.MSG || {})
      // set user if authenticated
      if (context.req.session && context.req.session.authUser) {
        commit('SET_USER', context.req.session.authUser)
      }
    },
    addTodo ({ commit }, context) {
      commit('addTodo', context)
    },
    removeTodo ({ commit }, context) {
      commit('removeTodo', context)
    },
    toggleTodo ({ commit }, context) {
      commit('toggleTodo', context)
    },
    login ({ commit }, { username, password }) {
      return axios.post('/api/login', {
        username,
        password
      })
      .then((res) => {
        commit('SET_USER', res.data)
      })
      .catch((error) => {
        if (error.response.status === 401) {
          throw new Error('Bad credentials')
        }
      })
    },
    logout ({ commit }) {
      return axios.post('/api/logout')
      .then(() => {
        commit('SET_USER', null)
      })
    }
  }
})

export default store
