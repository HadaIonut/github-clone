<template>
  <input
      :type="type"
      :placeholder="placeholder"
      class="form-control"
      @input="$emit('input', $event)"
      @change="$emit('change', $event)"
      @keypress="$emit('keypress', $event)"
  />
</template>

<script>
export default {
  name: 'OsInput',
  props: {
    placeholder: String,
    type: String
  },
};
</script>

<style scoped>

</style>
