<template>
  <div class="input-group">
    <slot name="prepend"/>
    <slot />
    <slot name="append"/>
  </div>
</template>
<script>
export default {
  name: "OsInputGroup",
};
</script>
