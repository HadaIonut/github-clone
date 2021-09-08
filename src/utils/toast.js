export function makeErrorToast(context, errorMessage, hideDelay = 5000) {
  context?.$bvToast?.toast(errorMessage, {
    title: 'Error',
    autoHideDelay: hideDelay,
    appendToast: true,
    variant: 'danger'
  })
}
