<template>
    <div class="popup-notes">
        <div class="row">
            <div class="col">
                Добави коментар:
            </div>
        </div>
        <div class="row">
            <div class="col">
                <big-text v-model="state.value"></big-text>
            </div>
        </div>
        <div class="d-flex">
            <div class="col">
                <a href="#" @click.prevent="$emit('cancel')">Откажи</a>
            </div>
            <div class="col text-right">
                <a href="#" @click.prevent="handleChange" class="btn">Запази</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        const apt = this.$store.getters['dialog/appointment'];
        return {
            state: {
                value: apt.notes
            }
        }
    },
    methods: {
        handleChange() {
            this.$store.commit('dialog/updateAppointment', { notes: this.state.value });
            this.$emit('cancel');
        }
    }
}
</script>