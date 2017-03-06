<video-player>

    <!--http://ricostacruz.com/cheatsheets/riot.html-->
      <div id="player">
          <video show="{playerSource}" id="playback" src="{playerSource}" controls></video>
      </div>

      <div class="info" hide="{playerSource}">
          <p>Nimm erst ein Video auf, bevor du es dir ansehen möchtest!</p>
      </div>

    <script>

        var self = this;
        this.mixin(SharedMixin);

        this.playerSource = '';

        this.observable.on('newCapture', function(newCaptureUrl){
            self.setPlayVideoUrl(newCaptureUrl);
        });

        this.setPlayVideoUrl = function (url) {
            self.update({ playerSource: url });
            document.getElementById('playback').addEventListener('loadedmetadata', function() {
                this.currentTime = 0;
            }, false);
        };

    </script>

    <style scoped>
        #player { text-align: center; }
        video { width: 50%; border: 3px solid transparent; pointer-events: all; }
    </style>

</video-player>
