<template>
  <table :class="['table', hover ? 'table-hover': '']">
    <thead>
    <tr>
      <th
          scope="col"
          v-for="header in tableHeaders"
          :key="header.key">
        {{ header.key }}
        <i @click="sortByColumn(header.key)" v-if="header.sortable" :class="sortModifiers[header.key] !== -1 ? 'bi bi-sort-down': 'bi bi-sort-up'"></i>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr :class="applySpecialRowProps(item)" v-for="(item, index) in items" :key="index">
      <td :class="applySpecialCellProps(item, itemName)" v-for="(itemName, index) in tableHeaders"
          :key="`${index}-${itemName.key}`">{{ item[itemName.key] }}
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {computed, ref} from 'vue';

export default {
  name: 'OsTable',
  props: {
    items: Array,
    fields: Array,
    hover: Boolean
  },
  setup(props) {
    const sortModifiers = ref([]);
    const sortablesCount = ref(0);
    const RESERVED_NAMES = {
      'row': '_rowVariant',
      'cell': '_cellVariants',
      'details': '_showDetails'
    };

    const objectifyHeaders = (headers) => headers.reduce((prev, curr) => {
      if (curr.sortable) sortablesCount.value++;
      if (typeof curr === 'string')
        return [...prev, {key: curr, sortable: false}]
      else return [...prev, curr]
    }, []);

    const tableHeaders = computed(() => objectifyHeaders(props.fields || Object.keys(props.items[0])));

    const applySpecialRowProps = (item) => {
      if (item[RESERVED_NAMES['row']]) return `table-${item[RESERVED_NAMES['row']]}`;
    };

    const applySpecialCellProps = (item, itemName) => {
      if (item?.[RESERVED_NAMES['cell']]?.[itemName]) return `table-${item[RESERVED_NAMES['cell']][itemName]}`;
    };

    const sortByColumn = (header) => {
      sortModifiers.value[header] = sortModifiers.value[header] || 1;
      props.items.sort((a, b) => {
        if(a[header] < b[header]) { return -sortModifiers.value[header]; }
        if(a[header] > b[header]) { return sortModifiers.value[header]; }
        return 0;
      })
      sortModifiers.value[header] *= -1;
    }

    return {
      tableHeaders,
      applySpecialRowProps,
      applySpecialCellProps,
      sortByColumn,
      sortModifiers
    };
  }
};
</script>

<style scoped>

</style>
