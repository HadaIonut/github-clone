<template>
  <div>
    <os-input-group class="input mx-auto">
      <input
          @input="handleInput"
          @keypress="handleSend"
          placeholder="Enter username..."
          class="form-control"
          type="text"
      />
      <template #append>
        <span class="input-group-text" id="basic-addon2"><i class="bi bi-search"/></span>
      </template>
    </os-input-group>
    <os-container
        fluid
        class="mt-3 search-results"
        v-if="!loadingSearchResultGroups"
    >
      <os-row
          v-for="(searchResultGroup, i) in searchResultGroups"
          :key="i"
          class="search"
      >
        <os-col
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
              <os-img-lazy
                  :src="searchResult.avatar_url"
                  :alt="searchResult.login"
                  rounded="circle"
                  style="
                  max-width: 64px;
                  max-height: 64px;
                  width: auto;
                  height: auto;
                "
              ></os-img-lazy>
              <h6 class="ml-2 text-break">{{ searchResult.login }}</h6>
            </div>
          </router-link>
        </os-col>
      </os-row>
    </os-container>
    <os-container fluid class="mt-3" v-if="loadingSearchResultGroups">
      <os-row v-for="(z, i) in Array(1).fill(0)" :key="i">
        <os-col md="12" lg="6" v-for="(z1, i1) in Array(2).fill(0)" :key="i1">
          <SearchResultsSkeletonCard/>
        </os-col>
      </os-row>
    </os-container>
  </div>
</template>

<script>
import chunk from 'lodash/chunk';

import router from '../router';
import SearchResultsSkeletonCard from './search/SearchResultsSkeletonCard.vue';
import OsInputGroup from './generics/OsInputGroup';
import OsCol from './generics/Layout/OsCol';
import OsRow from './generics/Layout/OsRow';
import OsContainer from './generics/Layout/OsContainerFluid';
import OsImgLazy from './generics/OsImgLazy';
import {ref} from 'vue';
import {useStore} from 'vuex';

export default {
  name: 'Search',
  components: {
    OsImgLazy,
    OsContainer,
    OsCol,
    OsInputGroup,
    SearchResultsSkeletonCard,
    OsRow
  },
  setup() {
    const userQuery = ref('');
    const debounceTimeout = ref(null);
    const searchResultGroups = ref([]);
    const loadingSearchResultGroups = ref(false);

    const store = useStore();

    const handleSearchResultGroupsChange = (data) => {
      searchResultGroups.value = data;
      loadingSearchResultGroups.value = false;
    };

    const handleInput = (event) => {
      userQuery.value = event.target.value;

      clearTimeout(debounceTimeout.value);
      debounceTimeout.value = setTimeout(async () => {
        await store.dispatch('getUserListAction', {
          queryParams: {q: event.target.value, per_page: 6},
        });

        const items = store.state.apiCalls.getUserListEntry.data.items;

        handleSearchResultGroupsChange(chunk(items, 2));
      }, 250);
    }

    const handleSend = (e) => {
      if (e.code === 'Enter' && !e.shiftKey) {
        router.push({path: '/search', query: {query: userQuery.value}});
      }
    };

    return {
      handleInput,
      handleSend,
      loadingSearchResultGroups,
      searchResultGroups,
    }
  }
}
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
