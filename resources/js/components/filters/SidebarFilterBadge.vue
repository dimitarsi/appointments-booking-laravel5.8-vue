<template>
    <span class="filter-badge" v-if="showFilterBadge">!</span>
</template>


<script>
export default {
    computed: {
        showFilterBadge() {
            return this.$store.getters['calendar/hasFilter'];
        }
    }
}
</script>
