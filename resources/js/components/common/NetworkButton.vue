<template>
    <button @click="handleClick" class="btn">
        <span v-if="!isLoading">
            <slot></slot>
        </span>
        <span class="a-rotate a-loop icon-loading" v-else></span>    
    </button>
</template>
<script>
import { mapState } from 'vuex';

export default {
    props: {
        namespace: String,
        prevent: false
    },
    computed: {
        isLoading() {
            return this.$store.getters["network/isNamespaceActive"](this.namespace)
        }
    },
    methods: {
        handleClick(event) {
            if(this.isLoading) return;
            if(this.prevent) event.preventDefault();
            this.$emit('save');
        }
    }
}
</script>