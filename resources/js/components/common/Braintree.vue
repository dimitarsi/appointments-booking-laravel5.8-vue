<template>
    <div>
        {{ error }}
        <div id="braintree-container"></div>
        <slot name="fields"></slot>
        <div>
            <button @click="handleSubmit">Изпрати</button>
            <slot name="buttons"></slot>
        </div>
    </div>
</template>

<script>
import { getToken, createCustomer } from "../../services/paymentService";

export default {
    data() {
        return {
            error: '',
            state: {
                instance: null,
                token: null,
                nonce: null
            }
        }
    },
    async mounted() {
        const token = await getToken();
        if(token) {
            this.state.token = token;
            this.createBraintedDropin();
        } else {
            this.error = 'Error getting token';
        }
    },
    computed: {
        instance() {
            return this.state.instance;
        }
    },
    methods: {
        createBraintedDropin() {
            braintree.dropin.create({
                authorization: this.state.token,
                container: '#braintree-container' // '#dropin-container'
            }, this.onDropinInit);
        },
        onDropinInit(createErr, instance) {
            if(createErr) {
                this.$emit('error', createErr)
                this.error = createErr;
                return;
            }
            this.state.instance = instance;
            
        },
        async handleNonce(err, payload){
            if(err) {
                this.error = err;
                this.$emit('error', err)
            } else {
                this.state.nonce = payload.nonce;
                this.$emit('submit', payload.nonce);
            }
        },
        clearNonce() {
            this.state.nonce = null;
        },
        handleSubmit() {
            if(this.state.nonce == null) {
                this.state.instance.requestPaymentMethod(this.handleNonce);
            } else {
                this.$emit('submit', this.state.nonce);
            }
            
        }
    }
}
</script>