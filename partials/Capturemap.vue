<template>
  <div class="container">

    <div class="row with-margins">
      <div class="col-sm-12">
        <h1>{{ $t('capturemap.title') }}</h1>
        <p>{{ $t('capturemap.introduction') }}</p>
        <video-capture></video-capture>
      </div>
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
