<template>
  <div>
    <UserSkeleton v-if="loading" />

    <os-card class="mb-3" v-else-if="user && !loading">
      <img class="card-img-top" v-bind:src="user.avatar_url" />
      <os-container class="py-3">
        <h5 class="font-weight-bold">
          {{ user.name }}
        </h5>
        <a class="profileLink" v-bind:href="user.html_url">
          <os-card-text> @{{ user.login }} </os-card-text>
        </a>
        <os-container v-if="user.location" class="p-0 mt-2" fluid>
          <i class="bi bi-geo-alt"> </i>
          {{ user.location }}
        </os-container>
        <os-container  class="p-0 mt-2" fluid>
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
import { mapActions, mapGetters, useStore } from 'vuex';
import UserSkeleton from './UserSkeleton.vue';
import OsCard from "../generics/Card/OsCard.vue"
import OsContainer from '../generics/Layout/OsContainer.vue';
import OsCardText from '../generics/Card/OsCardText.vue';


export default {
  setup(){
    const store = useStore()
    console.log(store)
  },
  name: 'SidePanel',
  props: ['username'],
  components: { UserSkeleton, OsCard, OsContainer, OsCardText},
  data() {
    return {
      loading: false,
    };
  },
  async created() {
    this.loading = true;
    await this.fetchUser({
      username: this.username,
      context: this,
    });
    this.loading = false;
  },
  methods: {
    ...mapActions(['fetchUser']),
  },

  computed: {
    ...mapGetters({ user: 'getUser' }),
  },
};
</script>

<style scoped>
.profileLink{
  text-decoration: none;
}
</style>
