<template>
  <div class="input-group">
    <span class="input-group-text" id="basic-addon1" v-if="$slots.prepend">
      <slot name="prepend"/>
    </span>

    <slot/>

    <span class="input-group-text" id="basic-addon2" v-if="$slots.append">
      <slot name="append"/>
    </span>
  </div>
</template>
<script>
export default {
  name: 'OsInputGroup',
};
</script>
