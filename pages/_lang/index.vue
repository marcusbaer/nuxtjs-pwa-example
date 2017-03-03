<template>
  <div>
    <home :renderer="name" />
  </div>
</template>

<script>
  import Home from '~/partials/Home'

  export default {
    head: {
      title: 'Welcome'
    },
    components: { Home },
    data ({ req }) {
      return {
        name: req ? 'server' : 'client'
      }
    }
  }
</script>
