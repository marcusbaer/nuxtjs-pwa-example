<template>
  <div class="container">

    <div class="row with-margins">
      <div class="col-sm-12">
        <video-capture :renderer="renderer"></video-capture>
      </div>
    </div>

    <div class="row with-margins">
      <div class="col-sm-12">{{ $t('home.renderer') }} {{ renderer }}.</div>
    </div>

  </div>
</template>

<script>
  import VideoCapture from '~components/VideoCapture'

  export default {
    components: { VideoCapture },
    props: {
      renderer: {
        type: String,
        required: true
      }
    }
  }
</script>
