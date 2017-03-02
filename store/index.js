import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
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
    }
  },
  actions: {
    nuxtServerInit ({ commit }, context) { // ({ commit }, { req })
      // set ENV variables
      commit('env', context.env)
      // commit('message', context.env.MSG || {})
      // set user if authenticated
      if (context.req && context.req.user) {
        commit('user', context.req.user)
        commit('userIsAuthenticated', true)
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
    }
  }
})

export default store
