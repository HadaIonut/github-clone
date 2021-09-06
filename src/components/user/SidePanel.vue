<template>
  <b-card class="">
    <b-card-img
      src="https://images.unsplash.com/photo-1628494126315-a8736da8ec30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=724&q=80"
    />
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
