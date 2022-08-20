<template>
    <div>
        <h1>Потвърждение за начин на плащане</h1>
        <p>Няма да бъдете таксувани</p>
        <braintree-form @submit="handleNonce">
            <template v-slot:fields>
                <div>
                    <label>
                        Добави като метод за плащане по-подразбиране: &nbsp;
                        <input type="checkbox" v-model="state.makeDefault" name="makeDefault" value="1" />
                    </label>
                </div>
            </template>
        </braintree-form>
    </div>
</template>

<script>
import { getToken, createCustomer } from "../../services/paymentService";

export default {
    data() {
        return {
            state: {
                makeDefault: true
            }
        }
    },
    methods: {
        async handleNonce(nonce){
            const resp = await createCustomer(nonce, this.state.makeDefault);
            const data = resp.data;
            if(!data.errors) {
                location.href = data.redirect;
            }
        }
    }
}
</script>