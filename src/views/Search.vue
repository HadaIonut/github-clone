<template>
  <div class="searchPage">
    <Spinner v-if="loading" />
    <h4 v-if="users" class="text-center mt-3">
      <div class="badge myBadge">{{ totalUserCount }}</div>
      results found for '{{ this.$route.query.query }}'.
      <span v-if="totalUserCount > 99">
        Here are the first
        <div class="badge myBadge">{{ rows }}</div>
      </span>
    </h4>

    <os-container class="mt-3 my-container">
      <os-row
        v-for="(row, index) in groupedUsers.slice(
          (currentPage - 1) * perPage,
          (currentPage - 1) * perPage + perPage
        )"
        v-bind:key="index"
      >
        <os-col
          class="col-6 col-xs-6 col-sm-6 col-md-4 col-lg-2 col-xl-2"
          v-for="item in row"
          v-bind:key="item.id"
        >
          <router-link class="userLink" :to="{ path: `/user/${item.login}` }">
            <os-card class="myCard mb-2" style="max-width: 20rem; ">
              <img
                v-bind:src="item.avatar_url"
                class="card-img-top"
                alt="some user"
              />
              <os-card-body>
                <os-card-title>{{ item.login }}</os-card-title>
              </os-card-body>
            </os-card>
          </router-link>
        </os-col>
      </os-row>
    </os-container>
    <div
      class="pagination fixed-bottom myPagination"
      :total-rows="rows"
      :per-page="perPage * 6"
      aria-controls="my-container"
      align="center"
      pills
      size="lg"
    ></div>
  </div>
</template>

<script>
import chunk from "lodash/chunk";
import Spinner from "../components/Spinner";
import OsContainer from "../components/generics/OsContainer";
import OsRow from "../components/generics/OsRow";
import OsCol from "../components/generics/OsCol";
import OsCard from "../components/generics/OsCard";
import OsCardBody from "../components/generics/OsCardBody";
import OsCardTitle from "../components/generics/OsCardTitle";

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
      };

      this.loading = true;
      // let res = await searchUsers(params);
      await this.$store.dispatch("getUserListAction", {
        queryParams: { ...params },
      });
      let res = this.$store.state.apiCalls.getUserListEntry.data;
      console.log(res.items);

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
        };

        await this.$store.dispatch("getUserListAction", {
          queryParams: { ...params },
        });
        let res = this.$store.state.apiCalls.getUserListEntry.data;
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
    OsContainer,
    OsRow,
    OsCol,
    OsCard,
    OsCardBody,
    OsCardTitle,
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
.myCard.card-body .card-title {
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
.userLink {
  text-decoration: none;
  outline: none;
}

.userLink:hover {
  text-decoration: none;
  outline: none;
}

.myBadge {
  background-color: #47a7f5;
}
</style>
