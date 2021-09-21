<template>
  <OsModal size="xl" scrollable>
    <template #header>{{name}}</template>
    <pre>{{content}}</pre>
  </OsModal>
</template>

<script>
// import 'vue-code-highlight/themes/prism.css';
// import { component as VueCodeHighlight } from 'vue-code-highlight';
import OsModal from './generics/OsModal';
export default {
  name: 'Modal',
  components: {OsModal},
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
