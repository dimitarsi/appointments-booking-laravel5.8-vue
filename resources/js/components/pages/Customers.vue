<template>
    <div class="px-15">
        <div class="subpage-title space-between">
            <a href="#" class="back-link" @click.prevent="handleBack">
                <i class="fa fa-angle-left"></i>
                Клиенти
            </a>

            <a href="#" class="btn-sm" @click.prevent="createNew" v-if="!hasSelected">
                <i class="fa fa-plus"></i>
            </a>

            <a href="#" class="btn-sm" @click.prevent="handleDelete" v-else>
                <i class="fa fa-trash"></i>
            </a>
        </div>

        <customers-edit
            v-if="hasSelected"
            :customer="state.selectedCustomer"
            @save="handleSave"
            @cancel="handleListSelect(null)"
        />
        <template v-else>
            <customers-pick
                v-if="pick"
                :customers="list"
                @select="handlePick"
            />
            <customers-list 
                v-else
                :customers="list"
                @select="handleListSelect"
                @delete="handleDelete"
            />
        </template>
    </div>
</template>

<script>

import "./Customers/index";
import Customer from "../models/Customer";

import { mapState } from "vuex";

export default {
    data() {
        return {
            state: {
                selectedCustomer: null,
                dialog: null,
                pick: false
            }
        }
    },
    created() {
        window.addEventListener('hashchange', e => {
            this.checkHash();
        });
        this.checkHash();
    },
    computed: {
        ...mapState("customers", {
            list: state => state.list
        }),
        hasSelected(){ 
            return this.state.selectedCustomer != null 
        },
        pick() {
            return this.state.pick;
        }
    },
    methods: {
        createNew() {
            this.state.selectedCustomer = new Customer();
        },
        async handleSave(customer) {
            if(customer.id) {
                await this.$store.dispatch("customers/update", { customer })  
            } else {
                await this.$store.dispatch("customers/create", { customer })  
            }

            if(this.state.dialog) {
                this.$store.dispatch('dialog/show', {
                    name: this.state.dialog.name
                });
            }

            this.state.selectedCustomer = null;
        },
        handleListSelect(customer) {
            this.state.selectedCustomer = customer;
        },
        handleDelete() {

        },
        checkHash() {
            const res = location.hash.match(/\?id=(\d+)/);
            const createNew = location.hash.match(/(\&|\?)new/);
            const pick = location.hash.match(/(\&|\?)pick/);

            this.state.pick = !!pick;

            if(res && res[1]) {
                this.state.selectedCustomer = this.$store.getters['customer/getById'](res[1]);
            }

            if(createNew && createNew.length) {
                this.state.selectedCustomer = new Customer();
                this.state.dialog = this.$store.getters['dialog/visible'];
            }

        },
        handlePick(customer) {
            this.$store.commit('dialog/updateAppointment', { customer_id: customer.id });
        },
        handleBack() {
            if(this.state.selectedCustomer) this.state.selectedCustomer = null;
            else window.history.go(-1);
        }
    }
}
</script>