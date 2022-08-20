<template>
    <div>
        <input-select :value="confirmed" @input="handleFilterChange" :suggestions="suggestions" :nowrap="false" class="sidebar-select">
            <template v-slot:label>Потвърдени</template>
        </input-select>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
    data() {
        return {
            suggestions: [
                { value: 'all', text: 'Всички' },
                { value: 0, text: 'Непотвърдени'},
                { value: 1, text: 'Потвърдени'}
            ]
        }
    },
    computed: {
        ...mapState('calendar', {
            confirmed: state => state.filter.confirmed
        }),
    },
    methods: {
        handleFilterChange(confirmed) {
            this.$store.commit('calendar/setFilter', {
                confirmed
            });
        }
    }
}
</script>
