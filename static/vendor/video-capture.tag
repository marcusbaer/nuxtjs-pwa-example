<video-capture>

    <div id="recorder">
	    <video autoplay class="{onair: recording}"></video>
        <div style="margin-top: 1rem;">
            <button onclick={startRecording} show="{recording == false}"> START </button>
            <button onclick={stopRecording} show="{recording == true}"> STOP </button>
        </div>
    </div>

    <script>

        var mediaRecorder;

        var MAX_RECORDING_TIME = 30000;

        var self = this;
        this.mixin(SharedMixin);

        this.recording = false;

	    this.capture = null;
        this.markerPosition = null;

        this.on('mount', function() {
            self.registerCamera();
        });

        this.observable.on('newMarker', function(newMarkerPosition){
            self.update({markerPosition: newMarkerPosition});
        });

        this.startRecording = function (e) {
            self._startRecorder();
            setTimeout(function(){
              self._stopRecorder();
            }, MAX_RECORDING_TIME);
        };

        this.stopRecording = function (e) {
            self._stopRecorder();
        };

        this._startRecorder = function () {
          self.recording = true;
          mediaRecorder.start();
        };

        this._stopRecorder = function () {
          if (self.recording) {
            self.recording = false;
            mediaRecorder.stop();
          }
        };

        this.registerCamera = function (e) {

          navigator.getUserMedia  = navigator.getUserMedia ||
                  navigator.webkitGetUserMedia ||
                  navigator.mozGetUserMedia ||
                  navigator.msGetUserMedia;

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
          }, onMediaSuccess, onMediaError);

        };

        function onMediaSuccess(stream) {

            var video = document.querySelector('video');
            video.src = window.URL.createObjectURL(stream);

            mediaRecorder = new MediaStreamRecorder(stream);
            mediaRecorder.mimeType = 'video/webm';
            mediaRecorder.ondataavailable = function (blob) {
                self._stopRecorder();

                var fileType = 'video'; // or "audio"
                var fileName = 'ABCDEF.webm';  // or "wav" or "ogg"
                var data = {};
                data[fileType + '-filename'] = fileName;
                data[fileType + '-blob'] = blob;

                var marker = (self.markerPosition) ? self.markerPosition.toString() : '';
                self.xhr(self.rootUrl+'upload/video?marker='+marker, data, function (data, url) {
                          self.update({capture: data.url});
                    self.observable.trigger("newCapture", data.url);
                });
            };
        }

        function onMediaError(e) {
            console.error('media error', e);
        }

    </script>

    <style scoped>
        #recorder { text-align: center; }
        video { width: 50%; border: 3px solid transparent; }
	    video.onair { border: 3px solid #b40909; }
    </style>
</video-capture>
