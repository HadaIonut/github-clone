<template>
  <table :class="['table', hover ? 'table-hover': '']">
    <thead>
    <tr>
      <th
          scope="col"
          v-for="header in tableHeaders"
          :class="applyColumnVariant(header.variant)"
          :key="header.key">
        {{ header.label }}
        <i @click="sortByColumn(header.key)"
           v-if="header.sortable"
           :class="sortButtonPosition(header.key)"/>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr :class="applySpecialRowProps(item)"
        v-for="(item, index) in items"
        :key="index">
        <td v-for="(itemName, index) in tableHeaders"
            :id="itemName.key"
            :class="[applySpecialCellProps(item, itemName.key), applyColumnVariant(itemName.variant)]"
            :key="`${index}-${itemName.key}`">
          <slot :name="itemName.key" :item="item" :headers="tableHeaders">
            {{ item[itemName.key] }}
          </slot>
        </td>
    </tr>
    </tbody>
<!--    <slot v-for="header in tableHeaders" :name="header.key"/>-->
    <slot name="abcd"></slot>
    <slot name="abcd"></slot>
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
    const sortModifiers = ref({});
    const RESERVED_NAMES = {
      'row': '_rowVariant',
      'cell': '_cellVariants',
      'details': '_showDetails'
    };

    const objectifyHeaders = (headers) => headers.reduce((prev, curr) =>
        [...prev, typeof curr === 'string' ? {key: curr, sortable: false, label: curr} : {label:curr.key, ...curr}], []);

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
        if (a[header] < b[header]) return -sortModifiers.value[header];
        if (a[header] > b[header]) return sortModifiers.value[header];
        return 0;
      });
      sortModifiers.value[header] *= -1;
    };

    const sortButtonPosition = (headerKey) => sortModifiers.value[headerKey] !== -1 ? 'bi bi-sort-down' : 'bi bi-sort-up';
    const applyColumnVariant = (variant) => variant ? `table-${variant}` : '';

    return {
      tableHeaders,
      sortModifiers,
      applySpecialRowProps,
      applySpecialCellProps,
      sortByColumn,
      sortButtonPosition,
      applyColumnVariant
    };
  }
};
</script>

<style scoped>

</style>
