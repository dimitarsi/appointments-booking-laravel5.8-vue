<template>
  <div class="d-flex-co h-100">
    <div class="p-5">
      <form @submit.prevent="$emit('save', customer)">

        <employee-errors namespace="customers.create" />
        <employee-errors namespace="customers.update" />

        <div class="hr customer-info">
            <text-input v-model="customer.first_name" class="mb-5">
                <template v-slot:label><span>Име:</span></template>
            </text-input>
            <text-input v-model="customer.last_name" class="mb-5">
                <template v-slot:label><span>Фамилия:</span></template>
            </text-input>
            <text-input v-model="customer.phone" class="mb-5">
                <template v-slot:label><span>Телефон:</span></template>
            </text-input>
            <text-input v-model="customer.email">
                <template v-slot:label><span>Емайл:</span></template>
            </text-input> 
        </div>

        <div class="d-flex space-between">
            <a href="#" @click.prevent="$emit('cancel')">Виж всички</a>

            <network-button
                :namespace="namespace"
            >
                {{ action }}
            </network-button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Customer from "../../models/Customer";

export default {
    props: {
        customer: Customer
    },
    data() {
        return {
            state: {
                customer: this.customer
            }
        };
    },
    computed: {
        namespace() {
            return this.customer.id ? 'update' : 'create'
        },
        action() {
            return this.customer.id ? 'Редактирай' : 'Създай'
        }
    }
};
</script>


<style>
    .customer-info .label-text {
        width: 60px;
        flex-shrink: 0;
        align-self: center;
    }
    .customer-info {
        font-size:  11px;
    }
</style>