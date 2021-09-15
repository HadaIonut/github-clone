<template>
  <div class="home">
    <div class="search">
      <p class="title-text text-center">Who do you want to find?</p>
      <Search />
      <OsBreadcrumb>
        <OsBreadcrumbItem v-for="(path, index) in paths" :key="index">
          {{path}}
        </OsBreadcrumbItem>
      </OsBreadcrumb>
    </div>
  </div>
</template>

<script>
import OsBreadcrumbItem from '../components/generics/OsBreacrumbItem.vue';
import OsBreadcrumb from '../components/generics/OsBreadcrumb.vue';
import Search from '../components/Search';

export default {
  name: 'Home',
  components: {
    Search,
    OsBreadcrumb,
    OsBreadcrumbItem,
  },
  created() {
    
  },
  data() {
    return{
       paths: ["Home", "User", "Repo"],
    }
  }
}
</script>

<style>
.home {
  height: calc(100vh - 60px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-text {
  font-size: xx-large;
  margin-bottom: 1rem;
}
</style>
