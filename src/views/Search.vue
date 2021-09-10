<template>
  <div class="searchPage">
    <Spinner v-if="loading" />
    <h4 v-if="users" class="text-center mt-3">
      <b-badge class="myBadge">{{ totalUserCount }}</b-badge> results found for
      '{{ this.$route.query.query }}'.
      <span v-if="totalUserCount > 99">
        Here are the first <b-badge class="myBadge"> {{ rows }}</b-badge>
      </span>
    </h4>

    <b-container class="mt-3 my-container">
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
          <router-link class="userLink" :to="{ path: `/user/${item.login}` }">
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
import chunk from "lodash/chunk";
import Spinner from "../components/Spinner";
import { searchUsers } from "../utils/github";

export default {
  data() {
    return {
      loading: false,
      users: null,
      error: null,
      perPage: 3,
      currentPage: 1,
      lastpage: 0,
      rows: 0,
      totalUserCount: 0,
      currentRequestPage: 1,
    };
  },
  created() {
    this.fetchUsers();
  },
  watch: {
    currentPage: "fetchMoreUsers",
  },
  methods: {
    async fetchUsers() {
      let params = {
        q: this.$route.query.query,
        per_page: 100,
        context: this,
      };

      this.loading = true;
      let res = await searchUsers(params);
      this.loading = false;
      this.users = res.items;
      this.rows = res.items.length;
      this.totalUserCount = res.total_count;
      this.lastpage = Math.ceil(this.rows / 18);
      this.currentRequestPage++;
    },
    async fetchMoreUsers() {
      if (
        this.totalUserCount > this.rows &&
        this.currentPage == this.lastpage
      ) {
        let params = {
          q: this.$route.query.query,
          per_page: 100,
          page: this.currentRequestPage,
          context: this,
        };

        let res = await searchUsers(params);
        this.loading = false;
        this.users = this.users.concat(res.items);
        this.rows = this.users.length;
        this.totalUserCount = res.total_count;
        this.lastpage = Math.ceil(this.rows / 18);
        this.currentRequestPage++;
      }
    },
  },
  computed: {
    groupedUsers() {
      return chunk(this.users, 6);
    },
  },
  name: "Search",
  components: {
    Spinner,
  },
};
</script>

<style>
.myCard .card-title {
  font-size: 16px;
  color: rgb(0, 0, 0);
  font-weight: bold;
}

.myCard:hover .card-body .card-title {
  color: #47a7f5;
}

.myPagination {
  margin-bottom: 1rem;
}

.myPagination button {
  transition: transform 0.2s; /* Animation */
  border-radius: 0%;
}

.myPagination button:hover {
  transform: scale(1.07);
}

.myPagination button:focus {
  box-shadow: none;
}

/* some weird bootstrap selectors */
.page-item.active .page-link {
  background-color: #47a7f5;
  border: 0;
}

@media (max-width: 991px) {
  .myPagination {
    position: relative;
  }
}
@media (max-height: 862px) {
  .myPagination {
    margin-bottom: 0;
  }
}

.myCard {
  transition: transform 0.2s; /* Animation */
}

.myCard:hover {
  transform: scale(1.07);
  z-index: 100;
}

.userLink:hover {
  text-decoration: none;
  outline: none;
}

.myBadge {
  background-color: #47a7f5;
}
</style>
