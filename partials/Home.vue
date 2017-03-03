<template>
  <div class="container">

    <div class="row with-margins">
      <div class="col-sm-6">
        <h1>{{ $t('home.title') }}</h1>
        <p>{{ $t('home.introduction') }}</p>
      </div>
      <div class="col-sm-6">
        <authentication>
          <message></message>
        </authentication>
      </div>
      <div class="col-sm-6">
        <p><nuxt-link to="/secret">{{ $t('home.secretLink') }}</nuxt-link></p>
      </div>
      <div class="col-sm-6">
        <todo :title="todoTitle"></todo>
      </div>
    </div>

    <div class="row with-margins">
      <div class="col-sm-12">{{ $t('home.renderer') }} {{ renderer }}.</div>
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
        counter: 0,
        todoTitle: this.$t('home.todoTitle') || 'Checklist'
      }
    }
  }
</script>
