<template>
  <li class="breadcrumb-item" @click="$emit('click', $event)">
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: 'OsBreadcrumbItem',
};
</script>

<style></style>
