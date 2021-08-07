<template>
  <div id="nav-bar">
    <slot></slot>
  </div>
</template>

<script>
    export default {
        name: "NavBar"
    }
</script>

<style scoped>
  #nav-bar{
    display: flex;
    position: fixed;
    background-color: aliceblue;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -2px 1px rgba(100, 100, 100, .2)
  }
</style>
