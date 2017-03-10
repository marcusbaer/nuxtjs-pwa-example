<template>
  <div>
    <capturemap :renderer="name" />
  </div>
</template>

<script>
  import Capturemap from '~/partials/Capturemap'

  export default {
    head: {
      title: 'Capture'
    },
    components: { Capturemap },
    data ({ req }) {
      return {
        name: req ? 'server' : 'client'
      }
    }
  }
</script>
