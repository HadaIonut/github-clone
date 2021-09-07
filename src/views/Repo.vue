<template>
  <div>
    <RepoView
      :reponame="this.$route.params.reponame"
      :username="this.$route.params.username"
    />
  </div>
</template>
<script>
import RepoView from '../components/RepoView';
export default {
  name: 'RepoHome',
  components: {
    RepoView,
  },
};
</script>
