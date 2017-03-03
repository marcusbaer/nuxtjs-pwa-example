<template>
  <div>
    <header>
      <nuxt-link :to="path('/')" exact><img class="Header__Img" src="/android-chrome-192x192.png" /></nuxt-link>
      <h1>{{ $t('header.title') }}</h1>
      <nav class="Header__Menu">
        <nuxt-link class="Header__Link" :to="path('/secret')">
          {{ $t('links.secret') }}
        </nuxt-link>
        <nuxt-link class="Header__Link" v-if="$store.state.lang.lang === 'en'" :to="`/de` + $route.fullPath" active-class="none">
          {{ $t('links.german') }}
        </nuxt-link>
        <nuxt-link class="Header__Link" v-else :to="$route.fullPath.replace(/^\/[^\/]+/, '')" active-class="none">
          {{ $t('links.english') }}
        </nuxt-link>
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
  font-size: 16px;
  color: #aaa;
  border: 1px solid #aaa;
  padding: 7px 12px;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 5px;
  margin-left: 10px;
}

.Header__Link:hover {
  color: #2e2f30;
  background-color: #fff;
}

.nuxt-link-active {
  font-weight: bold;
}

</style>
