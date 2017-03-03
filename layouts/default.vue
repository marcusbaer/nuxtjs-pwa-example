<template>
  <div>
    <header>
      <img class="Header__Img" src="android-chrome-192x192.png" />
      <h1>Example PWA</h1>
      <div class="onlinedot"></div>
    </header>
    <main>
      <nuxt/>
    </main>
    <footer>{{ $t('footer.title') }}</footer>
  </div>
</template>

<script>
export default {
  methods: {
    path (url) {
      return (this.$store.state.lang.lang === 'en' ? url : '/' + this.$store.state.lang.lang + url)
    }
  }
}
</script>

<style>
.Header__Img {
  width: 1rem;
}
</style>
