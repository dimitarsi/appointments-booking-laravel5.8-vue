<template>
<div class="d-flex-co h-100">
    <div class="p-5">
        <form @submit="$emit('update', state.service)">
            <div class="hr services-info">
                <text-input v-model="state.service.name" class="mb-5">
                    <template v-slot:label><span>Име</span></template>
                </text-input>
                <text-input v-model="state.service.price" class="mb-5">
                    <template v-slot:label><span>Цена</span></template>
                </text-input>
                <text-input v-model="state.service.duration">
                    <template v-slot:label><span class="nowrap">Време ( мин. )</span></template>
                </text-input>
            </div>

            <div class="hr services-info">
                <div class="fz-16">Статус</div>
                <input-select 
                    v-model="state.service.status" 
                    class="tx--5 zi-1"
                    :suggestions="['available', 'unavailable', 'display-only', 'soon']"
                />
            </div>

            <div class="d-flex space-between">
                <a href="#" @click.prevent="cancel">Откажи</a>
                <network-button :namespace="namespace">{{ label }}</network-button>
            </div>
        </form>
    </div>
</div>
</template>
<script>
import Service from "../../models/Service";

export default {
    props: {
        service: {
            type: Service
        }
    },
    data() {
        return {
            state: {
                service: this.service
            }
        }
    },
    computed: {
        namespace() {
            return !this.state.service.id ? 'services.create' : 'services.update';
        },
        label() {
            return !this.state.service.id ? 'Създай' : 'Запази';
        },
    },
    methods: {
        cancel() {
            this.$emit('cancel');
        },
        handleDelete() {
            this.$emit('delete', this.state.service);
        }
    }
}
</script>

<style>
    .services-info .label-text {
        width: 75px;
        flex-shrink: 0;
        align-self: center;
    }
    .services-info {
        font-size:  11px;
    }
</style>