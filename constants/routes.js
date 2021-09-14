export const BASE = 'https://api.github.com'
export const ENDPOINTS = {
  'userDetails': 'users/:userName',
  'repos': 'users/:userName/repos',
  'collaborators': 'repos/:userName/:repoName/collaborators',
  'branches': 'repos/:userName/:repoName/branches',
  'commits': 'repos/:userName/:repoName/commits',
  'contents': 'repos/:userName/:repoName/contents',
  'languages': 'repos/:userName/:repoName/languages',
  'location': 'repos/:userName/:repoName/contents/:location',
}
