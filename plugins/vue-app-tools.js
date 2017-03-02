import Vue from 'vue'
import axios from 'axios'

const PLUGIN_NAME = 'VueAppTools'
const PACKAGE_NAME = 'vue-app-tools'
const PROPERTY_NAME = 'app-tools'

const APPTOOLS_METHODS = ['requestAndGo']

const TYPE = {
  error: 'error',
  warn: 'warn',
  info: 'info',
  success: 'success'
}

const VUE_VERSION = {
  evangelion: 1,
  ghostInTheShell: 2
}

const MESSAGES = {
  alreadyInstalled: `${PLUGIN_NAME}: plugin already installed`,
  methodNameConflict: `${PLUGIN_NAME}: names conflict - `
}

const innerMethods = {

  /**
   * @param  {Object} Vue
   * @return {Object}
   */
  getVersion (Vue) {
    const version = Vue.version.match(/(\d+)/g)
    return {
      major: +version[0],
      regular: +version[1],
      minor: +version[2]
    }
  },

  /**
   * @param  {String} msg
   */
  requestAndGo (request, store) {
    return axios(request)
      .then((res) => {
        // return res to handle by caller
        return res
      })
      .catch((res) => {
        // put to storedRequests with failed timestamp
        request.failed = new Date().getTime()
        store.commit('storeRequest', request)
        return res
      })
  },

  /**
   * @param  {Object} vueApp
   * @param  {Object} pluginOptions
   */
  initVueAppToolsPlugin (vueApp, pluginOptions) {
    if (!vueApp.$options.methods) vueApp.$options.methods = {}
    APPTOOLS_METHODS.forEach(name => {
      // if (vueApp.$options.methods[name]) {
      //   console.error(MESSAGES.methodNameConflict + name)
      // } else {
      vueApp.$options.methods[name] = innerMethods[name]
      // }
    })
    vueApp.$emit(`${PACKAGE_NAME}-initiated`)
  }

}

/**
 * @param {Function} Vue
 * @param {Object} pluginOptions
 * @return {Object}
 */
function makeMixin (Vue, pluginOptions) {
  let hooks = {
    init: '',
    destroy: 'beforeDestroy',
    mounted: ''
  }

  if (innerMethods.getVersion(Vue).major === VUE_VERSION.evangelion) {
    hooks.init = 'init'
    hooks.mounted = 'compiled'
  }
  if (innerMethods.getVersion(Vue).major === VUE_VERSION.ghostInTheShell) {
    hooks.init = 'beforeCreate'
    hooks.mounted = 'mounted'
  }

  return {
    [hooks.init]: function () {
      const vueApp = this
      // const vueAppOptions = this.$options
      innerMethods.initVueAppToolsPlugin(vueApp, pluginOptions)
    },
    [hooks.mounted]: function () {
      // const vueApp = this
      // const vueAppOptions = this.$options
    },
    [hooks.destroy]: function () {
      // const vueApp = this
      // const vueAppOptions = this.$options
    }
  }
}

const VueAppTools = {
  type: TYPE,
  propertyName: PROPERTY_NAME,
  config: {
    type: TYPE.info,
    timeout: 3000
  },
  installed: false,
  /**
   * Plugin | vue-app-tools
   * @param  {Function} Vue
   * @param  {Object} pluginOptions
   * @this VueAppTools
   */
  install (Vue, pluginOptions = {}) {
    if (this.installed) throw console.error(MESSAGES.alreadyInstalled)

    const mixin = makeMixin(Vue, pluginOptions)
    Vue.mixin(mixin)

    // innerMethods.addMethods(this, this.type, pluginOptions)

    this.installed = true
  }

}

export default VueAppTools

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueAppTools)
}

if (process.BROWSER_BUILD) {
  Vue.use(VueAppTools)
}

if (process.SERVER_BUILD) {
  // ...
}
