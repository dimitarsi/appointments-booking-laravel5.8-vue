<template>
    <div>
        <h1>Subscriptions</h1>
        <div class="hr">
            <braintree-form @submit="makeSubscription">
                <template v-slot:fields>
                    <div class="d-flex">
                        <label v-for="plan in plans" :key="plan.id" class="mr-5">
                            {{ plan.name }} - {{ plan.price }} &euro; <br>

                            <template v-if="current == plan.id && paid_through">
                                Платен до {{ paid_through }} <br>
                            </template>
                            
                            <template v-if="pending != plan.id">
                                <input type="radio" name="plan" :checked="current == plan.id" @change="handlePlanChange(plan.id)" :value="plan.id" />
                            </template>
                            <template v-else>
                                В процес на обработка.
                            </template>
                        </label>
                    </div>
                </template>
                <template v-slot:buttons>
                    <a href="/dashboard/payments/payment-details">Добави друг начин за плащане</a>
                </template>
            </braintree-form>
        </div>
        <div class="hr">
            <a href="#" @click.prevent="unsubscribe">Прекратяване на абонамента</a>
        </div>
    </div>
</template>
<script>
export default {

    created() {
        this.$store.dispatch('plans/load');
        this.$store.dispatch('plans/current');
    },
    computed: {
        plans() {
            return this.$store.state['plans'].plans;
        },
        pending() {
            return this.$store.state['plans'].pending_plan_id;
        },
        current() {
            return this.$store.state['plans'].current;
        },
        paid_through() {
            return this.$store.state['plans'].paid_through;
        }
    },
    methods: {
        handlePlanChange(plan_id) {
            this.$store.commit('plans/current',  { plan_id });
        },
        makeSubscription(nonce) {
            const payload = {
                plan_id: this.current,
                nonce
            };
            this.$store.dispatch('plans/subscribe', payload);
        },
        unsubscribe() {
            this.$store.dispatch('plans/unsubscribe');
        }
    }
}
</script>