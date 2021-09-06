<template>
  <div class="home">
    <repo-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import RepoView from '../components/RepoView.vue'

export default {
  name: 'Home',
  components: {
    RepoView,
  }
}
</script>
<style>
  .home{
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>