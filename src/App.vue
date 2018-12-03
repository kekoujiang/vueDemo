<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  @import "./assets/font/font.css";
  #app {
    position: absolute;
    left: 0;
    top:0;
    right: 0;
    bottom: 0;
    background: #efefef;
    font: bold 13.3333px biyue !important;
  }
  input, textarea, select, button {
    font: 400 13.3333px biyue;
  }
</style>
