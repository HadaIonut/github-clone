<template>
  <b-modal size="lg" id="bv-modal-example" hide-footer class="vw-75">
    <template #modal-title> Using <code>$bvModal</code> Methods </template>
    <div class="d-block" v-highlight style="width:100%">
      <!-- <vue-code-highlight language="javascript">
        <pre>
          {{ content }}
        </pre>
      </vue-code-highlight> -->
      <pre class="language-javascript">
  <code>
      {{ content }}
  </code>
</pre>
    </div>
  </b-modal>
</template>

<script>
// import { component as VueCodeHighlight } from 'vue-code-highlight';
export default {
  name: 'Modal',
  components: {
    // VueCodeHighlight,
  },
  computed: {
    content() {
      return this.$store.getters.getFileContent;
    },
  },
};
</script>
