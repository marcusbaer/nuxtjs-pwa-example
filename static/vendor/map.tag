<map>

    <div id="map"></div>
    <div id="sidebar"></div>

    <script>

        var map, clickLayer, videoLayer;
        this.style = opts.style;

        this.marker = (opts.marker) ? JSON.parse(opts.marker) : null;

        var self = this;
        this.mixin(SharedMixin);

        var videoMarkerIcon = L.icon({
            iconUrl: 'markers/message-video.svg',
            iconSize: [30, 30],
            iconAnchor: [0, 20],
            popupAnchor:  [0, 20]
        });

        this.on('mount', function() {
            setTimeout(function() {
                createMap({
                    style: self.style,
                    center: [51.2768215, 7.20986762316503],
                    zoom: 6,
                    maxZoom: 14,
                    minZoom: 4,
                    bounds: [ [47.7, 6], [54.8, 15] ]
                }, 0);
                self.loadAllAvailableMarkers();
            });
        });

        this.observable.on('resetScreens', function(newMarker) {
          if (self.marker) {
              clickLayer.removeLayer(self.marker);
          }
          var marker = new L.Marker(newMarker.marker.split(','), {
              icon: videoMarkerIcon
          });
          marker.addTo(videoLayer).on('click', getVideoClickCallback(newMarker.video));
        });

        this.loadAllAvailableMarkers = function () {
            self.xhr(self.rootUrl+'api/load-markers', {
            }, function (markers, url) {
                for (var i=0; i<markers.length; i++) {
                    var clickedMarker = markers[i];
                    var marker = new L.Marker(clickedMarker.marker.split(','), {
                        icon: videoMarkerIcon
                    });
                    marker.addTo(videoLayer).on('click', getVideoClickCallback(clickedMarker.video));
                }
            });
        };

        function getVideoClickCallback (url) {
          return function (e) {
              self.observable.trigger("playVideo", url, e.latlng);
          }
        };

        function createMap (options) {

//            icons from materialdesignicons.com
            L.Icon.Default.imagePath = './markers/';

            function _getLayerOptions (overwrites) {
                var osmAttr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, CC-BY-SA';
                var tileLayerDefaultOptions = {attribution: osmAttr, maxZoom: 18};
                return Object.assign(tileLayerDefaultOptions, overwrites);
            }

            var mapLayers = {
                "OSM MapSurfer": L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', _getLayerOptions({})),
            };

            clickLayer = new L.LayerGroup();
            videoLayer = new L.MarkerClusterGroup();

            var overlayLayers = {
                "Videos": videoLayer,
                "Wohnort": clickLayer
            };

            try { // if map not already initialized

                map = L.map('map', {
                    keyboard: true,
                    center: options.center,
                    zoom: options.zoom,
                    maxZoom: options.maxZoom,
                    minZoom: options.minZoom,
                    layers: [ mapLayers["OSM MapSurfer"], videoLayer, clickLayer ],
                    fullscreenControl: true,
                    fullscreenControlOptions: {
                        position: 'topleft'
                    }
                });

                L.control.layers(mapLayers, overlayLayers).addTo(map);

                L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                map.fitBounds(options.bounds);

                var loadingControl = L.Control.loading({
                    separate: true
                });
                map.addControl(loadingControl);

                map.on('click', function(e){
                    if (self.marker) {
                        clickLayer.removeLayer(self.marker);
                    }
                    self.marker = new L.Marker([e.latlng.lat, e.latlng.lng], {
                        icon: L.icon({
                            iconUrl: 'markers/map-marker-radius.svg',
                            iconSize: [30, 30],
                            iconAnchor: [15, 25],
                            popupAnchor:  [2, 10]
                        })
                    });
                    self.marker.addTo(clickLayer);
                    self.observable.trigger("newMarker", [e.latlng.lat, e.latlng.lng]);
                });

            } catch (e) {

            }

        }

//        http://wiki.openstreetmap.org/wiki/List_of_OSM-based_services

    </script>

    <style scoped>
        #map {
            width: 100%;
            height: 100%;
        }
        #clickMarkerColour {
            color: #b40909;
        }
        .marker-cluster-small, .marker-cluster-small div,
        .marker-cluster-medium, .marker-cluster-medium div,
        .marker-cluster-large, .marker-cluster-large div {
            /*color: #25319e;*/
            background-color: hsla(234, 76%, 61%, 0.6);
            color: white;
        }
    </style>
</map>
