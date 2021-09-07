<template>
  <div class="searchPage">
    <b-container class="mt-4">
      <b-row v-for="(row, index) in groupedUsers" v-bind:key="index">
        <b-col md="2" xs="12" sm="12" lg="2" xl="2" v-for="item in row" v-bind:key="item.id">
          <router-link :to="{path: `/user/${item.login}`}">
            <b-card
                v-bind:title="item.login"
                v-bind:img-src="item.avatar_url"
                img-alt="products"
                img-top
                tag="article"
                style="max-width: 20rem; "
                class="myCard mb-2"
            >
            </b-card>
          </router-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import {Octokit} from '@octokit/core';
import chunk from 'lodash/chunk';

const octokit = new Octokit({});

export default {
  data() {
    return {
      loading: false,
      users: null,
      error: null,
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {

      let response = await octokit.request('GET /search/users', {
        q: this.$store.getters.getUser,
        per_page: '18',
      });
      this.users = response.data.items;

    }
  },
  computed: {
    groupedUsers() {
      return chunk(this.users, 6);
    }
  },
  name: 'Search'

};
</script>

<style>

.myCard .card-title {
  font-size: 18px;
}

</style>
