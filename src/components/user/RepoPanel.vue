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
        <span
          v-for="(repo, index) in repos"
          :key="index"
          class="col-4 mr-2 mb-2"
        >
          <router-link :to="{ path: `/user/${username}/repo/${repo.name}` }">
            <b-card class="clickable">
              <b-container class="py-3">
                <h6 class="font-weight-bold text-left ">
                  {{ repo.name }}
                </h6>
                <b-card-text class="text-left"> @{{ username }} </b-card-text>
              </b-container>
            </b-card>
          </router-link>
        </span>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RepoPanel',
  props: ['username'],
  data() {
    return {
      keyword: '',
    };
  },
  async created() {
    await this.$store.dispatch('fetchRepos', {
      username: this.username,
      context: this,
    });
  },
  methods: {
    handleFilter(e) {
      this.keyword = e;
    },
  },
  computed: {
    repos() {
      return this.$store.getters.filteredRepos(this.keyword);
    },
  },
};
</script>
<style scoped>
.clickable {
  background-position: center;
  transition: background 0.8s, color 0.3s;
  cursor: pointer;
  color: black;
  text-decoration: none;
  height: 100%;
  width: 100%;
}
.clickable:hover {
  background: #47a7f5 radial-gradient(circle, transparent 1%, #47a7f5 1%)
    center/15000%;
}
</style>
