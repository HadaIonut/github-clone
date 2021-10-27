<template>
  <li class="list-group-item" @click="$emit('click', $event)">
    <slot />
  </li>
</template>
<script>
export default {
  name: "OsListGroupItem",
};
</script>
