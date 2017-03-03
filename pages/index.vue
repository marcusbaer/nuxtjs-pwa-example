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
        </div>
      </div>
    </main>
    <footer>FOOTER</footer>
  </div>

</template>

<script>
  import axios from 'axios'
  import Message from '../components/Message'
  import Todo from '../components/Todo'

  export default {
    head: {
      title: 'Welcome'
    },
    components: { Message, Todo },
    created () {
      // this.loadMessages()
    },
    data ({ req }) {
      return {
        counter: 0,
        name: req ? 'server' : 'client'
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
      }
    }
  }
</script>

<style>
  .with-margins {
    margin: 1rem 0;
  }
</style>
