<template>
  <div class="home">
    <div class="search">
      <p class="title-text text-center">Who do you want to find?</p>
      <Search />
    </div>
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
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-text {
  font-size: xx-large;
  margin-bottom: 1rem;
}
</style>
