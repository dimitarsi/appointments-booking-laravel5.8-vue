<template>
    <switch-input :active="value" @change="handleChange">
        <template v-slot:off><span class="icon-user icon-32"></span></template>
        <template v-slot:on><span class="icon-anonymouse icon-32"></span></template>
    </switch-input>
</template>
<script>
    export default {
        props: ['value'],
        methods: {
            handleChange(val) {
                this.$emit('change', val)
            }
        }
    }
</script>