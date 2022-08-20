<template>
<a href='#reload' @click.prevent="reload">
    <i class="fa fa-refresh"></i>
</a>
</template>
<script>
export default {
    methods: {
        reload() {
            this.$store.dispatch('calendar/loadAppointments');
        }
    }
}
</script>