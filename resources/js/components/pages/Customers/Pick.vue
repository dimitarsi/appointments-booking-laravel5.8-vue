<template>
    <div>
        <text-input v-model="filter" placeholder="Име, телефон, емайл" class="w-100 mb-15" />
        <div v-for="customer in filtered" :key="customer.id" class="row">  
            <a href="#" @click="$emit('select', customer)" class="link space-between col d-flex">
                <span>
                    {{ customer.name }}
                </span>
                <i class="fa fa-th-list"></i>
            </a>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        customers: Array
    },
    data() {
        return {
            filter: ''
        }
    },
    computed: {
        filtered() {
            return this.$store.getters['customers/filter'](this.filter);
        }
    },
    methods: {

    }
}
</script>