<template>
  <table :class="['table', hover ? 'table-hover': '']">
    <thead>
    <tr>
      <th
          scope="col"
          v-for="header in tableHeaders"
          :key="header.key">
        {{ header.key }}
        {{ header.sortable ? 'sort' : ''}}
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
import {computed} from 'vue';

export default {
  name: 'OsTable',
  props: {
    items: Array,
    fields: Array,
    hover: Boolean
  },
  setup(props) {
    const RESERVED_NAMES = {
      'row': '_rowVariant',
      'cell': '_cellVariants',
      'details': '_showDetails'
    };

    const objectifyHeaders = (headers) => headers.reduce((prev, curr) => {
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

    return {
      tableHeaders,
      applySpecialRowProps,
      applySpecialCellProps
    };
  }
};
</script>

<style scoped>

</style>
