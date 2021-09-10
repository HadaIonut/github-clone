<template>
  <div>
    <b-progress class="mt-2 mb-3" :max="total">
      <b-progress-bar
        :value="language"
        :style="getRandomColor()"
        v-for="(language, name, index) in languages"
        :key="index"
        >{{ name }}</b-progress-bar
      >
    </b-progress>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'LanguagesBar',
  props: ['username', 'reponame'],
  methods: {
    ...mapActions(['fetchLanguages']),
    calculateTotal(obj) {
      for (let value in obj) {
        this.total += obj[value];
      }
    },
    getRandomColor() {
      return {
        'background-color':
          '#' + Math.floor(Math.random() * 16777215).toString(16),
      };
    },
  },

  computed: {
    ...mapGetters({ languages: 'getLanguages' }),
  },
  data() {
    return {
      total: 0,
    };
  },
  async created() {
    await this.fetchLanguages({
      userName: this.username,
      repoName: this.reponame,
      context: this,
    });
    this.calculateTotal(this.languages);
  },
};
</script>

<style></style>
