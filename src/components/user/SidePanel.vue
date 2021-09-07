<template>
  <b-card class="">
    <b-card-img v-bind:src="user.avatar_url" />
    <b-container class="py-3">
      <h5 class="font-weight-bold">
        {{ user.name }}
      </h5>
      <b-card-text> @{{ user.login }} </b-card-text>
    </b-container>
  </b-card>
</template>

<script>
import { Octokit } from '@octokit/core';
export default {
  name: 'SidePanel',
  props: ['username'],
  async created() {
    const octokit = new Octokit();
    const response = await octokit.request('Get /users/{owner}', {
      owner: this.username,
    });
    //   return response;
    console.log(response.data);
    this.$store.dispatch('updateUser', response.data);
  },
  methods: {},
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },
};
</script>
