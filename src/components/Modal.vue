<template>
  <b-modal id="bv-modal-example" hide-footer>
    <template #modal-title> Using <code>$bvModal</code> Methods </template>
    <div class="d-block text-center">
      {{ content }}
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'Modal',
  computed: {
    content() {
      return this.$store.getters.getFileContent;
    },
  },
};
</script>
