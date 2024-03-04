<template>
  <HelloWorld :reactCounter="reactCounter"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      websocket: null,
      reactCounter: '0'
    };
  },
  created() {
    console.log('Vue: Estableciendo conexión WebSocket...');
    this.websocket = new WebSocket('ws://localhost:9001');

    this.websocket.onopen = () => {
      console.log('Vue: WebSocket connection established');
    };

    this.websocket.onmessage = (event) => {
      console.log('Vue: Received message:', event.data);
      this.reactCounter = JSON.parse(event.data)?.counterUpdate;
    };

    this.websocket.onerror = (error) => {
      console.error('Vue: WebSocket error:', error);
    };

    this.websocket.onclose = () => {
      console.log('Vue: WebSocket connection closed');
    };
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
