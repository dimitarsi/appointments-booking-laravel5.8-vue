<template>
    <div v-if="employees.length">
        <input-select :value="employeeId" @input="handleFilterChange" :suggestions="employees" :nowrap="false" class="sidebar-select">
            <template v-slot:label>Служител</template>
        </input-select>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
    computed: {
        ...mapState('calendar', {
            employeeId: state => state.filter.employeeId
        }),
        employees() {
            const all  =  { value: '', text: 'Всички' };
            const employees = this.$store.getters['employees/suggestionWithAppointmentsCount'];

            return [all, ...employees];
        },
    },
    methods: {
        handleFilterChange(employeeId) {
            this.$store.commit('calendar/setFilter', {
                employeeId
            })
        }
    }
}
</script>
