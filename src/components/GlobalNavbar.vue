<template>
  <div>
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
      <b-navbar-brand
        ><img
          src="https://cdn-icons-png.flaticon.com/512/1832/1832144.png"
          alt=""
          style="max-width:30px"
      /></b-navbar-brand>
      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item class="font-weight-bold"
            ><router-link to="/">Home</router-link></b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'global-navbar',
};
</script>

<style></style>
