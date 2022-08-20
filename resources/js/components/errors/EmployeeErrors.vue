<template>
    <div class="row" v-show="errors.length">
        <div class="col">
            <div v-for="(error, ind) in errors" :key="ind">
                {{ error.fromServer || error.error.message }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['namespace'],
    computed: {
        errors() {
            return this.$store.getters['network/namespaceErrors'](this.namespace);
        }
    }
}
</script>
