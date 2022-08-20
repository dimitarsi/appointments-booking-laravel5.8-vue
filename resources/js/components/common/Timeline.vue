<template>
    <div class="timeline">
        <div class="hours" v-for="(h, i) in hours" :key="i">
            {{ h }}:00
        </div>
    </div>
</template>
<script>
import { range } from "../../helpers/date";

export default {
    props: [
        'from', 'to'
    ],
    computed: {
        hours() {
            return range(this.from, this.to);
        }
    }
}
</script>

<style>
.timeline {
    position: absolute;
    left: 0;
    top: 0;
    height: 500px;
    width: 100%;
    z-index: 1;
}
.hours {
    border-bottom: 1px solid #000;
    height: 35px;
}
</style>
