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
          md="4"
          xs="12"
          sm="6"
          lg="2"
          xl="2"
          v-for="item in row"
          v-bind:key="item.id"
        >
          <router-link class='userLink' :to="{ path: `/user/${item.login}`  }">
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
import {makeErrorToast} from '../utils/toast'
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
      let params = {
          q: this.$route.query.query,
          per_page: 100,}
      this.loading = true;
      try{
        let response = await octokit.request("GET /search/users", params);
      this.loading = false;
      this.users = response.data.items;
      this.rows = response.data.items.length;
      this.totalUserCount = response.data.total_count;
      } catch(error){
        makeErrorToast(
          this,
           error.message || `Unable to search for users like '${params?.q}'`
        )

      }
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

myPagination button{
  transition: transform .2s; /* Animation */
}

.myPagination button:hover{
 transform: scale(1.07);
}

@media (max-width: 800px) {
  .myPagination {
    position: relative;
  }
}

.myCard{
  transition: transform .2s; /* Animation */
  
}

.myCard:hover{
    transform: scale(1.07);
    z-index: 100;
}

.userLink:hover{
    text-decoration: none;
    outline: none;
  
}

</style>
