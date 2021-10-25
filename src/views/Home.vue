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
import {useStore} from "vuex";

export default {
  name: 'Home',
  components: {
    Search,
  },
  setup() {
    const store = useStore();
    store.dispatch('getMagicCall', {routeParams:{userName: 'HadaIonut',repoName: 'CallbackDragons'}})
  }
}
</script>

<style>
.home {
  height: calc(100vh - 60px);
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
