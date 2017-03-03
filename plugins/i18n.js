import Vue from 'vue'
import store from '~store'

Vue.prototype.$t = function (key) {
  let value = 'FOOTER'
  const state = store.state.lang
  if (state) {
    // if there is a store for lang
    let keys = key.split('.')
    value = state._[state.lang]
    keys.forEach((k) => {
      value = value[k]
    })
  }
  return value
}
