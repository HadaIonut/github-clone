<template>
  <div class="home">
<!--    <div class="search">-->
<!--      <p class="title-text text-center">Who do you want to find?</p>-->
<!--      <Search />-->
<!--    </div>-->
    <OsTable :items="items" :fields="fields" hover></OsTable>
  </div>
</template>

<script>
// import Search from '../components/Search';
import OsTable from '../components/generics/OsTable';

export default {
  name: 'Home',
  components: {
    OsTable,
    // Search,
  },
  data() {
    return {
      fields: [
        {
          key: 'last_name',
          sortable: true
        },
        {
          key: 'first_name',
          sortable: false
        },
        {
          key: 'age',
          label: 'Person age',
          sortable: true,
          // Variant applies to the whole column, including the header and footer
          variant: 'danger'
        }
      ],
      items: [
        { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
      ]
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
