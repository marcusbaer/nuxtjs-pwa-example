<template>
  <div>
    <header>
      <nuxt-link :to="path('/')" exact><img class="Header__Img" src="/android-chrome-192x192.png" /></nuxt-link>
      <h1>{{ $t('header.title') }}</h1>
      <nav class="Header__Menu">
        <nuxt-link class="Header__Link" :to="path('/secret')">{{ $t('links.secret') }}</nuxt-link>
        <nuxt-link class="Header__Link" :to="path('/testpage')">{{ $t('links.test') }}</nuxt-link>

        <nuxt-link class="Header__Link Header__Lang" v-if="$store.state.lang.lang === 'en'" :to="`/de` + $route.fullPath" active-class="none">{{ $t('links.german') }}</nuxt-link>
        <nuxt-link class="Header__Link Header__Lang" v-else :to="$route.fullPath.replace(/^\/[^\/]+/, '')" active-class="none">{{ $t('links.english') }}</nuxt-link>
      </nav>
      <div class="onlinedot" v-bind:class="{online: online}"></div>
    </header>
    <main>
      <nuxt/>
    </main>
    <footer>{{ $t('footer.title') }}</footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      online: true
    }
  },
  created () {
    // this.initNetworkState()
  },
  methods: {
    path (url) {
      return (this.$store.state.lang.lang === 'en' ? url : '/' + this.$store.state.lang.lang + url)
    },
    initNetworkState () {
      // window.addEventListener('online', () => { this.online = true })
      // window.addEventListener('offline', () => { this.online = false })
      // navigator.onLine ? this.online() : this.offline()
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

.onlinedot {
  display: none;
  height:1rem;
  width:1rem;
  border-radius:1rem;
  background-color:#960606;
}

.onlinedot.online {
  background-color:#028712;
}

</style>
