<template>
    <div class="reg-popup" v-if="show">
        <div class="reg-popup-body">
            <div class="heading">{{ title }}</div>
            <popup-errors :namespace="namespace" v-if="namespace" />
            <form action="/" @submit.prevent="handleSubmit">
                <slot name="fields"></slot>
                <div class="row mb-0 justify-content-space-between">
                    <div class="col">
                        <slot name="buttons"></slot>
                    </div>
                    <div class="col text-right">
                        <button class="btn-cancel" @click="handleHide">
                            <span>Затвори</span>
                        </button>
                        <network-button :namespace="namespace">
                            Запази
                        </network-button>
                    </div>
                </div>
            </form>
        </div>
        <transition name="cover">
            <div class="reg-body-background" @click="handleHide"></div>
        </transition>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        namespace: {
            type: String,
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        document.body.addEventListener('keyup', e => {
            if(this.show && e.key === 'Escape') this.handleHide();
        });
    },
    methods:{
        handleSubmit() {
            this.$emit('submit');
        },
        handleHide() {
            this.$emit('hide');
        }
    }
}
</script>
