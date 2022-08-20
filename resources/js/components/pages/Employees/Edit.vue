<template>
<div class="d-flex-co h-100">
    <div class="p-5">
        <form @submit.prevent="$emit('save', {employee, services: state.services })">
            <employee-errors namespace="employees.create" />
            <employee-errors namespace="employees.update" />

            <div class="hr employee-info">
                <text-input v-model="employee.first_name" class="mb-5">
                    <template v-slot:label><span>Име:</span></template>
                </text-input>
                <text-input v-model="employee.last_name"  class="mb-5">
                    <template v-slot:label><span>Фамилия:</span></template>
                </text-input>
                <text-input v-model="employee.phone"  class="mb-5">
                    <template v-slot:label><span>Телефон:</span></template>
                </text-input>
                <text-input v-model="employee.email" class="mb-5">
                    <template v-slot:label>Емайл:</template>
                </text-input>
                <text-input v-model="employee.position">
                    <template v-slot:label><span>Длъжност:</span></template>
                </text-input>
            </div>

            <div class="hr employee-permissions">
                <label class="d-block mb-5">
                    <input type="checkbox" v-model="employee.visible" /> Покажи в графика
                </label>
                <label class="d-block mb-5">
                    <input type="checkbox" v-model="employee.allow_login" />
                    Вход в системата
                </label>
            </div>
            <div class="hr employee-permissions">
                <div class="fz-16 mb-5">Права</div>
                <input-select
                    v-model="employee.allow_add"
                    :suggestions="allowSuggestions"
                    :allow-input="false"
                    class="tx--8 zi-1"
                >
                </input-select>
            </div>

            <div class="hr employee-services">
                <div class="fz-16 mb-5">Услуги</div>

                <label
                    v-for="service in services" 
                    :key="service.id"
                    class="mb-5 d-block"
                >
                    <input
                        type="checkbox"
                        :checked="service.checked"
                        @change="handleServiceChange(service.id)"
                    />
                    {{ service.name}}
                </label>
        </div>

        <div class="hr" v-if="false && allowUnavailable">
            Не е на работа:
            <input type="checkbox" v-model="employee.unavailable" />
            <br />

            <div v-if="employee.unavailable">
                Отсъства от работа от
                <date-input v-model="employee.unavailable_after" />:
                <br />Отсъства от работа до
                <date-input v-model="employee.unavailable_until" />
            </div>
        </div>

        <div class="hr employee-info" v-show="employee.allow_login">
            <div class="mb-5 fz-16">
                <template v-if="employee.id">Сняма на паролата</template>
            </div>

            <text-input
                v-model="employee.password"
                class="mb-5"
                type="password"
            >
                <template v-slot:label><span>Парола:</span></template>
            </text-input>

            <text-input
                v-model="employee.password_confirm"
                type="password"
            >
                <template v-slot:label><span>Парола отново:</span></template>
            </text-input>
 
        </div>

        <div class="d-flex space-between">
            <a href="#" @click.prevent="$emit('cancel')">Виж всички</a>
            
            <network-button
                :namespace="namespace"
                :disabled="disabled"
            >
            {{ action }}
            </network-button>
        </div>
        
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUrlID } from "../../../helpers/url";
import Employee from "../../models/Employee";

export default {
    props: {
        employee: Employee
    },
    data() {
        return {
            state: {
                employee: this.employee,
                services: []
            },
            allowSuggestions: [
                { text: "Не може да добавя", value: "no" },
                { text: "Може да добавя само за себе си", value: "self" },
                { text: "Може да добавя за всички", value: "all" }
            ]
        };
    },
    mounted() {
        this.state.services =  this.$store.state['employees'].services[this.employee.id];
    },
    computed: {
        services() {
            const employee = this.employee;

            return this.$store.state["services"].list.map(s => {
                const checked = this.state.services.indexOf(s.id) > -1;
                return {
                    ...s,
                    checked
                }
            });
        },
        allowUnavailable() {
            return this.employee.admin == 0; // admin accounts cannot be unavailable
        },
        hasPassword() {
            return this.employee.password.length;
        },
        matchingPasswords() {
            return (
                this.employee.password.length &&
                this.employee.password === this.employee.password_confirm
            );
        },
        disabled() {
            return this.hasPassword == false
                ? false
                : this.matchingPasswords
                ? false
                : true;
        },
        allowUnavailable() {
            return this.employee.admin == 0 && this.employee.id != null; // admin accounts cannot be unavailable
        },
        action() {
            return !this.state.employee.id ? 'Създай' : 'Редактирай';
        },
        namespace() {
            return !this.state.employee.id ? 'create' : 'update';
        }
    },
    methods: {
        handleServiceChange(serviceId) {
            const checked = event.target.checked;

            if(checked) this.state.services = [...this.state.services, serviceId ];
            else this.state.services = this.state.services.filter(id => id != serviceId)
        }
    }
};
</script>

<style>
    .employee-info .label-text {
        width: 60px;
        flex-shrink: 0;
        align-self: center;
    }
    .employee-info, .employee-permissions, .employee-services {
        font-size:  11px;
    }
</style>