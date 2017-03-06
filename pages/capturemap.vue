<template>
  <div>
    <capturemap :renderer="name" />
  </div>
</template>

<script>
  import Capturemap from '~/partials/Capturemap'

  export default {
    head: {
      title: 'Capture',
      script: [
        { src: '/vendor/polyfills/MediaStreamRecorder.js' },
        { src: '/vendor/leaflet/dist/leaflet.js' },
        { src: '/vendor/leaflet.markercluster/dist/leaflet.markercluster.js' },
        { src: '/vendor/leaflet.fullscreen/Control.FullScreen.js' },
        { src: '/vendor/leaflet-loading/src/Control.Loading.js' },
        { src: '/vendor/leaflet-sidebar/src/L.Control.Sidebar.js' }
      ],
      link: [
        { rel: 'stylesheet', href: '/vendor/leaflet/dist/leaflet.css' },
        { rel: 'stylesheet', href: '/vendor/leaflet.markercluster/dist/MarkerCluster.css' },
        { rel: 'stylesheet', href: '/vendor/leaflet.markercluster/dist/MarkerCluster.Default.css' },
        { rel: 'stylesheet', href: '/vendor/leaflet.fullscreen/Control.FullScreen.css' },
        { rel: 'stylesheet', href: '/vendor/leaflet-loading/src/Control.Loading.css' },
        { rel: 'stylesheet', href: '/vendor/leaflet-sidebar/src/L.Control.Sidebar.css' }
      ]
    },
    components: { Capturemap },
    data ({ req }) {
      return {
        name: req ? 'server' : 'client'
      }
    }
  }
</script>

  <!-- Leaflet sidebar -->
  <link rel="stylesheet" href=".">
  <script src="." charset="utf-8"></script>

  <script src="polyfills/MediaStreamRecorder.js"> </script>
