<template>
  <div class="error-page">
    <h1 class="error-code">{{ error.statusCode }}</h1>
    <div class="error-wrapper-message">
      <h2 class="error-message">{{ error.message }}</h2>
    </div>
    <p v-if="error.statusCode === 404">
      <nuxt-link class="error-link" :to="path('/')" exact>{{ $t('links.home') }}</nuxt-link>
    </p>
  </div>
</template>

<script>
export default {
  props: ['error'],
  head () {
    return {
      title: this.error.message || 'An error occured'
    }
  },
  methods: {
    path (url) {
      return (this.$store.state.lang.lang === 'en' ? url : '/' + this.$store.state.lang.lang + url)
    }
  }
}
</script>

<style scoped>
.error-page {
  color: #000;
  font-family: "SF UI Text", "Helvetica Neue", "Lucida Grande";
  text-align: center;
  padding-top: 20%;
}
.error-code {
  display: inline-block;
  font-size: 24px;
  font-weight: 500;
  vertical-align: top;
  border-right: 1px solid rgba(0, 0, 0, 0.298039);
  margin: 0px 20px 0px 0px;
  padding: 10px 23px;
}
.error-wrapper-message {
  display: inline-block;
  text-align: left;
  line-height: 49px;
  height: 49px;
  vertical-align: middle;
  margin-bottom: 20px;
}
.error-message {
  font-size: 14px;
  font-weight: normal;
  margin: 0px;
  padding: 0px;
}
.error-link {
  color: #000;
  font-weight: normal;
  font-size: 14px;
}
</style>
