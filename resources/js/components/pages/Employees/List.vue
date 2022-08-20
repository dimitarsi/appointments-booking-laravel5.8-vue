<template>
    <div>
        <div class="row" v-for="employee in employees" :key="employee.id">
            <a href="#" @click.prevent="$emit('select', employee)" class="link d-flex space-between col">
                <span>{{ employee.name }}</span>
                <i class="fa fa-pencil"></i>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        employees: Array
    }
}
</script>