<template>
    <div class="row">
        <div class="col">
            <div v-for="item in state.appointments" :key="item.id">
                <div>Appointment id: {{ item.id }}</div>
                <div>Customer: {{ item.customer.contacts[0].phone }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { last } from '../../helpers/collection';

export default {
    async mounted() {
        const serviceProviderId = last(location.href.split('/'), 1);
        const items = await axios.get(`/serviceproviders/${serviceProviderId}/list`);
        this.state.appointments = items.data;
    },

    data() {
        return {
            state: {
                appointments: []
            }
        }
    }
}
</script>
