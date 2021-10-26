<template>
  <div class="home">
    <div class="search">
      <p class="title-text text-center">Who do you want to find?</p>
      <Search/>
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
  async setup() {
    const store = useStore();
    await store.dispatch('getMagicCall', {
      routeParams: {
        userName: 'HadaIonut',
        repoName: 'CallbackDragons'
      }
    });
    await store.dispatch('postPostMagik', {dataParams: {"name": "morpheus", "job": "leader"}})
    console.log(store.getters.getMagicCallData)
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
