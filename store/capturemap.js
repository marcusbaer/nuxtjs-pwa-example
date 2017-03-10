import axios from 'axios'

export const state = {
  captureUrl: null,     // url of captured video
  captureData: null,    // captured data
  place: 'A',           // place of record
  position: null        // marked location in map
}

export const mutations = {
  SET_CAPTURE_URL (state, url) {
    state.captureUrl = url
  },
  SET_CAPTURE_DATA (state, capture) {
    state.captureData = capture

    // TODO: check for marker and send capture with marker to server
    // TODO: on success set capture url

    // File name format: timestamp_place_location.webm
    // Example: 1484679110027_A_55.44584157254516,6.635742187500001.webm

    return axios.post('/api/upload/video', {
      recorded: new Date().getTime(),
      place: state.place,
      marker: (state.position) ? state.position.toString() : '',
      data: capture
    })
    .then((res) => {
      commit('SET_CAPTURE_URL', res.data.url)


      // let marker = (this.position) ? this.position.toString() : ''
      // this.xhr(this.rootUrl+'upload/video?marker='+marker, data, (data, url) => {
      // })


    })
    .catch((error) => {
      if (error.response.status === 401) {
        throw new Error('Bad credentials')
      }
    })
  },
  SET_POSITION (state, marker) {
    state.position = marker
  }
}

export const actions = {
  setCaptureData ({ commit }, context) {
    commit('SET_CAPTURE_DATA', context)
  },
  setCaptureUrl ({ commit }, context) {
    commit('SET_CAPTURE_URL', context)
  },
  setPosition ({ commit }, context) {
    commit('SET_POSITION', context)
  }
}
