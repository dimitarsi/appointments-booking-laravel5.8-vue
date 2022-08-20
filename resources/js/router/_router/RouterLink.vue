<template>
    <a :href="toRoute" @click.prevent="navigateToRoute">
        <slot></slot>
    </a>
</template>
<script>
    export default {
        props: {
            to: {
                required: true
            }
        },
        computed: {
            toRoute() {
                return this.$router.url(this.to);
            },
        },
        methods: {
            navigateToRoute(event) {
                this.$router.pushState(null, document.title, this.toRoute);
            }
        }
    }
</script>