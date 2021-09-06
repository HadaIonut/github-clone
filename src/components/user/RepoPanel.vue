<template>
  <b-row class="pl-3">
    <b-card>
      <b-container class="py-3">
        <h6 class="font-weight-bold text-left">
          name of the repo
        </h6>
        <b-card-text> @username </b-card-text>
      </b-container>
    </b-card>
  </b-row>
</template>

<script>
import { Octokit } from '@octokit/core';
export default {
  name: 'SidePanel',
  props: ['username'],
  async created() {
    const octokit = new Octokit();
    const response = await octokit.request('Get /users/{owner}/repos', {
      owner: this.username,
    });
    //   return response;
    console.log(response.data);
  },
  methods: {},
};
</script>
