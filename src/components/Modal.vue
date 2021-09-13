<template>
  <b-modal size="xl" id="bv-modal" hide-footer class="vw-75" scrollable>
    <template #modal-title>
      <h5 class="font-weight-bold">{{ name }}</h5>
    </template>
    <div class="d-block" v-highlight style="width:100%">
      <pre class="language-javascript"><code>{{content}}</code></pre>
    </div>
  </b-modal>
</template>

<script>
import 'vue-code-highlight/themes/prism.css';

export default {
  name: 'Modal',
  computed: {
    content() {
      return this.$store.state.apiCalls.getFileContentEntry.data;
    },
    name() {
      return this.$store.getters.getFileName;
    },
  },
};
</script>

<style scoped></style>
