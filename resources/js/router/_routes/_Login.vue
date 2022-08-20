<template>
<div class="container">
    <div class="row">
        <div class="col">
            <text-input v-model="login.email" />
        </div>
        <div class="col">
            <input type="password" v-model="login.password" />
        </div>
    </div>
    <div class="row">
        <div class="col">
            <button class="btn" @click="attemptLogin">Login</button>
        </div>
    </div>
</div>
</template>
<script>
import axios from "axios";

export default {
    data() {
        return {
            login: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        attemptLogin() {
            axios.post(`/login`, this.login)
        }
    }
}
</script>
