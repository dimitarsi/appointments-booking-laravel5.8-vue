<template>
    <div>
        <div class="row" v-for="employee in employees" :key="employee.id">
            <a href="#" @click="$emit('select', employee)" class="link d-flex space-between col">
                <span>
                    {{ employee.first_name }} {{ employee.last_name }}
                </span>
                <i class="fa fa-th-list"></i>
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