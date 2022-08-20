<template>
    <div>
        <div v-for="customer in customers" :key="customer.id" class="row">  
            <a href="#" @click.prevent="$emit('select', customer)" class="link space-between col d-flex">
                <span>
                    {{ customer.name }}
                </span>
                <i class="fa fa-pencil"></i>
            </a>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        customers: Array
    }
}
</script>