export const state = {
  todos: []
}

export const mutations = {
  ADD_TODO (state, text) {
    state.todos.push({
      text: text,
      done: false
    })
  },
  REMOVE_TODO (state, todo) {
    let matchIndex = state.todos.findIndex((item) => item.text === todo.text)
    if (matchIndex >= 0) {
      state.todos.splice(matchIndex, 1)
    }
  },
  TOGGLE_TODO (state, todo) {
    todo.done = !todo.done
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('ADD_TODO', 'Logout at the end!')
    }
  },
  addTodo ({ commit }, context) {
    commit('ADD_TODO', context)
  },
  removeTodo ({ commit }, context) {
    commit('REMOVE_TODO', context)
  },
  toggleTodo ({ commit }, context) {
    commit('TOGGLE_TODO', context)
  }
}
