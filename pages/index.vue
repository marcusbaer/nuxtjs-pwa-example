<template>
  <div>
    <header>
      <h1>Example PWA</h1>
      <div class="onlinedot"></div>
    </header>
    <main>
      <div class="container">

        <div class="row with-margins">
          <div class="col-md-6">
            <p>Rendered by {{name}}.</p>
          </div>
          <div class="col-md-6">
            <todo title="Checkliste"></todo>
          </div>
          <div class="col-md-6">
            <message></message>
          </div>
          <div class="col-md-6">
            <authentication></authentication>
            <p><nuxt-link to="/secret">Super geheime Seite</nuxt-link></p>
          </div>
        </div>

      </div>
    </main>
    <footer>FOOTER</footer>
  </div>

</template>

<script>
  import axios from 'axios'
  import Authentication from '~components/Authentication'
  import Message from '~components/Message'
  import Todo from '~components/Todo'

  export default {
    head: {
      title: 'Welcome'
    },
    components: { Authentication, Message, Todo },
    created () {
      // this.loadMessages()
    },
    data ({ req }) {
      return {
        counter: 0,
        name: req ? 'server' : 'client',
        formError: null,
        formUsername: '',
        formPassword: ''
      }
    },
    methods: {
      loadMessages () {
        if (this.$store.state.MSG === null) {
          axios.get('/api/messages')
          .then((res) => {
            this.$store.commit('messages', res.data)
          })
          .catch(() => {})
        }
      },
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
  .with-margins {
    margin: 1rem 0;
  }
  .error {
    color: red;
  }
</style>
