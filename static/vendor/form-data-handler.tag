<form-data-handler>

    <div show="{markerPosition || videoCaptureUrl}">
      <ul>
        <li show="{markerPosition}">Position gesetzt ({markerPosition})</li>
        <li show="{videoCaptureUrl}">Video aufgenommen ({videoCaptureUrl})</li>
      </ul>
      <button class="next" onclick={handleTap} show="{markerPosition && videoCaptureUrl}"> Senden </button>
    </div>

    <script>

        var self = this;

        this.markerPosition = null;
        this.videoCaptureUrl = null;

        this.mixin(SharedMixin);

        this.observable.on('newMarker', function(newMarkerPosition){
            self.update({markerPosition: newMarkerPosition});
        });

        this.observable.on('newCapture', function(newCaptureUrl){
            self.update({videoCaptureUrl: newCaptureUrl});
        });

        this.handleTap = function (e) {
            self.xhr(self.rootUrl+'api/new-marker', {
                marker: self.markerPosition,
                video: self.videoCaptureUrl
            }, function (data, url) {
                if (data.success) {
                  self.update({
                    markerPosition: null,
                    videoCaptureUrl: null
                  });
                  self.observable.trigger('resetScreens', data);
                }
            });
        };

        this.loadAllAvailableMarkers = function () {
            self.xhr(self.rootUrl+'api/load-markers', {
            }, function (data, url) {
//                console.log(data);
            });
        }

    </script>

    <style scoped>
        /*button { font-size: 1rem; letter-spacing: 0.3rem; background-color: #b40909; border: 3px solid darkgray; color: white; padding: 0.5rem; font-weight: bold; }*/
    </style>
</form-data-handler>
