<template>
  <div>
    <form v-if="!$store.state.authUser" @submit.prevent="login">
      <h1>Bitte melden Sie sich, um geschützte Inhalte sehen zu können!</h1>
      <p class="error" v-if="formError">{{ formError }}</p>
      <p><i>Verwenden Sie <b>demo</b> als Benutzer und <b>demo</b> als Passwort.</i></p>
      <p>Benutzer: <input type="text" v-model="formUsername" name="username" /></p>
      <p>Passwort: <input type="password" v-model="formPassword" name="password" /></p>
      <button type="submit">Login</button>
    </form>
    <div v-else>
      <h1>Hallo {{ $store.state.authUser.username }}!</h1>
      <pre>Ich bin nur für angemeldete Benutzer sichtbar.</pre>
      <p><i>Sie können auch die Seite neu laden, ohne die Verbindung zu verlieren!</i></p>
      <slot />
      <button @click="logout">Logout</button>
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
        this.$store.dispatch('login', {
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
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style>
  .error {
    color: red;
  }
</style>
