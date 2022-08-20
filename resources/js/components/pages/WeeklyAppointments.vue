<template>
  <div class="vh-100 w-100">
    <appointments-grid
      :filterAppointments="filterAppointments"
      :get-cell-style="getCellStyle2"
      :cell-minutes="cellMinutes"
      @drop="handleCellChange"
      @select="handleCreate"
      @edit="handleEdit"
    />

    <!-- <appointment-create-dialog />
    <appointment-edit-dialog /> -->
  </div>
</template>

<script>
import Vue from "vue";

import "./Appointments";

import { mapState, mapGetters } from "vuex";
import { last } from "lodash";

// import EditDialog from "../common/Popups/Edit.vue";
// import CreateDialog from "../common/Popups/Create";

import { addDays } from "date-fns";
import {
    shortDayOfTheWeek,
    getMinutes,
    daysValue,
    setTime,
    sameDate,
    getTodayMinutes
} from "../../helpers/date";


class Partition {
    constructor() {
        this.items = [];
    }

    isCompatible(item) {
        if(this.items.length == 0) return true;

        let lastItem = this.items[this.items.length - 1];
        const start = getTodayMinutes(item.date);
        const lastItemStart = getTodayMinutes(lastItem.date);

        if(start >= lastItemStart + lastItem.duration) return true;

        return false;
    }

    add(item) {
        this.items.push(item);
    }
}

export function partition(appointments) {
    let partitions = [];

    const sorted = appointments.sort((a1, a2) => {
        return getTodayMinutes(a1.date) > getTodayMinutes(a2.date) ? 1 : -1;
    })
    
    sorted.forEach(item => {
        let compatible = partitions.filter(partition => partition.isCompatible(item));

        if(compatible.length == 0) {
            compatible = new Partition();
            partitions.push(compatible)
        } else {
            compatible = compatible[0];
        }
        
        compatible.add(item);
    });

    return partitions;
}


export default {
    props: ["workday"],
    data() {
        return {
            cellMinutes: 60
        };
    },
    created() {
        this.$store.dispatch("init", { workday: this.workday });
    },
    mounted() {
        if (this.cellMinutes < 15)
        throw "this.cellMinutes shouldn be least 15min, otherwise performance will decrease";
    },
    // components: {
    //     "appointment-create-dialog": CreateDialog,
    //     "appointment-edit-dialog": EditDialog
    // },
    methods: {
        remove(appointment) {
            this.$store.dispatch("calendar/deleteAppointment", { appointment });
        },
        filterAppointments(row, col, appointment) {
            const rowHour = row.split(":").map(s => parseFloat(s.replace(/^0/, "")));

            if (sameDate(appointment.date, col) == false) return false;
            if (appointment.date.getHours() != rowHour[0]) return false;

            return true;
        },
        handleEdit(data) {
            this.$store.commit("dialog/show", {
                name: "edit",
                params: {
                    appointment: data.data
                }
            });
        },
        handleCreate(event) {
            const date = setTime(event.col, event.row);
            const minutes = Math.floor(event.percentY / 25) * 15; // 15 min rounding

            date.setMinutes(minutes, 0, 0);

            this.$store.commit("dialog/show", {
                name: "create",
                params: {
                    date: date
                }
            });
        },
        getCellStyle2(appointment, col, appointments) {
            const start = getTodayMinutes(appointment.date);
            const height = (appointment.duration / this.cellMinutes) * 100;
            const end = start + appointment.duration;
            const minutes = appointment.date.getMinutes();

            const allAppointments = this.$store.getters['calendar/dataByDays'][col];

            const partitioned = partition(allAppointments);
            let partitionIndex = 0;
            let heightIndex = 0;

            partitioned.forEach((partition, index) => {
                if(partition.items.indexOf(appointment) > -1) {
                    heightIndex = partition.items.indexOf(appointment);
                    if(heightIndex > 0) {
                        const prevApp = partition.items[heightIndex - 1];
                        const prev = getTodayMinutes(prevApp.date) + prevApp.duration
                        if(getTodayMinutes(appointment.date) > prev ) heightIndex = 0;
                    }
                    partitionIndex = index;
                }
            });

            let style = {
                width: `${90/partitioned.length}%`,
                height: `calc(${height}%)`,
                top: `calc(${(minutes / 60) * 100}% + ${heightIndex}px)`,
                left: `calc(${partitionIndex * (90/partitioned.length)}% + ${partitionIndex}px)`
            };

            return style;

            let overlapping = allAppointments.reduce((memo, app) => {
                if (app.id === appointment.id) return memo;

                const _start = getTodayMinutes(app.date);
                const _end = _start + app.duration;

                return {
                    overlap: memo.overlap + (start >= _start && start < _end ? 1 : 0),
                    sameStart:
                    memo.sameStart +
                    (start == _start && app.id > appointment.id ? 1 : 0)
                };
            }, { overlap: 0, sameStart: 0 });

            const { overlap, sameStart } = overlapping;
            const _overlap = overlap - sameStart;

            return {
                width: `calc(${Math.max(45, 90 - _overlap * 15)}% + ${_overlap * 3}px)`,
                left: Math.min(45, _overlap * 15) + "%",
                height: `calc( ${height}% - 1px)`,
                top: `${(minutes / 60) * 100}%`,
                zIndex: 100 + _overlap
            };
        },
        getCellStyle(row, col, appointment, index, total) {
            const d = appointment.date.getMinutes();

            let maxWidth = 90;
            if (window.innerWidth > 1900) maxWidth = 95;

            return {
                padding: "5px",
                border: "1px solid #999",
                width:  index + 1 == total ? `${maxWidth / total}%`
                                           : `calc(${maxWidth / total}% - 1px)`,
                left: `${(index * maxWidth) / total}%`,
                height: `calc(${(appointment.duration / this.cellMinutes) * 100}% - 1px)`,
                top: `${(d / 60) * 100}%`
            };
        },
        handleCellChange(event) {
            const appointment = event.data;
            const hour = event.position.row;
            const date = event.position.col;

            const app = this.$store.state["calendar"].appointments.filter(
                a => a.id == appointment.id
            );

            this.$store.commit("dialog/show", {
                name: "edit",
                params: {
                    appointment: app[0],
                    date: setTime(date, hour)
                }
            });
        }
    }
};
</script>

<style>
.cell-data {
  overflow: hidden;
}
</style>
