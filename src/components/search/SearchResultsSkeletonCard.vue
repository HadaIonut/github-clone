<template>
  <div
    class="
      d-flex
      flex-row
      justify-content-start
      align-items-center
      m-2
      p-2
      rounded
      shadow
      sizingVars
      spacingVars
    "
  >
    <b-skeleton type="avatar" class="imageSkeleton"></b-skeleton>
    <b-skeleton class="ml-2 textSkeleton"></b-skeleton>
  </div>
</template>
<script>
export default {
  name: "SearchResultsSkeletonCard",
};
</script>
<style scoped>
.sizingVars {
  --sizing-image: 64px
}

.spacingVars {
  --margin-2: 0.5rem;
}

.textSkeleton {
  width: calc(100% - var(--sizing-image) - var(--margin-2));
}

.imageSkeleton {
  width: var(--sizing-image);
  height: var(--sizing-image);
}
</style>