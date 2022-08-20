<template>
    <div>
        <div class="row">
                <div class="col">
                    <a href="#" @click.prevent="prevWeek">Предишна</a>
                </div>
                <div class="col">
                    <div class="row">
                        <h3>Запазени часове ({{ `${week.start.getMonth() + 1}.${week.start.getDate()}` }} - {{ `${week.end.getMonth() + 1}.${week.end.getDate()}` }})</h3>
                    </div>
                    <div class="row">
                        <date-input @input="setWeek" :value="week.start" />
                    </div>
                </div>
                <div class="col">
                    <a href="#" @click.prevent="nextWeek">Следваща</a>
                </div>
        </div>
        <div class="row">
            <div class="col day-column" v-for="(day, index) in week.days()" :key="index">
                <div class="row">
                    <div class="col">
                        <h3>{{ daysOfTheWeek[index] }} - {{ day.getDate() }}.{{ day.getMonth() + 1 }}</h3>
                    </div>
                </div>
                <appointments>
                    <appointment
                        v-for="(appointment, i) in filter(state.appointments, day)"
                        :key="i"
                        :appointment="appointment"
                    >
                    </appointment>
                </appointments>
            </div>
        </div>
    </div>
</template>

<script>
import Timeline from "../common/Timeline.vue";
import { week, sqlFormat, dayOfTheWeek, sameDate } from "../../helpers/date";
import { last } from "lodash";
import Appointment from '../common/Appointment';
import { fromResponse } from '../models/Appointment';
import AppointmentsByWeek from "./AppointmentsByWeek.vue";

export default {
    async mounted() {
        const spId = last(location.href.split('/'));
        const response = await axios.post(`/serviceproviders/${spId}/appointments`, {
            from: sqlFormat(this.week.start),
            to: sqlFormat(this.week.end)
        });

        this.state.appointments = fromResponse(response);
    },
    data() {
        const spId = last(location.href.split('/'));
        return {
            state: {
                appointments: []
            },
            spId: spId,
            week: week(),
            daysOfTheWeek: {
                0: "Неделя",
                1: "Понеделник",
                2: "Вторник",
                3: "Сряда",
                4: "Четвръртък",
                5: "Петък",
                6: "Събота",
            }
        }
    },
    components: {
        'timeline': Timeline,
        'appointment': Appointment,
        'appointments': AppointmentsByWeek
    },
    methods: {
        filter: (appointments, day) => {
            return appointments.filter(a => {
                const aDate = new Date(a.date);
                return sameDate(aDate, day);
            })
        },
        async prevWeek() {
            this.week = this.week.previousWeek();
            await this.loadAppointments();
        },
        async nextWeek() {
            this.week = this.week.nextWeek();
            await this.loadAppointments();
        },
        async setWeek(date) {
            this.week = week(date);
            await this.loadAppointments();
        },
        async loadAppointments() {
            const response = await axios.post(`/serviceproviders/${this.spId}/appointments`, {
                from: sqlFormat(this.week.start),
                to: sqlFormat(this.week.end)
            });

            this.state.appointments = response.data;
        }
    }
}
</script>

<style>
.day-column {
    height: 500px;
    margin-right: 15px;
}
.appointments {
    padding-left: 50px;
    position: relative;
}
</style>
