<template>
  <div>
    <div>
      <b-row>
        <b-col cols="6" class="mb-3">
          <b-input-group class="input">
            <b-form-input
              placeholder="Enter repo name"
              v-on:input="handleFilter"
            />
            <b-input-group-append>
              <b-input-group-text>
                <b-icon icon="search" />
              </b-input-group-text>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
    </div>
    <div>
      <b-row class="pl-3">
        <b-card
          v-for="(repo, index) in repos"
          :key="index"
          class="col-4 mr-2 mb-2"
        >
          <router-link :to="{ path: `/user/${username}/repo/${repo.name}` }">
            <b-container class="py-3">
              <h6 class="font-weight-bold text-left text-dark">
                {{ repo.name }}
              </h6>
              <b-card-text class="text-left"> @{{ username }} </b-card-text>
            </b-container>
          </router-link>
        </b-card>
      </b-row>
    </div>
  </div>
</template>

<script>
// import { Octokit } from '@octokit/core';
export default {
  name: 'RepoPanel',
  props: ['username'],
  async created() {
    await this.$store.dispatch('fetchRepos', {username: this.username, context: this});
  },
  methods: {
    handleFilter(e) {
      this.$store.dispatch('updateKeyword', e);
    },
  },
  computed: {
    repos() {
      return this.$store.getters.filteredRepos;
    },
  },
};
</script>
<style scoped></style>
