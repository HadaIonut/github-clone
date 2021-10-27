<template>
  <div>
    <OsProgress class="mt-2 mb-3">
        <OsProgressBar
        :max="getTotalLanguages"
        :value="language"
        :style="getRandomColor()"
        v-for="(language, name, index) in getLanguages"
        :key="index"
        >{{ name }}
      </OsProgressBar>
    </OsProgress>
  </div>
</template>

<script>
import { computed, onBeforeMount } from "vue";
import { useStore } from "vuex";

import OsProgress from "../generics/OsProgress.vue";
import OsProgressBar from "../generics/OsProgressBar.vue";

export default {
  name: "LanguagesBar",
  props: ["username", "reponame"],
  components: {
    OsProgress,
    OsProgressBar,
  },
  setup(props) {
    onBeforeMount(async () => {
      await store.dispatch('getLanguagesAction', {routeParams: {
          userName: props.username,
          repoName: props.reponame,
        }})
    });

    const store = useStore();

    const getLanguages = computed(() => store.getters.languagesDataGetter);
    const getTotalLanguages = computed(() => store.getters.getTotalLanguages);

    const getRandomColor = () =>
      `background-color: #${Math.floor(Math.random() * 16777215).toString(16)}`;

    return { getRandomColor, getLanguages, getTotalLanguages };
  },
};
</script>

<style></style>
