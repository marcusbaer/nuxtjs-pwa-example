<template>
  <div>
    <header>
      <h1>Example PWA</h1>
      <div class="onlinedot"></div>
    </header>
    <main>
      <div class="container">
        <div class="row with-margins">
          <div class="col-md-12">
            <p>{{ msg }} / {{ name }}</p>
          </div>
        </div>
      </div>
    </main>
    <footer>OFFLINE</footer>
  </div>

</template>

<script>
  export default {
    head: {
      title: 'Offline'
    },
    data ({ req }) {
      return {
        msg: 'Sie haben gerade keine Verbindung ins Internet.',
        name: req ? 'server' : 'client'
      }
    }
  }
</script>

<style>
  .with-margins {
    margin: 1rem 0;
  }
</style>
