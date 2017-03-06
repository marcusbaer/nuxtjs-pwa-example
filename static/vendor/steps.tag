<steps>

    <nav>
        <div class={ active: mode == 'intro' } onclick={stepToIntro}>
            Anleitung
        </div>

        <div class={ active: mode == 'map' } onclick={stepToMap}>
            Karte
        </div>

        <div class={ active: mode == 'capture' } onclick={stepToCapture}>
            Aufnahme
        </div>

        <div class={ active: mode == 'preview' } onclick={stepToPreview}>
            Vorschau
        </div>
    </nav>

    <main>
        <div show="{mode == 'init' || mode == 'intro'}">
            <h4>Wie geht das?</h4>
            <ol>
                <li>
                    <strong>Wähle deinen Ort in der Karte</strong>
                    <span>Klicke in der Karte an den Ort, von dem du kommst.</span>
                </li>
                <li>
                    <strong>Nimm ein Video auf</strong>
                    <span>Nimm eine Grußbotschaft auf.</span>
                </li>
                <li>
                    <strong>Prüfe deine Angaben</strong>
                    <span>Sieh dir alles nochmal an. War das so richtig?</span>
                </li>
            </ol>
            <button class="next" onclick={stepToMap}>Weiter</button>
        </div>

        <div show="{mode == 'init' || mode == 'map'}">
            <h4>Wähle deinen Ort</h4>
            <yield from="picker" />
            <button class="next" onclick={stepToCapture}>Weiter</button>
        </div>
        </div>

        <div show="{mode == 'init' || mode == 'capture'}">
            <h4>Nimm ein Video auf</h4>
            <yield from="capture" />
            <button class="next" onclick={stepToPreview}>Weiter</button>
        </div>

        <div show="{mode == 'init' || mode == 'preview'}">
            <h4>Prüfe deine Angaben</h4>
            <yield from="preview" />
        </div>

        <div show="{mode == 'done'}">
            <h4>Danke!</h4>
            <p>Vielen Dank für dein Video..</p>
        </div>
    </main>

    <script>

        var self = this;
        this.mixin(SharedMixin);

        this.mode = opts.mode || 'init'; // intro | map | capture | preview | done

        this.on('mount', function() {
            setTimeout(function(){
                self.setMode('intro');
            }, 0);
        });

        this.observable.on('resetScreens', function(data){
            self.setMode('done');
        });

        this.stepToIntro = function (e) {
            e.preventDefault();
            self.setMode('intro');
        };

        this.stepToMap = function (e) {
            e.preventDefault();
            self.setMode('map');
        };

        this.stepToCapture = function (e) {
            e.preventDefault();
            self.setMode('capture');
        };

        this.stepToPreview = function (e) {
            e.preventDefault();
            self.setMode('preview');
        };

        this.setMode = function (newMode) {
            this.update({mode: newMode});
        };

    </script>

    <style scoped>
        nav {
            overflow: auto;
        }
        nav > div {
            box-sizing: border-box;
            background-color: dimgray;
            height: 3rem;
            padding: 1rem 0;
            display: block;
            float: left;
            width: 25%;
            text-align: center;
            cursor: pointer;
        }
        .active {
            background-color: lightblue;
        }
    </style>

</steps>
