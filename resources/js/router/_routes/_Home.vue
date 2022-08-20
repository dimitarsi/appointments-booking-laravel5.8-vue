<template>
    <div>
        <h1>Избери услуга</h1>
        <div class="row" v-for="sp in state.serviceProviders" :key="sp.id">
            <div class="col">
                <router-link :to="`/dashboard/${sp.id}`">Основен панел</router-link>
                <router-link :to="`/appointments/${sp.id}`">Запази час при {{ sp.name }}</router-link>
                <router-link :to="`/appointments/${sp.id}/list`">Покажи записаните часове за {{ sp.name }}</router-link>
            </div>
        </div>
    </div>
</template>
<script>
import ServiceProvider from "../models/ServiceProvider";

export default {
    async mounted() {
        const { data } = await ServiceProvider.getAll();
        this.state = {
            serviceProviders: data
        }
    },
    data() {
        return {
            state: {
                serviceProviders: []
            }
        }
    },
    methods: {
        isStep(step){
            return step === this.state.step;
        },
        async save() {
            await this.customer.save();
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
