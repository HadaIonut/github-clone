import { Octokit } from "@octokit/core";

import { makeErrorToast } from "../../utils/toast";

const octokit = new Octokit();

const state = {
  repoContents: [],
};

const actions = {
  async fetchRepoContents({commit}, {userName, repoName}) {
    try {
      const commits = await octokit.request(
        `GET /repos/${userName}/${repoName}/commits`
      );
      const repoContents = await octokit.request(
        `GET /repos/${userName}/${repoName}/commits/${commits.data[0]['sha']}`
      );
      const docs = (
        await octokit.request(`GET ${repoContents.data.commit.tree.url}`)
      ).data.tree;
      commit('setRepoContents', docs);
    } catch (error) {
      makeErrorToast(
        error.message || `Unable to fetch ${repoName}'s contents`
      );
    }
  }
}

const getters = {
  allRepoContents: (state) => state.repoContents,
}

const mutations = {
  setRepoContents: (state, repoContents) => state.repoContents = repoContents
}

export default {
  state,
  getters,
  actions,
  mutations,
};
