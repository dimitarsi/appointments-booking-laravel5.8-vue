<template>
    <div class='input-switch' @click.prevent="handleSwitch">
        <slot name="on" v-if="active"></slot>
        <slot name="off" v-else></slot>
    </div>
</template>
<script>
    export default {
        model: {
            prop: 'active',
            event: 'change'
        },
        props: ['active'],
        methods: {
            handleSwitch(event) {
                this.$emit('change', !this.active);
            }
        }
    }
</script>