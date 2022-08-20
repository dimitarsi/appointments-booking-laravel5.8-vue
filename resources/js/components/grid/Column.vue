<template>
    <div 
        class='cell w-100 bordered'
        :class='{"is-passed": isPassed, selected: showPopup}'
        ref='cell'
        @drop.prevent='onCellDataDrop($event, {row, col})'
        @dragover.prevent
        @click.stop='handleClick'
    >
        <transition-group name='grid-cell'>
            <div v-for='(d, di) in cellsData'
                class='cell-data'
                :class='{confirmed: d.confirmed}'
                :key='d.id'
                :draggable='draggable'
                :style='cellDataStyle(row, col, d, di, cellsData.length)'
                @dragstart='onDataDragStart($event, d)'
                @click.stop='handleEdit(d, row, col)'
            >
                <slot name='cell'
                    :cell-data='d'
                    :cell-row='row'
                    :cell-col='col'>
                </slot>
            </div>
        </transition-group>
        <transition name='cell-popup'>
            <cell-popup
                v-if='showPopup'
                :date='date'
                :index='index'
            />
        </transition>
    </div>
</template>
<script>

import CellPopup from './CellPopup.vue';
import { setTime } from '../../helpers/date';
import Appointment from '../models/Appointment';


export default {
    props: {
        row: { default: '' },
        column: { default: '' },
        cellsData: { default: () => [] },
        draggable: { default: false },
        index: { default: 0 },
        cellDataStyle: {
            required: true,
            type: Function
        }
    },
    components: {
        'cell-popup': CellPopup
    },
    data() {
        return {
            date: null
        }
    },
    computed: {
        col(){ return this.column; },
        isPassed() { return this.$store.getters['calendar/passed'][this.column]; },
        showPopup() {
            return this.$store.getters['dialog/popup'](this.row, this.col);
        }
    },
    methods: {
        partitioned(col) {
            const today = this.$store.getters['calendar/dataByDays'][col];
        },
        setHover() {

        },
        unsetHover() {

        },
        handleClick(event) {
            const cell = this.$refs['cell'];
            const bbox = cell.getBoundingClientRect();
            
            const offsetX = event.pageX - bbox.x;
            const offsetY = event.pageY - bbox.y;
            const percentY = ( offsetY/bbox.height * 100 )
            const percentX = ( offsetX/bbox.width * 100 );

            const t = setTime(this.col, this.row);
            t.setMinutes(Math.floor(percentY / 25) * 15, 0, 0);
            const apt = new Appointment();
            apt.date = t;
            apt.customer_id = 1;

            this.$store.dispatch('dialog/dialog', {
                row: this.row,
                col: this.col,
                appointment: apt
            });
        },
        handleEdit(d, row, col) {
            this.$store.dispatch('dialog/dialog', {
                row: this.row,
                col: this.col,
                appointment: d
            });
        },
        onDataDragStart(event, d) {
            event.dataTransfer.setData('text', JSON.stringify(d));
        },
        onCellDataDrop(event, position) {
            const data = event.dataTransfer.getData('text');
            this.$emit('drop', {data: JSON.parse(data), position});
        },
    }
}
</script>
