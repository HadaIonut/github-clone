<template>
  <os-container fluid class="px-1 py-5">
    <os-row fluid>
      <os-col class="col-sm-4 col-xs-12 col-md-4 col-lg-2">
        <SidePanel v-bind:username="$route.params.username" />
      </os-col>
      <os-col class="col-sm-8 col-xs-12 col-md-8 col-lg-10"
        ><RepoPanel v-bind:username="$route.params.username"
      /></os-col>
    </os-row>
  </os-container>
</template>

<script>
import SidePanel from '@/components/user/SidePanel.vue';
import RepoPanel from '@/components/user/RepoPanel.vue';
import OsRow from "../components/generics/OsRow";
import OsCol from "../components/generics/OsCol";
import OsContainer from '../components/generics/OsContainer.vue';

export default {
  name: 'User',
  components: {
    SidePanel,
    RepoPanel,
    OsRow,
    OsCol,
    OsContainer,
  },
};
</script>

<style scoped>
.row {
  margin: 0;
}
</style>
