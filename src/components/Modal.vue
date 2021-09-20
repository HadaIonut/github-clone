<template>
  <div class="modal fade">
  </div>
</template>

<script>
import 'vue-code-highlight/themes/prism.css';
//import OsModal from '../components/generics/OsModal';
export default {
  name: 'Modal',
  components: {},
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
