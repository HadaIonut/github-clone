<template>
  <b-modal size="xl" id="bv-modal-example" hide-footer class="vw-75">
    <template #modal-title> Using <code>$bvModal</code> Methods</template>
    <div class="d-block" v-highlight style="width:100%">
      <pre class="language-javascript">
        <code>
          {{ content }}
        </code>
      </pre>
    </div>
  </b-modal>
</template>

<script>
import 'vue-code-highlight/themes/prism.css';

export default {
  name: 'Modal',
  computed: {
    content() {
      return this.$store.getters.getFileContent;
    },
  },
};
</script>
