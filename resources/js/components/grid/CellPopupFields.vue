<template>
    <div class="popup-fields">
        <div class="mb-15">
            {{ formated }} <big>{{time}}</big>
        </div>
  
        <customer-autocomplete class="mb-15" />

        <div class='row'>
            <div class="col">
                Услуга:
                <a href="#services?pick">
                    <span>{{ service ? trim(service.name) : 'Избери' }}</span>
                    <i class="fa fa-pencil"></i>
                </a>
            </div>
            <div class="text-right pr-15" v-if="service">
                {{ duration }} мин.
            </div>
        </div>
        <div class='row'>
            <div class="col">
                Служител:
                <a href="#employees?pick">
                    <span>{{ employee ? trim(employee.name) : 'Избери' }}</span>
                    <i class="fa fa-pencil"></i>
                </a>
            </div>
        </div>
        <div class='row'>
            <div class="col">
                Коментар:
                <a href="#" @click.prevent="$emit('editNotes')">
                    <span v-if="notesText">{{ trim(notesText) }}</span>
                    <span v-else>Няма</span>
                    <i class="fa fa-pencil"></i>
                </a>
            </div>
        </div>
        <div class="d-flex space-between">
            <div class="col">
                <a href="#" @click="$emit('cancel')">Откажи</a>
            </div>
            <div class="col text-right">
                <network-button 
                    namespace="dialog.create"
                    @save="$emit('submit')">
                    Запази
                </network-button>
            </div>
        </div>
    </div>
</template>
<script>
import { bgFormat, time } from "../../helpers/date";

export default {
    methods: {
        trim(txt) {
            if(!txt) return '';
            const ellipsis = txt.length > 15 ? '...' : '';
            return txt.slice(0,15) + ellipsis;
        },
        handleDurationChange(val) {
            this.$store.dispatch('dialog/updateAppointment', {
                duration: val
            });
        }
    },
    computed: {
        apt() {
            return this.$store.getters['dialog/appointment'];
        },
        employee() {
            const { employee_id } = this.apt;
            return this.$store.getters['employees/getById'](employee_id);
        },
        service() {
            const { service_id } = this.apt;
            return this.$store.getters['services/getById'](service_id);
        },
        duration() {
            return this.apt.duration;
        },
        notesText() {
            return this.apt.notes;
        },
        time() {
            return time(this.apt.date);
        },
        formated() {
            return bgFormat(this.apt.date);
        }
    }
}
</script>