<template>
    <popup 
        :show="show"
        title="Запазване на час"
        namespace="appointments.create"
        @hide="handleHide"
        @submit=handleSubmit
    >   
        <template v-slot:fields>
            <div class="hr d-flex flex-cols">
                <!-- <toggle-anonymouse :value="state.customer.anonymous" @change="handleAnonymouseChange" title="Анонимен потребител" />
                <text-input class="mr-15" :disabled="state.customer.anonymous" v-model="state.customer.first_name">
                    <template v-slot:label>Име:</template>
                </text-input>
                <text-input class="mr-15" :disabled="state.customer.anonymous" v-model="state.customer.last_name">
                    <template v-slot:label>Фамилия:</template>
                </text-input>
                <text-input class="mr-15" :disabled="state.customer.anonymous" v-model="state.customer.phone">
                    <template v-slot:prefix><i class="fa fa-phone"></i></template>
                </text-input>
                <text-input :disabled="state.customer.anonymous" v-model="state.customer.email">
                    <template v-slot:prefix><i class="fa fa-envelope-o"></i></template>
                </text-input> -->
                <customer-autocomplete />
            </div>
            <div class="hr d-flex flex-cols">
                <input-select
                    :value="state.employee"
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
                    :value="state.service"
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
                                <text-input v-model="state.duration" :disabled="durationType == 0">
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
            <label><input type="checkbox" v-model="state.sendEmail"> Изпращане на емайл</label>
        </template>
    </popup>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import computed from "./computed";
import Popup from "./Popup.vue";

const defaultState = () => ({
    customer: { phone: '', first_name: '', last_name: '', anonymous: 1, email: '' },
    suggestions: [], // TODO: Move to suggestions popup
    employee: '',
    service: '',
    same_duration: true,
    duration: 0,
    sendEmail: true
});

export default {
    components: {
        'popup': Popup
    },
    data() {
        return {
            state: defaultState(),
            durationType: 0,
            durationValues: [
                {text: 'Стандартна', value: 0 },
                {text: 'Индивидиална', value: 1}
            ]
        }
    },
    computed: Object.assign({},
        mapState('dialog', computed['create']),
        mapGetters('services', { services: 'suggestion' }),
        mapGetters('employee', { employees: 'suggestion' }), 
        {
            workTime() {
                return this.$store.getters['worktime/weekWorktime']
            },
            service() {
                return this.$store.getters['services/getById'](this.state.service);
            },
            time() {
                const date = this.$store.state['dialog'].create.params.date;
                return `${hour(this.date)}:${minutes(this.date)}`;
            }
        }
    ),
    methods: {
        handleHide() {
            this.state = defaultState();
            this.$store.commit('dialog/hide');
        },
        handleCustomerChange(customer) {
            this.state.customer = customer;
        },
        async handleSubmit() {
            const duration = this.durationType === 0 ? this.service.duration : this.state.duration;
            
            this.$store.dispatch('dialog/create', {
                customer: this.state.customer,
                employee: this.state.employee,
                service: this.state.service,
                duration,
                sendEmail: this.state.sendEmail
            });
        },
        handleServiceChange(val) {
            this.state.service = val;

            // if(this.durationType == 0) {
            //     this.state.duration = 0;// this.service.duration;
            // }
        },
        handleDurationTypeChange(val) {
            // if(val == 0 && this.state.service) {
            //     this.state.duration = 0;
            // }
            this.durationType = val;
        },
        handleDateChange(event) {
            this.$store.commit('dialog/show', { 
                name: 'create',
                params: {
                    ...this.params,
                    date: event
                } 
            });
        },
        handleEmployeeChange(val) {
            this.state.employee = val;
        },
        handleAnonymouseChange(val) {
            this.state.customer.anonymous = val;
        }
    }
}
</script>