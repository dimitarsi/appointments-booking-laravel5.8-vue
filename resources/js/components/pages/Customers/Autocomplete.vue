<template>
    <div class="d-flex space-between">
        <div class="col">
            Клиент:
            <a href="#customers?pick">
                <template v-if="!customer">
                    Анонимен
                    <i class="fa fa-pencil"></i>
                </template>
                <template v-else>
                    {{ customer.name }}    
                </template>
            </a>
            
            <a href="#" @click.prevent="handleRemove">
                <i v-if="!!customer" class="fa fa-close"></i>
            </a>
        </div>
        <div class="text-right">
            <a href="#customers?pick&new">Създай нов</a>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        customer() {
            return this.$store.getters['dialog/customer'];
        }
    },
    methods: {
        handleRemove() {
            const anynumous = this.$store.getters['customers/anonymous'];
            this.$store.commit('dialog/updateAppointment', {
                customer_id: null
            });
        }
    }
}
</script>