<template>
  <div class="home">
    <div class="search">
      <p class="title-text">Who do you want to find?</p>
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
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
}

.title-text {
  font-size: xx-large;
  margin-bottom: 1rem;
}
</style>
