<template>
  <div class="px-15">
        <div class="subpage-title space-between">
            <a href="#" class="back-link" @click.prevent="handleBack">
                <i class="fa fa-angle-left"></i>
                Услуги
            </a>

            <a href="#" class="btn-sm" @click.prevent="createNew" v-if="!hasSelected">
                <i class="fa fa-plus"></i>
            </a>

            <a href="#" class="btn-sm" @click.prevent="createNew" v-else>
                <i class="fa fa-trash"></i>
            </a>
        </div>
        
        <service-edit 
            v-if="state.service" 
            :service="state.service"
            @update="handleSubmit"
            @cancel="state.service = null"
        />
        <template v-else>
            <service-pick 
                v-if="state.pick"
                :services="services"
                @select="handlePick"
            />
            <service-list 
                v-else
                :services="services"
                @select="state.service = $event"
            />
        </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Service from "../models/Service";

import "./Services/index";

export default {
    data() {
        return {
            state: {
                service: null,
                pick: false
            }
        }
    },
    mounted() {
        if(this.$store.state['services'].list.length == 0) {
            this.$store.dispatch('services/load');
        }
        
        window.addEventListener('hashchange', e => {
            this.checkHash();
        });

        this.checkHash();
    },
    computed: {
        ...mapState('services', {
            services: state => state.list
        }),
        hasSelected() {
            return this.state.service != null;
        }
    },
    methods: {
        checkHash() {
            const res = location.hash.match(/\?id=(\d+)/);
            const createNew = location.hash.match(/(\&|\?)new/);
            const pick = location.hash.match(/(\&|\?)pick/);

            this.state.pick = !!pick;

            if(res && res[1]) {
                this.state.service = this.$store.getters['services/getById'](res[1]);
            }

            if(createNew && createNew.length) {
                this.state.service = new Service();
                this.state.dialog = this.$store.getters['dialog/visible'];
            }

        },
        createNew() {
            this.state.service = new Service();
        },
        async handleSubmit(service) {
            if(!service.id) {
                await this.$store.dispatch('services/create', service);
            } else {
                await this.$store.dispatch('services/update', service);
            }

            this.state.service = null;
        },
        handleDelete(id) {
            this.$store.dispatch('services/deleteService', { id });
            this.$store.dispatch('services/load');
        },
        handlePick(service) {
            this.$store.commit('dialog/updateAppointment', {
                service_id: service.id,
                duration: service.duration
            });
        },
        handleBack() {
            if(this.state.service) this.state.service = null;
            else window.history.go(-1);
        }
  }
}
</script>
