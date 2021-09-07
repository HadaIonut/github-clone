<template>
  <b-card class="">
    <b-card-img v-bind:src="user.avatar_url" />
    <b-container class="py-3">
      <h5 class="font-weight-bold">
        {{ user.name }}
      </h5>
      <b-card-text> @{{ user.login }} </b-card-text>
    </b-container>
  </b-card>
</template>

<script>
export default {
  name: 'SidePanel',
  props: ['username'],
  async created() {
    this.$store.dispatch('fetchUser', this.username);
  },
  methods: {},
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },
};
</script>
