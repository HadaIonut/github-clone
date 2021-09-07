export function makeErrorToast(errorMessage, hideDelay = 5000) {
  this.$bvToast.toast(errorMessage, {
    title: 'Error',
    autoHideDelay: hideDelay,
    appendToast: true,
    variant: 'danger'
  })
}
