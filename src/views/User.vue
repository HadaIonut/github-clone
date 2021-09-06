<template>
  <b-container class="px-1">
    <b-row>
      <b-col cols="4 border-right">
        <SidePanel v-bind:username="$route.params.username" />
      </b-col>
      <b-col cols="8 "
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
