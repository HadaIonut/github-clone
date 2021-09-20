<template>
  <os-container class="pt-5 container">
    <div class="list-container">
      <h4 class="repo-title">{{ reponame }}</h4>
      <OsBreadcrumb>
        <div class="breadcrumb-item active" @click="goToLocation('')">
          <!-- TODO: move to custom event -->
          <div><i class="bi bi-house-fill"></i> Home</div>
        </div>
        <div
          v-for="(path, index) in paths"
          :key="index"
          @click="goToLocation(paths[index + 1])"
          class="breadcrumb-item active"
        >
          {{ path }}
        </div>
      </OsBreadcrumb>
      <LanguagesBar v-bind:username="username" v-bind:reponame="reponame" />

      <os-container-fluid class="p-0">
        <OsListGroupItem
          class="font-weight-bold bg-secondary text-white d-flex rounded-top"
        >
          {{ commitsInfo }} commits have been made in this repository.
          {{ nrOfBranches }} active
          <span v-if="nrOfBranches == 1">&nbsp;branch </span>
          <span v-if="nrOfBranches > 1">&nbsp;branches</span>.
        </OsListGroupItem>
        <OsListGroupItem
          class="clickable d-flex font-weight-bold"
          @click="goToParentDirectory"
          v-if="this.currentLocationString !== ''"
        >
          ..
        </OsListGroupItem>
        <OsListGroup class="list">
          <div v-for="doc in docs" :key="doc.sha" v-on:click="handleClick(doc)">
            <OsListGroupItem class="list-item-container clickable">
              <div v-if="doc.type === 'dir'" class="list-item">
                <i class="bi bi-folder-fill list-icon"> </i>
                <div class="list-item-doc-title">{{ doc.name }}</div>
              </div>
              <div v-if="doc.type === 'file'" class="list-item">
                <i class="bi bi-file-code list-icon"> </i>
                <div class="list-item-doc-title">{{ doc.name }}</div>
              </div>
            </OsListGroupItem>
          </div>
        </OsListGroup>
      </os-container-fluid>
    </div>
    <!-- <Modal /> -->
  </os-container>
</template>

<script>
import LanguagesBar from './repos/LanguagesBar.vue';
//import OsBreadcrumbItem from './generics/OsBreadcrumbItem.vue';
import OsBreadcrumb from '../components/generics/OsBreadcrumb.vue';
import OsContainer from './generics/Layout/OsContainer.vue';
import OsContainerFluid from './generics/Layout/OsContainerFluid.vue';

import OsListGroup from '../components/generics/OsListGroup.vue';
import OsListGroupItem from '../components/generics/OsListGroupItem.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  components: {
    LanguagesBar,
    OsBreadcrumb,
    //OsBreadcrumbItem,
    OsContainer,
    OsContainerFluid,
    OsListGroup,
    OsListGroupItem,
  },
  name: 'RepoView',
  props: {
    reponame: String,
    username: String,
  },
  data() {
    return {
      commitsInfo: null,
      nrOfBranches: null,
      curState: '',
      targetLocation: '',
    };
  },
  computed: {
    ...mapGetters({
      docs: 'allRepoContents',
      paths: 'getCurrentLocationAsArray',
      currentLocationString: 'getCurrentLocationAsString',
      getPathFromLocation: 'getPathFromLocation',
      commits: 'getCommits',
      branches: 'getBranches',
    }),
    pathFromLocation() {
      return this.getPathFromLocation(this.targetLocation);
    },
  },
  async created() {
    await this.fetchRepoContents({
      userName: this.username,
      repoName: this.reponame,
      context: this,
    });
    this.sortDocuments(this.docs);

    await this.fetchCommits({
      userName: this.username,
      repoName: this.reponame,
      context: this,
    });
    this.commitsInfo = this.commits.length;

    await this.fetchBranches({
      userName: this.username,
      repoName: this.reponame,
      context: this,
    });

    this.nrOfBranches = this.branches.length;
  },
  methods: {
    ...mapActions([
      'fetchRepoContents',
      'updateCurrentLocation',
      'fetchRepoContentsAtLocation',
      'updateFileContent',
      'updateFileName',
      'fetchCommits',
      'fetchBranches',
    ]),
    sortDocuments(docs) {
      docs.sort((a, b) => (a.type < b.type ? -1 : 1));
    },
    async updateRepoContents(path) {
      await this.updateCurrentLocation(path);
      await this.updateDisplayAndSort(path);
    },
    async goToParentDirectory() {
      setTimeout(async () => {
        this.curState = this.currentLocationString;
        this.targetLocation = this.curState.lastIndexOf('/');
        await this.updateCurrentLocation(this.pathFromLocation);
        await this.updateDisplayAndSort(this.currentLocationString);
      }, 300);
    },
    async updateDisplayAndSort(path) {
      await this.fetchRepoContentsAtLocation({
        userName: this.username,
        repoName: this.reponame,
        location: encodeURIComponent(path),
        context: this,
      });
      this.sortDocuments(this.docs);
    },
    async goToLocation(path) {
      this.curState = this.currentLocationString;
      this.targetLocation = this.curState.lastIndexOf(`/${path}`);
      await this.updateCurrentLocation(this.pathFromLocation);
      await this.updateDisplayAndSort(this.currentLocationString);
    },
    async openModal(downloadUrl, name) {
      const body = (await fetch(downloadUrl)).body;
      const readable = await body.getReader().read();
      const final = new TextDecoder('utf-8').decode(readable.value);
      await this.updateFileContent(final);
      await this.updateFileName(name);
      //this.$refs.myModal.show();*/
    },
    handleClick(doc) {
      console.log('here');
      setTimeout(() => {
        if (doc.type === 'dir') this.updateRepoContents(doc.path);
        if (doc.type === 'file') this.openModal(doc.download_url, doc.name);
      }, 300);
    },
  },
};
</script>

<style scoped>
.repo-title {
  font-weight: bold;
}

.list {
  width: 100%;
  height: 65vh;
  overflow: auto;
  border-radius: 0;
}

.list-item {
  display: flex;
  align-items: center;
  font-weight: bold;
  width: 100%;
  height: 100%;
}

.list-item-container {
  display: flex;
  align-items: center;
  border-top: 0;
}

.list-item-doc-title {
  padding: 5px;
}

.container {
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.list-icon {
  height: 50%;
  width: 25px;
  color: black;
}

.list-container {
  width: 80%;
}

.bread {
  background-color: white;
  padding-left: 0;
}

/* Ripple effect */
.clickable {
  background-position: center;
  transition: background 0.8s;
  cursor: pointer;
}
.clickable:hover {
  background: #47a7f5 radial-gradient(circle, transparent 1%, #47a7f5 1%)
    center/15000%;
}
.clickable:active {
  background-color: #6eb9f7;
  background-size: 100%;
  transition: background 0s;
}
</style>
