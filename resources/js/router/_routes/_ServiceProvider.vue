<template>
    <div v-if="!success">
        <div class="row">
            <h1>Регистрация на търговец</h1>
        </div>
        <div class="row">
            <div class="col">
                Име: <br>
                <text-input v-model="sp.name" />
            </div>
            <div class="col">
                Тел: <br>
                <text-input v-model="sp.phone" />
            </div>
            <div class="col">
                Емайл: <br>
                <text-input v-model="sp.email" />
            </div>
        </div>
        <div class="row">
            <div class="col">
                Тип: <br>
                <select v-model="sp.type">
                    <option v-for="type in serviceTypes" :key="type.value" :value="type.value">{{ type.text }}</option>
                </select>
            </div>
            <div class="col">
                Собствен домайн: <br>
                <text-input v-model="sp.own_domain" />
            </div>
        </div>
        <div class="row">
            <div class="col">
                <button @click="save">Save</button>
            </div>
        </div>
    </div>
    <div v-else>Благодарим, че се записахте.</div>
</template>
<script>
import ServiceProvider from "../models/ServiceProvider";

export default {
    data() {
        return {
            success: false,
            sp: new ServiceProvider(),
            serviceTypes: [
                { value: 1, text: 'Лечебно заведение' },
                { value: 2, text: 'Салон за красота' },
                { value: 3, text: 'Сервиз' },
                { value: 4, text: 'Правни съвети' },
                { value: 5, text: 'Работни срещи и планировки' }
            ]
        }
    },
    methods: {
        async save() {
            await this.sp.save();
            this.success = true;
            // alert('Ще ви изпратим писмо с код за вграждане!');
        }
    }
}
</script>