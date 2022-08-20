<template>
    <div class="appointments">
        <timeline from="9" to="18" />
        <slot></slot>
    </div>
</template>
<script>
import Timeline from "../common/Timeline.vue";

export default {
    components: {
        'timeline': Timeline
    }
}
</script>