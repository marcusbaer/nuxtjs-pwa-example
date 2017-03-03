<template>
  <div>
    <offline :renderer="name" />
  </div>
</template>

<script>
  import Offline from '~/partials/Offline'

  export default {
    head: {
      title: 'Offline'
    },
    layout: 'failure',
    components: { Offline },
    data ({ req }) {
      return {
        name: req ? 'server' : 'client'
      }
    }
  }
</script>
