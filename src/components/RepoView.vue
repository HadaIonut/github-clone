<template>
  <b-container class="py-5 containerul-nostru">
    <div class="list-container">
      <h4 class="repo-title">{{ reponame }}</h4>
      <b-breadcrumb class="bread">
        <b-breadcrumb-item @click="goToLocation('')">
          <b-icon
            icon="house-fill"
            scale="1.25"
            shift-v="1.25"
            aria-hidden="true"
          />
          Home
        </b-breadcrumb-item>
        <b-breadcrumb-item
          v-for="(path, index) in paths"
          :key="index"
          @click="goToLocation(paths[index + 1])"
          >{{ path }}</b-breadcrumb-item
        >
      </b-breadcrumb>
      <b-container fluid class="p-0">
        <b-list-group-item
          class="font-weight-bold bg-secondary text-white"
          style="display:flex; border-radius:5px 5px 0 0"
        >
          {{ commitsInfo }} commits have been made in this repository
        </b-list-group-item>
        <b-list-group-item
          class="bg-light"
          style="display:flex; font-weight: bold;"
          @click="goToParentDirectory"
          v-if="this.$store.getters.getCurrentLocationAsString !== ''"
        >
          ..
        </b-list-group-item>
        <b-list-group class="list">
          <b-list-group-item
            v-for="doc in docs"
            :key="doc.sha"
            class="list-item-container"
          >
            <div
              @click="updateRepoContents(doc.path)"
              v-if="doc.type === 'dir'"
              class="list-item"
            >
              <b-icon-folder-fill class="list-icon"></b-icon-folder-fill>
              <div class="list-item-doc-title">{{ doc.name }}</div>
            </div>
            <div
              v-if="doc.type === 'file'"
              class="list-item"
              @click="openModal(doc.download_url)"
            >
              <b-icon-file-code class="list-icon"></b-icon-file-code>
              <div class="list-item-doc-title">{{ doc.name }}</div>
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-container>
    </div>
    <Modal />
  </b-container>
</template>

<script>
import Modal from '../components/Modal.vue';
export default {
  components: { Modal },
  name: 'RepoView',
  props: {
    reponame: String,
    username: String,
  },
  data() {
    return {
      commitsInfo: null,
    };
  },
  computed: {
    docs() {
      return this.$store.getters.allRepoContents;
    },
    paths() {
      return this.$store.getters.getCurrentLocationAsArray;
    },
  },
  async created() {
    await this.$store.dispatch('fetchRepoContents', {
      userName: this.username,
      repoName: this.reponame,
      context: this,
    });
    this.sortDocuments(this.docs);
    this.commitsInfo = this.docs.length;
  },
  methods: {
    sortDocuments(docs) {
      docs.sort((a, b) => (a.type < b.type ? -1 : 1));
    },
    async updateRepoContents(path) {
      await this.$store.dispatch('setCurrentLocation', path);
      await this.updateDisplayAndSort(path);
    },
    async goToParentDirectory() {
      const curState = this.$store.getters.getCurrentLocationAsString;
      await this.$store.dispatch(
        'setCurrentLocation',
        this.$store.getters.getPathFromLocation(curState.lastIndexOf('/'))
      );
      await this.updateDisplayAndSort(
        this.$store.getters.getCurrentLocationAsString
      );
    },
    async updateDisplayAndSort(path) {
      await this.$store.dispatch('fetchRepoContentsAtLocation', {
        userName: this.username,
        repoName: this.reponame,
        location: path,
        context: this,
      });
      this.sortDocuments(this.docs);
    },
    async goToLocation(path) {
      const curState = this.$store.getters.getCurrentLocationAsString;
      await this.$store.dispatch(
        'setCurrentLocation',
        this.$store.getters.getPathFromLocation(curState.indexOf(path))
      );
      await this.updateDisplayAndSort(
        this.$store.getters.getCurrentLocationAsString
      );
    },
    openModal(downloadUrl) {
      fetch(downloadUrl)
        .then((response) => response.body)
        .then((body) => body.getReader().read())
        .then((read) => {
          this.$store.dispatch(
            'updateFileContent',
            new TextDecoder('utf-8').decode(read.value)
          );
        });

      this.$bvModal.show('bv-modal-example');
    },
  },
};
</script>

<style>
.repo-title {
  font-weight: bold;
}

.list {
  width: 100%;
  height: 70vh;
  overflow: auto;
  border-radius: 0;
}

.list-item {
  display: flex;
  align-items: center;
  font-weight: bold;
}

.list-item-container {
  display: flex;
  align-items: center;
  border-top: 0;
}

.list-item-doc-title {
  padding: 5px;
}

.containerul-nostru {
  /* height: 100vh; */
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
</style>
