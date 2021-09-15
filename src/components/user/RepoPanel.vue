<template>
  <div>
    <div>
      <os-row>
        <os-col class="col-xs-12 col-lg-6 col-xl-6 mb-3">
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
        </os-col>
      </os-row>
    </div>
    <div>
      <os-row class="">
        <os-col
          v-for="(repo, index) in repos"
          :key="index"
          class="col-lg-6 col-md-6 col-xs-12  mb-2"
        >
          <router-link class="repoLink" :to="{ path: `/user/${username}/repo/${repo.name}` }">
            <os-card class="clickable">
              <os-container class="py-3">
                <h6 class="font-weight-bold text-left ">
                  {{ repo.name }}
                </h6>
                <os-card-text class="text-left"> @{{ username }} </os-card-text>
              </os-container>
            </os-card>
          </router-link>
        </os-col>
      </os-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import OsRow from "../generics/Layout/OsRow";
import OsCol from "../generics/Layout/OsCol";
import OsContainer from '../generics/Layout/OsContainer.vue';
import OsCard from "../generics/Card/OsCard.vue"
import OsCardText from "../generics/Card/OsCardText.vue"
// import OsCardBody from "../components/generics/OsCardBody";
// import OsCardTitle from "../components/generics/OsCardTitle";

export default {
  name: 'RepoPanel',
  props: ['username'],
  data() {
    return {
      keyword: '',
    };
  },

  methods: {
    ...mapActions(['fetchRepos']),
    handleFilter(e) {
      this.keyword = e;
    },
  },
  async created() {
    await this.fetchRepos({
      username: this.username,
      context: this,
    });
  },
  // computed: {
  //   repos() {
  //     return this.$store.getters.filteredRepos(this.keyword);
  //   },
  // },
  computed: {
    ...mapGetters(['filteredRepos']),
    repos() {
      return this.filteredRepos(this.keyword);
    },
  },
  components:{
    OsContainer,
    OsRow,
    OsCol,
    OsCard,
   OsCardText,
  }
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
.repoLink{
   text-decoration: none;

}
</style>
