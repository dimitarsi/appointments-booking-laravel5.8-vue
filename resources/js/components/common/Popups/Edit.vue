<template>
    <popup 
        :show="show"
        :title="`Промяна${anonymous? ' - Анонимен': ''}`"
        namespace="appointments.update"
        @hide="handleHide"
        @submit=handleSubmit
        @if="appointment"
    >
        <template v-slot:fields>
            <div class="hr d-flex flex-cols" v-if="!anonymous">
                <span class="mr-5">
                    {{ customer.first_name }} {{ customer.last_name[0] }}.
                </span>
                <span class="mr-5">
                    <i class="fa fa-phone"></i>
                    {{ phone }}
                </span>
                <span>
                    <i class="fa fa-envelope-o"></i>
                    {{ email }}
                </span>
            </div>
            <div class="hr d-flex flex-cols">
                <input-select
                    :value="employee"
                    :suggestions="employees"
                    :allow-input="false"
                    @change="handleEmployeeChange"
                >
                    <template v-slot:label>
                        <span class="mr-15">Служител:</span>
                    </template>
                </input-select>
                <date-input
                    :value="date"
                    @input="handleDateChange"
                    :from="workTime.from"
                    :to="workTime.to"
                    show-time 
                    class="justify-content-right"
                />
            </div>
            <div class="hr d-flex flex-cols">
                <input-select
                    :value="service_id"
                    :suggestions="services"
                    :allow-input="false"
                    @change="handleServiceChange"
                >
                    <template v-slot:label>
                        <span class="mr-15">Услуга:</span>
                    </template>
                </input-select>
                <div>
                    <div class="px-15">Продължителност:</div>
                    <div class="d-flex flex-cols">
                        <radio-select
                            :value="durationType"
                            :suggestions="durationValues"
                            @change="handleDurationTypeChange"
                        />
                        <div>
                            <div class="align-to-options" :class="{'text-muted': durationType == 1 }">{{ service ? service.duration : '--' }}</div>
                            <div>
                                <text-input :value="duration" @change="handleDurationChange" :disabled="durationType == 0">
                                    <template v-slot:sufix>мин.</template>
                                </text-input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hr">
                <big-text max="400" class="w-100"></big-text>
            </div>
        </template>
        <template v-slot:buttons>
            <network-button
                namespace="appointments/delete"
                :prevent="true"
                @save="handleDelete">
                Изтрии
            </network-button>
        </template>
    </popup>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import computed from "./computed";
import Popup from "./Popup.vue";

// Prevent throwing error when appointment is null
const emptyAppointment = {
    customer: {
        id: '',
        contacts: [],
        first_name: '',
        last_name: ''
    },
    scheduled_employees: []
};

const defaultState = () => ({
    employees: null,
    service: null,
    duration: null
});

export default {
    components: {
        'popup': Popup
    },
    data() {
        return {
            state: defaultState(),
            durationValues: [
                {text: 'Стандартна', value: 0 },
                {text: 'Индивидиална', value: 1}
            ]
        }
    },
    computed: Object.assign({},
        mapState('dialog', computed['edit']),
        mapGetters('services', { services: 'suggestion' }),
        mapGetters('employee', { employees: 'suggestion' }), 
        {
            params() {
                return this.$store.getters['dialog/params']('edit');
            },
            appointment() { 
                return (!!this.params && !!this.params.appointment) ? this.params.appointment : emptyAppointment;
            },
            durationType() {
                return this.params.durationType;
            },
            workTime() {
                return this.$store.getters['worktime/weekWorktime']
            },
            employee() {
                if(!this.appointment) return -1;

                const employees = this.state.employees || this.appointment.scheduled_employees.map(e => e.id);
                return employees[0];
            },
            service() {
                return this.$store.getters['services/getById'](this.service_id);
            },
            service_id() {
                const service = this.state.service || this.appointment.service_id;// this.$store.getters['services/getById'](this.appointment.service_id);
                return service;
            },
            time() {
                const date = this.$store.state['dialog'].create.params.date;
                return `${hour(this.date)}:${minutes(this.date)}`;
            },
            date() {
                return this.params.date || this.appointment.date;
            },
            customer() {
                return this.appointment.customer;
            },
            contacts() {
                return this.customer.contacts
            },
            anonymous() {
                return this.customer.id === 1;
            },
            email() {
                const email = this.contacts.filter(c => c.type === 'email')
                if(email.length) return email[0].val;

                return 'N/A';
            },
            phone() {
                const phone = this.contacts.filter(c => c.type === 'phone')
                if(phone.length) return phone[0].val;

                return 'N/A'
            },
            duration() {
                if(this.state.duration === null) return this.appointment.duration;
                return this.state.duration;
            }
        },
        
    ),
    methods: {
        handleHide() {
            this.state = defaultState();
            this.$store.commit('dialog/hide');
        },
        async handleSubmit() {
            const duration = this.durationType === 0 ? this.service.duration : this.duration;
            const service = this.state.service_id;

            let data = { service, duration };
            if(this.state.employees) {
                data = Object.assign(data, { employees: this.state.employees });
            }
                       
            this.$store.dispatch('dialog/editSave', data);
        },
        handleServiceChange(val) {
            this.state.service = val;
            this.serviceChanged = true;
        },
        handleDurationChange(val) {
            this.state.duration = val;
        },
        handleDurationTypeChange(val) {
            this.$store.commit('dialog/show', { 
                name: 'edit',
                params: {
                    ...this.params,
                    durationType: val
                } 
            });
        },
        handleDateChange(event) {
            this.$store.commit('dialog/show', { 
                name: 'edit',
                params: {
                    ...this.params,
                    date: event
                } 
            });
        },
        handleEmployeeChange(val) {
            this.state.employees = [ val ];
        },
        handleDelete() {
            this.$store.dispatch('dialog/delete', this.appointment);
        }
    }
}
</script>