<template>
    <div class="d-flex pt-50 justify-content-center">
        <a href="#" @click.prevent="$emit('delete')" v-show="stepsCount != 0" class="btn mr-10 btn-logout">
            <i class="fa fa-trash"></i>
        </a>
        <a href="#" @click.prevent="handleAddStep" class="btn mr-10">
            <transition @enter="showBtnMessage" @leave="hideBtnMessage">
                <span key="onadd" class="d-block" v-if="!state.added">
                    <i class="fa fa-plus"></i> Добави нов стъпка
                </span>
            </transition>
            <transition @enter="showBtnMessage" @leave="hideBtnMessage">
                <span key="onaddleave" class="d-block"  v-if="state.added">
                    <i class="fa fa-check"></i> Успешно добавена нова стъпка
                </span>
            </transition>
        </a>
    </div>
</template>

<script>
import gsap from 'gsap';

export default {
    props: ['stepsCount'],
    data() {
        return {
            state: {added: false, addedTO: -1}
        }
    },
    methods: {
        handleAddStep() {
            clearTimeout(this.state.addedTo);
            this.state.addedTO = setTimeout(() => {
                this.$nextTick(() => { this.state.added = false });
            }, 4000);
            this.state.added = true;
            this.$emit('add');
        },
        showBtnMessage(el) {
            gsap.fromTo(el, .4, {y:-30, position: 'absolute'}, {y: 0, position: 'relative'}, .2);
        },
        hideBtnMessage(el) {
            gsap.fromTo(el, .6, {y:0, position: 'relative'}, {y: 30, position: 'absolute'});
        }
    }
}
</script>