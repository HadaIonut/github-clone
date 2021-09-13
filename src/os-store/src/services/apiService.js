import axios from 'axios';

const REQUEST_TYPES = Object.freeze({
  FILE: 'file',
  JSON: 'json',
});

export const METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
  DOWNLOAD: 'download',
};

// TODO: refactorization
class RouteBuilder {
  extractRouteParamsFromEndpoint = endpoint => {
    const params = endpoint.match(/(:[^/]+\/?)/g) || [];

    return params.map(param => param.replace(':', '').replace('/', ''));
  };

  applyParamValuesToEndpoint = (routeParamsList, routeParams, endpoint) => {
    let composedRoute = endpoint;
    routeParamsList.forEach(paramName => {
      composedRoute = composedRoute.replace(
        `:${paramName}`,
        routeParams[paramName]
      );
    });

    return composedRoute;
  };

  buildRoute = (endpoint, routeParams = {}) => {
    const routeParamsList = this.extractRouteParamsFromEndpoint(endpoint);
    // compose route
    return this.applyParamValuesToEndpoint(
      routeParamsList,
      routeParams,
      endpoint
    );
  };
}

class APIService {
  constructor() {
    this.routeBuilder = new RouteBuilder();
    this.request = {};
    this.requestType = REQUEST_TYPES.JSON;
    this.body = {};
  }

  static setToken(token) {
    axios.defaults.headers.common.Authorization = token;
  }

  setRequestParams(method, body, requestType) {
    if (method === METHODS.DOWNLOAD) {
      this.request.method = METHODS.GET;
    } else {
      this.request.method = method;
    }

    this.body = body;
    this.requestType = requestType;
  }

  queryBuilder = (queryParams = {}) => {
    const keys = Object.keys(queryParams) || [];
    const query = keys.map(key => `${key}=${queryParams[key]}`).join('&');

    if (query !== '') return `?${query}`;

    return '';
  };

  urlBuilder(endpoint, queryParams, routeParams) {
    const query = this.queryBuilder(queryParams);
    const route = this.routeBuilder.buildRoute(endpoint, routeParams);
    // url
    return `${route}${query}`;
  }

  headersBuilder = (headers, type) => {
    const possibleTypes = {
      json: 'application/json',
      file: 'multipart/form-data',
    };
    return {
      'Content-Type': possibleTypes[type] || possibleTypes.json,
      ...headers,
    };
  };

  setRequestPayload() {
    if (this.requestType === REQUEST_TYPES.JSON) {
      this.request.data = this.body;
    } else {
      const formData = new FormData();
      formData.append(this.body.field, this.body.file);

      this.request.data = formData;
    }
  }

  getContent() {
    if (
      this.request.method === METHODS.POST ||
      this.request.method === METHODS.PUT ||
      this.request.method === METHODS.PATCH
    ) {
      this.setRequestPayload();
    }
  }

  downloadFile(fileName = 'file.txt') {
    return axios(this.request).then(response => {
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const fileLink = document.createElement('a');
      fileLink.addEventListener('click', e => e.stopPropagation());

      fileLink.href = fileURL;
      fileLink.setAttribute('download', fileName);

      document.body.appendChild(fileLink);

      fileLink.click();
    });
  }

  makeRequest(requestConfig) {
    const {
      fileName,
      endpoint,
      queryParams,
      routeParams,
      headers = {},
      body,
      method,
      requestType = REQUEST_TYPES.JSON,
    } = requestConfig;

    this.request.url = this.urlBuilder(endpoint, queryParams, routeParams);
    this.request.headers = this.headersBuilder(headers, requestType);
    this.request.withCredentials = false;

    this.setRequestParams(method, body, requestType);
    this.getContent();

    if (method === METHODS.DOWNLOAD) {
      return this.downloadFile(fileName);
    }

    return axios(this.request);
  }
}

export { APIService };
