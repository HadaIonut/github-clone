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
          <router-link
            class="repoLink"
            :to="{ path: `/user/${username}/repo/${repo.name}` }"
          >
            <os-card class="clickable">
              <os-container class="py-3">
                <h6 class="font-weight-bold text-left ">
                  {{ repo.name }}
                  <small>
                    <div class="badge rounded-pill bg-secondary publicLabel">
                      Public
                    </div>
                  </small>
                </h6>
                <os-row><small class="text-muted mb-1 mt-1"> {{repo.description}} </small></os-row>
                <os-row>
                  <os-col>
                    <i
                      v-if="repo.language"
                      class="bi bi-circle-fill"
                      :style="getRandomColor()"
                    >
                    </i>
                    <small class="text-muted"
                      >&nbsp;{{ repo.language }}</small
                    ></os-col
                  >
                  <os-col v-if="repo.stargazers_count">
                    <i class="bi bi-star myStar"></i>
                    <small class="text-muted"
                      >&nbsp;{{ repo.stargazers_count }}</small
                    ></os-col
                  >
                  <os-col v-else> <small class="text-muted"></small></os-col>
                  <os-col
                    ><small class="text-muted"
                      >Updated on
                      {{
                        new Date(
                          Date.parse(repo.updated_at)
                        ).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                        })
                      }}</small
                    ></os-col
                  >
                </os-row>
              </os-container>
            </os-card>
          </router-link>
        </os-col>
      </os-row>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions } from "vuex";
import OsRow from "../generics/Layout/OsRow";
import OsCol from "../generics/Layout/OsCol";
import OsContainer from "../generics/Layout/OsContainer.vue";
import OsCard from "../generics/Card/OsCard.vue";

export default {
  name: "RepoPanel",
  props: ["username"],
  data() {
    return {
      keyword: "",
    };
  },

  methods: {
    ...mapActions(["fetchRepos"]),
    handleFilter(e) {
      this.keyword = e;
    },
    getRandomColor() {
      return {
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      };
    },
  },
  async created() {
    await this.fetchRepos({
      username: this.username,
      context: this,
    });
  },

  computed: {
    ...mapGetters(["filteredRepos"]),
    repos() {
      console.log(this.filteredRepos(this.keyword));
      return this.filteredRepos(this.keyword);
    },
  },
  components: {
    OsContainer,
    OsRow,
    OsCol,
    OsCard,
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
.repoLink {
  text-decoration: none;
}
.myStar:hover {
  color: yellow;
}
.publicLabel {
  font-weight: normal;
}
</style>
