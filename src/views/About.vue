<template>
  <div class="about">
    <div>
      <RepoView/>
    </div>
  </div>
</template>
<script>
import RepoView from '../components/RepoView.vue';

export default {
  name: 'Home',
  components: {
    RepoView,
  }
}
</script>