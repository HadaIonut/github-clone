<template>
  <b-container fluid class="px-1 py-5">
    <b-row fluid>
      <b-col lg="2" md="4" sm="4" xs="12">
        <SidePanel v-bind:username="$route.params.username" />
      </b-col>
      <b-col lg="10" md="8" sm="8" xs="12"
        ><RepoPanel v-bind:username="$route.params.username"
      /></b-col>
    </b-row>
  </b-container>
</template>

<script>
import SidePanel from '@/components/user/SidePanel.vue';
import RepoPanel from '@/components/user/RepoPanel.vue';

export default {
  name: 'User',
  components: {
    SidePanel,
    RepoPanel,
  },
};
</script>

<style scoped>
.row {
  margin: 0;
}
</style>
