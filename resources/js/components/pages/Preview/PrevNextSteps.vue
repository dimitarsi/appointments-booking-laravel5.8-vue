<template>
    <div class="widget-bottom-toolbar d-flex align-items-center justify-content-center">
        <a href="#" @click.prevent="$emit('prev')">
            <i class="fa fa-angle-left fz-22"></i>
            <span class="pl-10">Предишна</span>
        </a>
        <div class="vline"></div>

        <transition-group @leave="onLeave" class="d-flex">
            <div v-for="(step, i) in steps" 
                :key="`${step.uuid}`" 
                class="step-box" 
                :class="{active: i == active }"
                @click.prevent="$emit('step', i)"
            >
                &nbsp;
            </div>
        </transition-group>

        <div class="vline"></div>
        <a href="#" @click.prevent="$emit('next')">
            <span class="pr-10">Следваща</span>
            <i class="fa fa-angle-right fz-22"></i>
        </a>
    </div>
</template>
<script>
import gsap from "gsap";
export default {
    props: ['steps', 'active'],
    methods: {
        onLeave(el) {
            gsap.to(el, .2, {y: -20, opacity: 0});
        }
    }
}
</script>
<style>
    .step-box {
        width: 20px;
        height: 20px;
        border: 1px solid #ddd;
        display: block;
        margin: 0 3px;
        transition: .3s background;
        cursor: pointer;
    }
    .step-box:first-child { margin-left: 6px;}
    .step-box:last-child { margin-right: 6px; }
    .step-box.active,
    .step-box:hover {
        background: #ddd;
    }
</style>