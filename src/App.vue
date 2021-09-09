<template>
  <div id="app">
    <GlobalNavbar />
    <router-view />
  </div>
</template>

<script>
import GlobalNavbar from './components/GlobalNavbar';
export default {
  components: {
    GlobalNavbar,
  },
};
</script>

<style src="./styles/global.css"></style>
