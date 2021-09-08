<template>
  <div>
    <b-input-group class="input mx-auto">
      <b-form-input
        @input="handleInput"
        @keypress="handleSend"
        placeholder="Enter username..."
      />
      <b-input-group-append>
        <b-input-group-text>
          <b-icon icon="search" />
        </b-input-group-text>
      </b-input-group-append>
    </b-input-group>
    <b-container fluid class="mt-3">
      <b-row v-for="(searchResultGroup, i) in searchResultGroups" :key="i">
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
  </div>
</template>

<script>
import chunk from "lodash/chunk";
import router from "../router";
import { searchUsers } from "../utils/github";

export default {
  name: "Search",
  data() {
    return {
      userQuery: "",
      debounceTimeout: null,
      searchResultGroups: [],
    };
  },
  methods: {
    handleInput(value) {
      this.userQuery = value;

      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(
        async () =>
          value.trim()
            ? (this.searchResultGroups = chunk(
                (await searchUsers({ context: this, q: value, per_page: 6 })).items,
                2
              ))
            : (this.searchResultGroups = []),
        350
      );
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

@media (max-width: 768px) {
  .input {
    width: 80vw;
  }
}
</style>
