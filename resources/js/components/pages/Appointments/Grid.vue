<template>
    <grid
      draggable
      
      :rows="dayHours"
      :columns="columns"
      :position="filterAppointments"

      :grid-data="appointments"
      :sort-cell-data="sortByDuration"
      :cell-data-style="cellStyle"

      @drop="$emit('drop', $event)"
      @edit="$emit('edit', $event)"
      @select="$emit('select', $event)"
    >
      <template v-slot:cell="data">
        <grid-cell :data="data.data.cellData" />
      </template>
    </grid>
</template>

<script>
import { timeRange, sortByAsc } from "../../../helpers/collection";

export default {
    props: {
        cellMinutes: Number,
        getCellStyle: Function,
        filterAppointments: Function
    },
    computed: {
        appointments() {
            const res = this.$store.getters['calendar/filterByEmployee'];
            return res;
        },
        columns() {
            return this.$store.getters['calendar/days'];
        },
        dayHours() {
            const weekWorktime = this.$store.getters['worktime/weekWorktime'];
            if(weekWorktime.from == weekWorktime.to) return [];

            const range = timeRange(weekWorktime.from, weekWorktime.to, this.cellMinutes);
            return range.slice(0,-1);
        },
        cellStyle() {
            return (appointment, col) => this.$props.getCellStyle(appointment, col);
        }
    },
    methods: {
        sortByDuration(cellData) {
            return cellData.sort(sortByAsc('duration'));
        },
    }
}
</script>