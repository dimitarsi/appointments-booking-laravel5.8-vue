<template>
    <label class="color-input" @mouseenter="hovered = true" @mouseleave="hovered = false">
        <div class="color-sample" :style="{ background: value}"></div>
        <transition name="popup-title">
            <span class="popup-title zi-1" v-show="title && hovered"><span>{{ title }}</span></span>
        </transition>
        <input type="color" @change="$emit('input', $event.target.value)" :value="value">
    </label>
</template>

<script>
export default {
    props: ['value', 'title'],
    data() {
        return {
            hovered: false
        }
    }
}
</script>

<style lang="css">
    .color-input {
        cursor: pointer;
        border: 1px solid #999;
        padding: 3px;
        background: #fff;
        border-radius: 3px;
        position: relative;
        z-index: 102;
    }

    .color-input:hover {
        border-color: #909090;
        background: #f1f1f1;
    }

    .color-input input {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        width: 1px;
        height: 1px;
        border: 0 none;
        padding: 0;
        margin: 0;
    }
    .color-sample {
        width: 25px;
        height: 25px;
        display: block;
    }
    .popup-title {
        position: absolute;
        top: 100%;
        left: 50%;
    }
    .popup-title span {
        position: relative;
        left: -50%;
        background: #000;
        color: #fff;
        white-space: nowrap;
        z-index: 1001;
        padding: 3px 7px;
    }
</style>