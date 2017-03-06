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
        { src: 'http://foobar.com/mijn.js' }
      ],
      link: [
        { rel: 'stylesheet', href: 'http://foobar.com/me.css' }
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
