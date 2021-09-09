<template>
  <b-container fluid class="px-1 py-5 mx-3">
    <b-row fluid>
      <b-col lg="2" md="4" sm="2" xs="12">
        <SidePanel v-bind:username="$route.params.username" />
      </b-col>
      <b-col lg="10" md="8" sm="10" xs="12"
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
