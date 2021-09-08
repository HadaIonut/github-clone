import { Octokit } from '@octokit/core';
const octokit = new Octokit();

import { makeErrorToast } from "../utils/toast"

const searchUsers = async (params) => {
  try {
    return (await octokit.request('GET /search/users', params)).data;
  } catch (error) {
    makeErrorToast(
      params?.context,
      error.message || `Unable to search for users like '${params?.q}'`
    );
  }

};

export { searchUsers };
