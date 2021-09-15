<template>
  <div>
    <OsNavbar>
      <OsNavbarToggle></OsNavbarToggle>
      <OsNavbarBrand>
        <img
          src="https://cdn-icons-png.flaticon.com/512/1832/1832144.png"
          alt="cacamaca"
          style="max-width:30px"
        />
      </OsNavbarBrand>
      <OsNavbarCollapse>
        <OsNavbarNav>
          <OsNavbarNavItem>
            <router-link to="/">Home</router-link>
          </OsNavbarNavItem>
        </OsNavbarNav>
      </OsNavbarCollapse>
    </OsNavbar>
  </div>
</template>
<script>
import OsNavbar from './generics/Navbar/OsNavbar';
import OsNavbarBrand from './generics/Navbar/OsNavbarBrand';
import OsNavbarCollapse from './generics/Navbar/OsNavbarCollapse';
import OsNavbarNav from './generics/Navbar/OsNavbarNav';
import OsNavbarNavItem from './generics/Navbar/OsNavbarNavItem';
import OsNavbarToggle from './generics/Navbar/OsNavbarToggle';
export default {
  name: 'global-navbar',
  components: {
    OsNavbar,
    OsNavbarBrand,
    OsNavbarCollapse,
    OsNavbarNav,
    OsNavbarNavItem,
    OsNavbarToggle,
  },
};
</script>

<style></style>
