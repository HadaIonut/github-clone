<template>
  <a href="#" class="navbar-brand">
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: "OsNavbarBrand",
  props: {
    href: String,
  }
}
</script>

<style>

</style>