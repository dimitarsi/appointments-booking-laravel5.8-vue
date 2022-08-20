<template>
    <div class="d-flex">
        <div class="bordered service-cell">
            <div class="w-100 d-flex justify-content-center pt-3">
                {{ row }}
            </div>
        </div>
        <grid-column 
            v-for="(col, c) in columns"
            :cellsData="cellsData[col] || []"
            :draggable="draggable"
            :row="row"
            :column="col"
            :key="c"
            :index="c"
            :cellDataStyle="cellDataStyleForCurrentColumn"
            @drop="bubbleUp('drop', $event)"
            @select="bubbleUp('select', $event)"
            @edit="bubbleUp('edit', $event)"
        >
            <template v-slot:cell="data">
                <slot name="cell" :data="data"></slot>
            </template>
        </grid-column>
    </div>
</template>
<script>
import Column from "./Column";
import { rowProps } from "./props";

export default {
    props: rowProps(),
    components: {
        'grid-column': Column
    },

    methods: {
        bubbleUp(type, data) {
            this.$emit(type, data);
        },
        cellDataStyleForCurrentColumn(row, col, cellData, di, total) {
            return this.cellDataStyle(cellData, col);
        }
    }
}
</script>
