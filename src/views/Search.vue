<template>
  <div class="searchPage">
    <Spinner  v-if="loading"/> 
    <h3 v-if="users" class="text-center mt-4">
      <b-badge>{{ totalUserCount }}</b-badge> results found for '{{
        this.$route.query.query
      }}'.
      <span v-if="totalUserCount > 99">
        Here are the first <b-badge> {{ rows }}</b-badge>
      </span>
    </h3>

    <b-container class="mt-4 my-container">
      <b-row
        v-for="(row, index) in groupedUsers.slice(
          (currentPage - 1) * perPage,
          (currentPage - 1) * perPage + perPage
        )"
        v-bind:key="index"
      >
        <b-col
          md="2"
          xs="12"
          sm="12"
          lg="2"
          xl="2"
          v-for="item in row"
          v-bind:key="item.id"
        >
          <router-link :to="{ path: `/user/${item.login}` }">
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
    <b-pagination
      class="fixed-bottom myPagination"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage * 6"
      aria-controls="my-container"
      align="center"
      pills
      size="lg"
    ></b-pagination>
  </div>
</template>

<script>
import { Octokit } from "@octokit/core";
import chunk from "lodash/chunk";
import Spinner from '../components/Spinner'
const octokit = new Octokit({});


export default {
  data() {
    return {
      loading: false,
      users: null,
      error: null,
      perPage: 3,
      currentPage: 1,
      rows: 0,
      totalUserCount: 0,
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      this.loading = true;
      let response = await octokit.request("GET /search/users", {
        q: this.$route.query.query,
        per_page: 150,
      });
      this.loading = false;
      this.users = response.data.items;
      this.rows = response.data.items.length;
      this.totalUserCount = response.data.total_count;
    },
  },
  computed: {
    groupedUsers() {
      return chunk(this.users, 6);
    },
  },
  name: "Search",
  components:{
    Spinner
  },
};
</script>

<style>
.myCard .card-title {
  font-size: 16px;
}
.myPagination {
  margin-bottom: 2rem;
}

@media (max-width: 800px) {
  .myPagination {
    position: relative;
  }
}

</style>
