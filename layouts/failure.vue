<template>
  <div>
    <header>
      <nuxt-link :to="path('/')" exact><img class="Header__Img" src="/android-chrome-192x192.png" /></nuxt-link>
      <h1>{{ $t('header.title') }}</h1>
      <div class="onlinedot"></div>
    </header>
    <main>
      <nuxt/>
      <div style="margin-top: 2rem;">
        <nuxt-link :to="path('/')" exact>{{ $t('links.home') }}</nuxt-link>
      </div>
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
main {
  padding: 2rem 0;
  background-color: rgba(255, 0, 0, 0.3);
}

<style>

.with-margins {
  margin: 1rem 0;
}

.Header__Img {
  width: 1rem;
}
</style>


</style>
