<template>
    <div class="px-15">
        <div class="subpage-title">
            <a href="#" class="back-link" @click.prevent="handleBack">
                <i class="fa fa-angle-left"></i>
                Работно време
            </a>
        </div>
        <div v-for="day in weekDays" :key="day" class="hr mb-5">
            <div class="d-flex space-between">
                <div class="fz-14">
                    <input type="checkbox" :checked="workTimeByDays(day).length > 0" @change="handleWorkdayChange($event, day)" />
                    {{ dayOfTheWeek(day) }}
                </div>
                <div class="d-flex fz-16 align-items-center">
                    <a href="#" @click.prevent="addWorktime(day)">
                        <i class="fa fa-plus"></i>
                    </a>
                </div>
            </div>
            <template v-for="(wt, index) in workTimeByDays(day)">
                <div class="py-5" :key="`${index}-sep`"></div>
                <div class="d-flex worktime-hours" :key="index">
                    <div class="text-input">
                        <input class="form-control w-100" :value="wt.from" @change="updateFrom($event, wt)" />
                    </div>
                    <div class="text-input ">
                        <input class="form-control w-100" :value="wt.to" @change="updateTo($event, wt)" />
                    </div>
                <div class="col d-flex align-items-center fz-16 justify-content-right">
                        <a href="#" @click.prevent="removeWorktime(wt.id)">
                            <i class="fa fa-trash" @click="removeWorktime(wt.id)"></i>
                        </a>
                    </div>
                </div>
            </template>
        </div>
        <network-button @save="save" namespace="worktime.update">Запази</network-button>
    </div>
</template>

<script>
import { mapGetters } from "axios";
import { dayOfTheWeek } from "../../helpers/date";

export default {
    data() {
        return {
            workDayTypes: [
                {
                    text: 'Работен',
                    val: 1
                },
                {
                    text: 'Почивен',
                    val: 0
                }
            ]
        };
    },
    created() {
        const isLoaded = Object.keys(this.$store.getters['worktime/dayWorktime']).length > 0;
        if(!isLoaded) {
            this.$store.dispatch('worktime/load');
        }
    },
    computed: {
        weekDays() {
            return this.$store.state['worktime'].days;
        },
        workTimeByDays() {
            return this.$store.getters['worktime/dayWorktime'];
        },
    },
    methods: {
        dayOfTheWeek,
        addWorktime(day) {
            this.$store.commit('worktime/addWorktime', { day });
        },
        save() {
            this.$store.dispatch('worktime/save');
        },
        update(value, worktime, field) {
            const change = {
                ...worktime,
                [field]: value
            };
            this.$store.commit('worktime/update', { original: worktime, change });
        },
        updateFrom(event, worktime) {
            this.update(event.target.value, worktime, 'from');
        },
        updateTo(event, worktime) {
            this.update(event.target.value, worktime, 'to');
        },
        removeWorktime(id) {
            this.$store.commit('worktime/remove', { id });
        },
        handleWorkdayChange(event, day) {
            if(event.target.checked) {
                this.$store.commit('worktime/addWorktime', { day });
            } else {
                this.$store.commit('worktime/removeAllWorktime', { day });
            }
        },
        handleBack() {
            window.history.go(-1);
        }
    }
}
</script>

<style>
    .worktime-hours .text-input {
        width: 75px;
        margin-right: 10px;
    }
</style>