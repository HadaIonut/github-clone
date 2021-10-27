<template>
  <img
    v-lazy="{ src: src, loading: loading }"
    style="max-width: 64px; max-height: 64px; width: auto; height: auto;"
    alt="alt" 
  />
</template>
<script>
/*Img has style given by Krisztian in the Search.vue view
src, alt and loading URL are given as props
*/
export default {
  name: 'OsImgLazy',
  props: {
    src: String,
    loading: String,
    alt: String,
  }
};
</script>

<style></style>
