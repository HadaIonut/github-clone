/* eslint-disable vue/valid-template-root */
<template>
  <div class="pl-3 row">
    <b-card v-for="(repo, index) in repos" :key="index" class="col-4 mr-2 mb-2">
      <b-container class="py-3 ">
        <h6 class="font-weight-bold text-left">
          {{ repo.name }}
        </h6>
        <b-card-text class="text-left"> @username </b-card-text>
      </b-container>
    </b-card>
  </div>
</template>

<script>
// import { Octokit } from '@octokit/core';
export default {
  name: 'RepoPanel',
  props: ['username'],
  async created() {
    this.$store.dispatch('fetchRepos', this.username);
  },
  methods: {},
  computed: {
    repos() {
      return this.$store.getters.allRepos;
    },
  },
};
</script>
