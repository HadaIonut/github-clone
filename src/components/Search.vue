<template>
  <div>
    <b-input-group class="input">
      <b-form-input v-on:keypress="handleSend" v-on:input="handleInput" placeholder="Enter username"/>
      <b-input-group-append>
        <b-input-group-text>
          <b-icon icon="search" />
        </b-input-group-text>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>

import router from '../router';

export default {
  name: 'Search',
  methods: {
    handleInput(e) {
      this.userQuery = e;
    },
    handleSend(e) {
      if (e.code === 'Enter') {
        router.push({path: "/search", query: {query: this.userQuery}})
      }
    }
  },
  data() {
    return {
      userQuery: String
    }
  }
};
</script>

<style scoped>
.input {
  width: 40vw;
}
</style>
