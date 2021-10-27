<template>
  <div
    class="progress-bar"
    role="progressbar"
    :aria-valuenow="ariaValueNow"
    :aria-valuemin="ariaValueMin"
    :aria-valuemax="ariaValueMax"
    :style="{width: percentageOfMax + '%'}"
  >
    <slot />
  </div>
</template>
<script>
import { computed } from '@vue/reactivity';
export default {
  name: "OsProgressBar",
  props: {
    ariaValueNow: Number,
    ariaValueMin: Number,
    ariaValueMax: Number,
    value: Number,
    max: Number,
  },
  setup(props) {
    const percentageOfMax = computed(() => ((props.value / props.max) * 100))

    return { percentageOfMax }
  }
};
</script>
