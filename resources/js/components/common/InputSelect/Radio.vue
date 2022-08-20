<template>
    <span v-if="selected" class="radio-full"></span>
    <span v-else class="radio-empty"></span>
</template>

<script>
export default {
    props: ['selected']
}
</script>
