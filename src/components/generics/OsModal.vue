<template>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" >
    <div :class="`modal-dialog ${size ? 'modal-' + size : ''} ${scrollable ? 'modal-dialog-scrollable' : ''}`">
      <div class="modal-content">
        <div class="modal-header" v-if="$slots.header">
          <slot name="header"/>
        </div>
        <div class="modal-body">
          <slot/>
        </div>
        <div class="modal-footer">
          <slot name="footer" v-if="$slots.footer"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OsModal',
  props: {
    size: String,
    scrollable: Boolean
  }
};
</script>

<style scoped>

</style>
