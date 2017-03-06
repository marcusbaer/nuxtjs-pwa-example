<template>
  <div id="recorder">
    <video autoplay class="{onair: recording}"></video>
    <div style="margin-top: 1rem;">
        <button onclick={startRecording} show="{recording == false}"> START </button>
        <button onclick={stopRecording} show="{recording == true}"> STOP </button>
    </div>
  </div>
</template>

<script>

     let mediaRecorder
     const MAX_RECORDING_TIME = 30000

     function onMediaSuccess(stream) {
       let video = document.querySelector('video')
       video.src = window.URL.createObjectURL(stream)
       mediaRecorder = new MediaStreamRecorder(stream)
       mediaRecorder.mimeType = 'video/webm'
       mediaRecorder.ondataavailable = (blob) => {
         this._stopRecorder()
         let fileType = 'video' // or "audio"
         let fileName = 'ABCDEF.webm'  // or "wav" or "ogg"
         let data = {}
         data[fileType + '-filename'] = fileName
         data[fileType + '-blob'] = blob
         let marker = (this.markerPosition) ? this.markerPosition.toString() : ''
         this.xhr(this.rootUrl+'upload/video?marker='+marker, data, (data, url) => {
           this.capture = data.url
           this.command("capture/newCapture", data.url)
         })
       }
     }

     function onMediaError(e) {
       console.error('media error', e)
     }

export default () {
  data () {
    return {
      recording: false
      capture: null,
      markerPosition: null
    }
  },
  computed: {
    markerPosition () {
      return '12.32432;5.06' // this.store.state.capture.markerPosition || null
    }
  },
  created () {
    // TODO: re-write for VueJS
    // this.observable.on('newMarker', (newMarkerPosition) => {
    //     this.markerPosition = newMarkerPosition
    // })
    this.registerCamera()
  },
  methods: {
    startRecording (e) {
        this._startRecorder()
        setTimeout(() => {
          this._stopRecorder()
        }, MAX_RECORDING_TIME)
    },
    stopRecording (e) {
        this._stopRecorder()
    },
    _startRecorder () {
      this.recording = true
      mediaRecorder.start()
    },
    _stopRecorder () {
      if (this.recording) {
        this.recording = false
        mediaRecorder.stop()
      }
    },
    registerCamera (e) {
      navigator.getUserMedia  = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia
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
      }, onMediaSuccess, onMediaError)
    }
  }
}

</script>

<style scoped>
  #recorder { text-align: center; }
  video { width: 50%; border: 3px solid transparent; }
  video.onair { border: 3px solid #b40909; }
</style>
