<template>
        <div 
            class="text-black"
            v-if="customer"
            :title="title"
        >
            {{ customer.first_name }} {{ customer.last_name }}
        </div>
</template>
<script>

function defaultCustomer() {
    return {
        first_name: '',
        last_name: ''
    }
}
export default {
    props: {
        data: {
            default: () => {}
        }
    },
    computed: {
        customer() {
            if(!this.data.customer) return defaultCustomer();
            return this.data.customer
        },
        title() {
            return `${this.customer.first_name} ${this.customer.last_name}`
        }
    }
}
</script>
