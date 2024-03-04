<template>
  <div id="root">
    <h1>Contenido hecho en Vue.js. Contador React: {{ reactCounter }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    reactCounter: {
      type: String,
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #root {
    background-color: #42b983;
  }

  h1 {
    margin: 0
  }
</style>
