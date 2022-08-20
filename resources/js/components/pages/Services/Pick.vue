<template>
    <div>
        <div v-for="service in services" :key="service.id" class="row">
            <a href="#" class="link col d-flex space-between justify-content-center" @click="$emit('select', service)">
                <span>{{ service.name }}</span>
                <i class="fa fa-th-list"></i>
            </a>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        services: Array
    }
}
</script>