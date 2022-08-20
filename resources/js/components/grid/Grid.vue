<template>
  <div class="d-flex-col bordered h-100" ref="grid">

    <grid-header-row :columns="columns">
        <template v-slot:th="th">
            <slot name="th" :th="th.colData"></slot>
        </template>
    </grid-header-row>

    <grid-row
        v-for="(row, r) in rows"
        :columns="columns"
        :row="row"
        :cellsData="cellsData[row] || {}"
        :draggable="draggable"
        :cellDataStyle="cellDataStyle"
        @drop="bubbleUp('drop', $event)"
        @select="bubbleUp('select', $event)"
        @edit="bubbleUp('edit', $event)"
        :key="r"
        >
        <template v-slot:cell="data">
            <slot name="cell" :data="data.data"></slot>
        </template>
        <template v-slot:row="row">
            <slot name="row" :row="row.rowData"></slot>
        </template>
    </grid-row>

  </div>
</template>

<script>
import HeaderRow from "./HeaderRow.vue";
import Row from "./Row.vue";
import { gridProps } from "./props";

export default {
  props: gridProps(),
  components: {
      "grid-row": Row,
      "grid-header-row": HeaderRow
  },
  computed: {

    cellsData() {
      const grid = this.rows.reduce((rowMemo, row) => {
        return {
          ...rowMemo,
          [row]: columnsReduce.call(this, row)
        };
      }, {});

// #region Helper Functions
      function columnsReduce(row) {
        const filterByPos = filterByRowAndCol.call(this, row);
        return this.columns.reduce(filterByPos, {});
      }

      function filterByRowAndCol(row) {
        return (colMemo, col) => {
          return {
            ...colMemo,
            [col]: getCellData.call(this, row, col)
          };
        };
      }

      function getCellData(row, col) {
        const data = this.gridData.filter(d => this.position(row, col, d));

        if(this.sortCellData) return this.sortCellData(data);
        return data;
      }
// #endregion
      return grid;
    }
  },
  methods: {
    bubbleUp(type, data) {
      this.$emit(type, data);
    },
    isPassed(col) {
      if(!!this.passed[col]) return this.passed[col];

      this.passed[col] = this.$store.getters['calendar/isPassed'](new Date(col));
      return this.passed[col];
    }
  }
};
</script>
