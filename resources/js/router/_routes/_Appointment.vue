<template>
    <div>
        <h1>Записване на час</h1>
        <div class="row" v-if="isStep(1)">
            <div class="col">
                <text-input v-model.lazy.trim="customer.phone" :validate="isPhoneNumber" />
            </div>
            <div class="col">
                <button class="btn" @click="saveCustomer">Save</button>
            </div>
        </div>
        <div class="row" v-if="isStep(2)">
            <div class="col">
                <date-input v-model.lazy="appointment.date" />
            </div>
            <div class="col">
                <button class="btn" @click="saveAppointment">Save</button>
            </div>
        </div>
        <div class="row" v-if="isStep(3)">
            <div class="col">
                Thank you! You will receive notification prior to your subscription.
            </div>
        </div>
    </div>
</template>
<script>
import Customer from "../models/Customer";
import Appointment from "../models/Appointment";
import { last } from "lodash";

export default {
    data() {
        const appointment = new Appointment();
        const customer = new Customer();
        customer.registered_by = appointment.service_provider_id = _.last(location.href.split('/'));

        return {
            customer: customer,
            appointment: appointment,
            state: {
                step: 1
            }
        }
    },
    methods: {
        isStep(step){
            return step === this.state.step;
        },
        saveCustomer() {
            this.customer.save();
            this.state.step = 2;
        },
        saveAppointment() {
            // const serviceProviderId = this.state.serviceProviderId;
            // const customerId = this.customer.id;
            //Appointment.save(serviceProviderId, customerId);
            // const appointment = new Appointment();
            this.appointment.customer_id = this.customer.id;
            this.appointment.save();

            this.state.step = 3;
        },
        isPhoneNumber(value) {
            if(value.length > 0 && value.indexOf(0) !== 0) {
                return "Input should start with 0";
            }
        }
    }
}
</script>
