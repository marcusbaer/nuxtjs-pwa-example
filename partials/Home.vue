<template>
  <div class="container">

    <div class="row with-margins">
      <div class="col-sm-6">
        <todo title="Öffentliche Checkliste"></todo>
      </div>
      <div class="col-sm-6">
        <authentication>
          <message></message>
        </authentication>
      </div>
      <div class="col-sm-6">
        <p><nuxt-link to="/secret">Super geheime Seite</nuxt-link></p>
      </div>
    </div>

    <div class="row with-margins">
      <div class="col-sm-12">
        Page rendered by {{ renderer }}.
      </div>
    </div>

  </div>
</template>

<script>
  import Authentication from '~components/Authentication'
  import Message from '~components/Message'
  import Todo from '~components/Todo'

  export default {
    components: { Authentication, Message, Todo },
    props: {
      renderer: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        counter: 0
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
