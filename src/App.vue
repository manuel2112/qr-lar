<template>
  <router-view />
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  watch: {
        $route: {
            immediate: true,
            handler(to, from) {
                document.title = to.meta.title || 'FACILBAK QR';
            }
        },
  }
}
</script>

<style lang="scss">
body{
  background-color: var(--background) !important;
}
#app {
  color: var(--texto);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.container{
  max-width: 500px !important;
}
img{
    pointer-events: none;
}
</style>
