<template>
  <div>
    <b-input-group class="input mx-auto">
      <input
        @input="handleInput"
        @keypress="handleSend"
        placeholder="Enter username..."
        type="text"
      />
      <b-input-group-append>
        <b-input-group-text>
          <!-- <b-icon icon="search" /> -->
        </b-input-group-text>
      </b-input-group-append>
    </b-input-group>
    <b-container
      fluid
      class="mt-3 search-results"
      v-if="!loadingSearchResultGroups"
    >
      <b-row
        v-for="(searchResultGroup, i) in searchResultGroups"
        :key="i"
        class="search"
      >
        <b-col
          md="12"
          lg="6"
          v-for="searchResult in searchResultGroup"
          :key="searchResult.id"
        >
          <router-link :to="{ path: `/user/${searchResult.login}` }">
            <div
              class="
                d-flex
                flex-row
                justify-content-start
                align-items-center
                m-2
                p-2
                rounded
                shadow
              "
            >
              <b-img-lazy
                :src="searchResult.avatar_url"
                :alt="searchResult.login"
                rounded="circle"
                style="
                  max-width: 64px;
                  max-height: 64px;
                  width: auto;
                  height: auto;
                "
              ></b-img-lazy>
              <h6 class="ml-2 text-break">{{ searchResult.login }}</h6>
            </div>
          </router-link>
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid class="mt-3" v-if="loadingSearchResultGroups">
      <b-row v-for="(z, i) in Array(1).fill(0)" :key="i">
        <b-col md="12" lg="6" v-for="(z1, i1) in Array(2).fill(0)" :key="i1">
          <SearchResultsSkeletonCard />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// import chunk from "lodash/chunk";

import router from "../router";
// import { searchUsers } from "../utils/github";
import SearchResultsSkeletonCard from "./search/SearchResultsSkeletonCard.vue";

export default {
  name: "Search",
  components: {
    SearchResultsSkeletonCard,
  },
  data() {
    return {
      userQuery: "",
      debounceTimeout: null,
      searchResultGroups: [],
      loadingSearchResultGroups: false,
    };
  },
  methods: {
    handleSearchResultGroupsChange(data) {
      this.searchResultGroups = data;
      this.loadingSearchResultGroups = false;
    },
    async handleInput(event) {
      this.userQuery = event.target.value;
      console.log(event.target.value);

      event.target.value && await this.$store.dispatch("getUserListAction", {
        queryParams: { q: event.target.value, per_page: 6 },
      });
    },
    handleSend(e) {
      if (e.code === "Enter" && !e.shiftKey) {
        router.push({ path: "/search", query: { query: this.userQuery } });
      }
    },
  },
};
</script>

<style scoped>
.input {
  width: 40vw;
}

.search {
  flex-grow: 1;
  transition: flex-grow 5s linear;
}

@media (max-width: 768px) {
  .input {
    width: 80vw;
  }
}
</style>

<!-- 

    //   value.trim()
    //     ? (this.loadingSearchResultGroups = true)
    //     : (this.loadingSearchResultGroups = false);

    //   clearTimeout(this.debounceTimeout);
    //   this.debounceTimeout = setTimeout(
    //     async () => {
    //       const users = (await searchUsers({ context: this, q: value, per_page: 6 }))

    //       console.log(users)
                    

    //       return value.trim()
    //         ? this.handleSearchResultGroupsChange(
    //             chunk(
    //               (await searchUsers({ context: this, q: value, per_page: 6 }))
    //                 .items,
    //               2
    //             )
    //           )
    //         : this.handleSearchResultGroupsChange([])
    //       },
    //     350
    //   );

-->