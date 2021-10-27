<template>
  <div>
    <os-card class="mb-3" v-if="user && !loading">
      <img class="card-img-top" v-bind:src="user.avatar_url"/>
      <os-container class="py-3">
        <h5 class="font-weight-bold">
          {{ user.name }}
        </h5>
        <a class="profileLink" v-bind:href="user.html_url">
          <os-card-text> @{{ user.login }}</os-card-text>
        </a>
        <os-container v-if="user.location" class="p-0 mt-2" fluid>
          <i class="bi bi-geo-alt"> </i>
          {{ user.location }}
        </os-container>
        <os-container class="p-0 mt-2" fluid>
          <i class="bi bi-people"> </i>
          Followers: {{ user.followers }}
        </os-container>
        <os-container class="p-0 mt-2" fluid>
          <i class="bi bi-archive"> </i>
          Repos: {{ user.public_repos }}
        </os-container>
      </os-container>
    </os-card>
  </div>
</template>

<script>
import {useStore} from 'vuex';
import {computed, onMounted, ref} from 'vue';
// import UserSkeleton from './UserSkeleton.vue';
import OsCard from "../generics/Card/OsCard.vue"
import OsContainer from '../generics/Layout/OsContainer.vue';
import OsCardText from '../generics/Card/OsCardText.vue';

export default {
  name: 'SidePanel',
  props: ['username'],
  components: {OsCard, OsContainer, OsCardText},
  setup(props) {
    const loading = ref(false);
    const store = useStore();

    onMounted(async () => {
      loading.value = true;
      await store.dispatch('getUserDetailsAction', {routeParams: {userName: props.username}})
      loading.value = false;
    })

    const user = computed(() => store.getters.userDetailsDataGetter);

    return {
      user,
      loading
    }
  },
};
</script>

<style scoped>
.profileLink {
  text-decoration: none;
}
</style>
