<template>
  <div class="home">
    <Search/>
  </div>
</template>

<script>
import Search from '../components/Search';

export default {
  name: 'Home',
  components: {
    Search,
  }
}
</script>

<style>
.home {
  height: 100%;
  width: 100%;
}
</style>
