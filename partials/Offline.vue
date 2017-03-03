<template>
  <div class="container">

    <div class="row with-margins">
      <div class="col-sm-12">
        <h1>{{ $t('offline.title') }}</h1>
        <p>{{ $t('offline.introduction') }}</p>
      </div>
    </div>

    <div class="row with-margins">
      <div class="col-sm-12">{{ $t('home.renderer') }} {{ renderer }}.</div>
    </div>

  </div>
</template>

<script>
  export default {
    props: {
      renderer: {
        type: String,
        required: true
      }
    }
  }
</script>
