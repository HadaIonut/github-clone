<template>
  <div>
    <ul>
      <div>
        <b-list-group class="list">
          <b-list-group-item
            v-for="doc in docs"
            :key="doc.sha"
            class="list-item-container"
            >
              <div v-if="doc.type === 'tree'" class="list-item">
                  <b-icon-folder-fill style="height:50%; width:25px;"></b-icon-folder-fill>
                  <div class="list-item-doc-title">{{ doc.path }}</div>
              </div>
              <div v-if="doc.type === 'blob'" class="list-item">
                  <b-icon-file-code style="height:50%; width:25px;"></b-icon-file-code>
                  <div class="list-item-doc-title">{{ doc.path }}</div>
              </div>
            </b-list-group-item
          >
        </b-list-group>
      </div>
    </ul>
  </div>
</template>

<script>
import { Octokit } from '@octokit/core';
export default {
  name: 'test',
  data() {
    return {
      docs: null,
    };
  },
  async created() {
    const octokit = new Octokit();
    const commits = await octokit.request(
      'GET /repos/HadaIonut/CallbackDragons/commits'
    );
    const repoContents = await octokit.request(
      `GET /repos/HadaIonut/CallbackDragons/commits/${commits.data[0]['sha']}`
    );
    this.docs = (
      await octokit.request(`GET ${repoContents.data.commit.tree.url}`)
    ).data.tree;
  },
};
</script>

<style>
.list{
  width: 50rem;
  height: 50rem;
}
.list-item{
  display:flex;
  align-items: center;
}
.list-item-container{
  display:flex;
  align-items: center;
}
.list-item-doc-title {
  padding: 5px;
}
</style>
