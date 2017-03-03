<template>
  <div>
    <input v-model="body" placeholder="Ihre Nachricht" v-on:keyup.enter="send">
    <button v-on:click="send()">Senden</button>
  </div>
</template>

<script>
  export default {
    data () {
      // https://developer.mozilla.org/de/docs/Web/API/Navigator/vibrate
      return {
        lang: 'de-DE',
        title: 'Nachricht',
        body: null,
        tag: 'test',
        icon: '/android-chrome-192x192.png',
        vibrate: [100, 30, 100, 30, 100, 200, 200, 30, 200, 30, 200, 200, 100, 30, 100, 30, 100] // SOS
      }
    },
    methods: {
      send () {
        if (this.body) {
          new Notification(this.title, { // eslint-disable-line no-new
            lang: this.lang,
            tag: this.tag,
            icon: this.icon,
            body: this.body,
            vibrate: this.vibrate
          })
          this.body = null
        }
      }
    }
  }
</script>
