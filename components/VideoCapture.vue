<template>
  <div class="recorder">
    <video autoplay v-bind:class="{onair: recording}" ref="video"></video>
    <button v-on:click="toggleRecord()">{{ recordButtonLabel }}</button>
    {{ captureUrl }}
  </div>
</template>

<script>
import MediaStreamRecorder from 'msr'

const MAX_RECORDING_TIME = 30000
let mediaRecorder = null

export default {
  data () {
    return {
      recording: false
    }
  },
  props: {
    renderer: {
      type: String,
      required: true
    }
  },
  computed: {
    captureUrl () {
      return this.$store.state.capturemap.captureUrl || 'NOTHING CAPTURED'
    },
    position () {
      return this.$store.state.capturemap.position
    },
    recordButtonLabel () {
      return (this.recording) ? this.$t('components.capturemap.recordButtonStop') : this.$t('components.capturemap.recordButtonStart')
    }
  },
  created () {
    if (this.renderer === 'client') {
      this.registerCamera()
    }
  },
  methods: {
    toggleRecord () {
      if (this.recording) {
        this.stopRecording()
      } else {
        this.startRecording()
      }
    },
    startRecording () {
      this._startMediaRecorder()
      setTimeout(() => {
        this._stopMediaRecorder()
      }, MAX_RECORDING_TIME)
    },
    stopRecording () {
      this._stopMediaRecorder()
    },
    _startMediaRecorder () {
      this.recording = true
      mediaRecorder.start()
    },
    _stopMediaRecorder () {
      if (this.recording) {
        this.recording = false
        mediaRecorder.stop()
      }
    },
    setCaptureData (capturedata) {
      this.$store.dispatch('capturemap/setCaptureData', capturedata)
    },
    cameraHasRecorded (blob) {
      this._stopMediaRecorder()
      let fileType = 'video' // or "audio"
      let fileName = 'ABCDEF.webm'  // or "wav" or "ogg"
      let data = {}
      data[fileType + '-filename'] = fileName
      data[fileType + '-blob'] = blob
      this.setCaptureData(data)
    },
    registerCamera () {
      // https://github.com/addyosmani/getUserMedia.js with face detection demo
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
      navigator.getUserMedia({
        video: {
          mandatory: {
            maxWidth: 640, // 1280 | 320
            maxHeight: 480,
            minWidth: 640, // 1280 | 320
            minHeight: 480 // 720 | 240
          }
        },
        audio: true
      }, (stream) => {
        // let video = document.querySelector('video')
        this.$refs.video.src = window.URL.createObjectURL(stream)
        // https://github.com/streamproc/MediaStreamRecorder
        // https://www.webrtc-experiment.com/msr/video-recorder.html
        mediaRecorder = new MediaStreamRecorder(stream)
        mediaRecorder.mimeType = 'video/webm'
        mediaRecorder.ondataavailable = this.cameraHasRecorded
      }, (e) => {})
    }
  }
}
</script>

<style scoped>
.recorder {
  text-align: center;
}

video {
  width: 50%;
  border: 3px solid transparent;
}

video.onair {
  border: 3px solid #b40909;
}
</style>
