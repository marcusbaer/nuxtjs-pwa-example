<template>
  <div>
    <form v-if="!$store.state.auth.authUser" @submit.prevent="login">
      <h1>{{ $t('components.authentication.loginTitle') }}</h1>
      <p class="error" v-if="formError">{{ formError }}</p>
      <p v-html="$t('components.authentication.userhint')"></p>
      <p>{{ $t('components.authentication.username') }}: <input type="text" v-model="formUsername" name="username" /></p>
      <p>{{ $t('components.authentication.password') }}: <input type="password" v-model="formPassword" name="password" /></p>
      <button type="submit">{{ $t('components.authentication.login') }}</button>
    </form>
    <div v-else>
      <h1>{{ $t('components.authentication.hello') }} {{ $store.state.auth.authUser.username }}!</h1>
      <div v-html="$t('components.authentication.introduction')"></div>
      <slot />
      <button @click="logout">{{ $t('components.authentication.logout') }}</button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        formError: null,
        formUsername: '',
        formPassword: ''
      }
    },
    methods: {
      login () {
        this.$store.dispatch('auth/login', {
          username: this.formUsername,
          password: this.formPassword
        })
        .then(() => {
          this.formUsername = ''
          this.formPassword = ''
          this.formError = null
        })
        .catch((e) => {
          this.formError = e.message
        })
      },
      logout () {
        this.$store.dispatch('auth/logout')
      }
    }
  }
</script>

<style>
  .error {
    color: red;
  }
</style>
