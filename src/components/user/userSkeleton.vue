<template>
  <div>
    <b-card>
      <b-skeleton type="avatar" class="mb-3"></b-skeleton>

      <b-skeleton animation="throb" width="85%"></b-skeleton>
      <b-skeleton animation="throb" width="55%"></b-skeleton>
      <b-skeleton animation="throb" width="70%"></b-skeleton>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'UserSkeleton',
};
</script>

<style></style>
