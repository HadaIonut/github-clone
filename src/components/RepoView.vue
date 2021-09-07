<template>
  <div class="container">
      <div class="list-container">
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
            <div v-if="doc.type === 'tree'" class="list-item">
              <b-icon-folder-fill class="list-icon"></b-icon-folder-fill>
              <div class="list-item-doc-title">{{ doc.path }}</div>
            </div>
            <div v-if="doc.type === 'blob'" class="list-item">
              <b-icon-file-code class="list-icon"></b-icon-file-code>
              <div class="list-item-doc-title">{{ doc.path }}</div>
            </div>
          </b-list-group-item>
        </b-list-group>
      </div>
  </div>
</template>

<script>
import { Octokit } from '@octokit/core';
export default {
  name: 'test',
  props: {
    reponame: String,
    username: String,
  },
  data() {
    return {
      docs: null,
      commitsInfo: null,
    };
  },
  async created() {
    console.log('caca');
    const octokit = new Octokit();
    const commits = await octokit.request(
      `GET /repos/${this.username}/${this.reponame}/commits`
    );
    const repoContents = await octokit.request(
      `GET /repos/${this.username}/${this.reponame}/commits/${commits.data[0]['sha']}`
    );
    this.docs = (
      await octokit.request(`GET ${repoContents.data.commit.tree.url}`)
    ).data.tree;
    this.docs.sort((a, b) => (a.type > b.type ? -1 : 1));
    this.commitsInfo = this.docs.length;
  },
};
</script>

<style>
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
