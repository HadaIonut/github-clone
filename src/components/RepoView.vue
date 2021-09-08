<template>
  <div class="container">
    <div class="list-container">
      <h4 class="repo-title">{{ reponame }}</h4>
      <b-list-group-item
          style="display:flex; background-color:#EEEEEE; color:black; font-weight: bold;"
      >
        {{ commitsInfo }} commits have been made in this repository
      </b-list-group-item>
      <b-list-group class="list">
        <b-list-group-item
            v-for="doc in docs"
            :key="doc.sha"
            class="list-item-container"
        >
          <div @click="updateRepoContents(doc.path)" v-if="doc.type === 'dir'" class="list-item">
            <b-icon-folder-fill class="list-icon"></b-icon-folder-fill>
            <div class="list-item-doc-title">{{ doc.path }}</div>
          </div>
          <div v-if="doc.type === 'file'" class="list-item">
            <b-icon-file-code class="list-icon"></b-icon-file-code>
            <div class="list-item-doc-title">{{ doc.path }}</div>
          </div>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
export default {
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
    }
  },
  async created() {
    await this.$store.dispatch('fetchRepoContents', {userName: this.username, repoName: this.reponame});
    this.sortDocuments(this.docs);
    this.commitsInfo = this.docs.length;
  },
  methods: {
    sortDocuments(docs) {
      docs.sort((a, b) => (a.type < b.type ? -1 : 1));
    },
    async updateRepoContents(path) {
      console.log(path);
      await this.$store.dispatch('fetchRepoContentsAtLocation', {
        userName: this.username,
        repoName: this.reponame,
        location: path
      });
      this.sortDocuments(this.docs);
    }
  }
};
</script>

<style>
.repo-title {
  font-weight: bold;
}

.list {
  width: 100%;
  overflow: auto;
}

.list-item {
  display: flex;
  align-items: center;
  font-weight: bold;
}

.list-item-container {
  display: flex;
  align-items: center;
}

.list-item-doc-title {
  padding: 5px;
}

.container {
  height: 100vh;
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
</style>
