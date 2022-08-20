<template>
    <component v-if="route.component" :is="route.component" ></component>
    <div v-else>No such route</div>
</template>
<script>
export default {
    data() {
        const customRouter = this.$router.state;
        return {
            customRouter
        }
    },
    computed: {
        route() {
            return this.customRouter.current;//.current.component;
        }
    }
}
</script>