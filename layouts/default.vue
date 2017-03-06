<template>
  <div>
    <header>
      <nuxt-link :to="path('/')" exact><img class="Header__Img" src="/android-chrome-192x192.png" /></nuxt-link>
      <h1>{{ $t('header.title') }}</h1>
      <nav class="Header__Menu">
        <nuxt-link class="Header__Link" :to="path('/secret')">{{ $t('links.secret') }}</nuxt-link>
        <nuxt-link class="Header__Link" :to="path('/testpage')">{{ $t('links.test') }}</nuxt-link>
        <nuxt-link class="Header__Link" :to="path('/capturemap')">{{ $t('links.capturemap') }}</nuxt-link>

        <nuxt-link class="Header__Link Header__Lang" v-if="$store.state.lang.lang === 'en'" :to="`/de` + $route.fullPath" active-class="none">{{ $t('links.german') }}</nuxt-link>
        <nuxt-link class="Header__Link" v-else :to="$route.fullPath.replace(/^\/[^\/]+/, '')" active-class="none">{{ $t('links.english') }}</nuxt-link>
      </nav>
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

main {
  padding: 2rem 0;
}

.with-margins {
  margin: 1rem 0;
}

.Header__Img {
  width: 1rem;
}

.Header__Menu {
  float: right;
}

.Header__Link {
  color: #aaa;
  margin-left: .5rem;
}

.Header__Link:active,
.Header__Link:focus,
.Header__Link:hover {
  color: orange;
  text-decoration: none;
}

.Header__Lang {
  background-color: #666;
  color: #fff;
  padding: .3rem;
  text-transform: uppercase;
  text-decoration: none;
}

.nuxt-link-active {
  font-weight: bold;
}

</style>
