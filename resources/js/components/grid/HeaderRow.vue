<template>
    <div class="d-flex header-row">
        <div class="bordered service-cell grid-th">
            <div class="void-toolbar d-flex">
                <a href="#" class="hallow" @click.prevent="prevWeek">
                    <i class="fa fa-angle-left"></i>
                </a>
                <a href="#" class="hallow" @click.prevent="currentWeek">
                    <i class="fa fa-calendar"></i>
                </a>
                <a href="#" class="hallow" @click.prevent="nextWeek">
                    <i class="fa fa-angle-right"></i>
                </a>
            </div>
        </div>
        <div v-for="(col, c) in formatedColumns" :key="c" class="bordered w-100 grid-th">
            <div class="w-100 d-flex-col h-100 justify-content-center align-items-center">
                {{ col }}
            </div>
        </div>
    </div>
</template>

<script>

import { dayOfTheWeek, dateFormat } from "../../helpers/date";
import padStart from "lodash/padStart";

export default {
    props: {
        columns: {
            default: () => []
        }
    },
    computed: {
        formatedColumns() {
            return this.columns.map(c => `${dayOfTheWeek(c.getDay())} - ${dateFormat(c)}`);
        }
    },
    methods: {
        currentWeek() {
            this.$store.dispatch('calendar/currentWeek');
        },
        nextWeek() {
            this.$store.dispatch('calendar/nextWeek');
        },
        prevWeek() {
            this.$store.dispatch('calendar/prevWeek');
        },
        selectEmployee(event) {
            this.$store.commit('employees/select', event.target.value);
        }
    }
}
</script>
