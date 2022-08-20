<template>
    <div class="sidebar-filter">
        <div class="filter-line">Филтрирай по:</div>
        <filter-by-employee />
        <filter-by-confirmed />
        <button @click.prevent="clearAll" v-if="hasEmployees">Изчисти</button>
    </div>
</template>

<script>
export default {
    methods: {
        clearAll() {
            this.$store.commit('calendar/clearFilter');
        }
    },
    computed: {
        hasEmployees() {
            return this.$store.getters['employees/availableEmployees'].length > 0;
        }
    }
}
</script>
