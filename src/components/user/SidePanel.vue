<template>
  <div>
    <UserSkeleton v-if="loading" />

    <b-card class="mb-3" v-else-if="user && !loading">
      <b-card-img v-bind:src="user.avatar_url" />
      <b-container class="py-3">
        <h5 class="font-weight-bold">
          {{ user.name }}
        </h5>
        <a v-bind:href="user.html_url">
          <b-card-text> @{{ user.login }} </b-card-text>
        </a>
        <b-container class="p-0 mt-2" fluid>
          <b-icon icon="geo-alt" scale="1"></b-icon>
          {{ user.location }}
        </b-container>
        <b-container class="p-0 mt-2" fluid>
          <b-icon icon="people" scale="1"></b-icon>
          Followers: {{ user.followers }}
        </b-container>
        <b-container class="p-0 mt-2" fluid>
          <b-icon icon="archive" scale="1"></b-icon>
          Repos: {{ user.public_repos }}
        </b-container>
      </b-container>
    </b-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import UserSkeleton from './UserSkeleton.vue';


export default {
  name: 'SidePanel',
  props: ['username'],
  components: { UserSkeleton },
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

<style scoped></style>
