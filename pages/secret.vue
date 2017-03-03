<template>
  <div>
    <secret />
  </div>
</template>

<script>
import Secret from '~/partials/Secret'

export default {
  head: {
    title: 'Secret'
  },
  middleware: 'auth',
  components: { Secret }
}
</script>
