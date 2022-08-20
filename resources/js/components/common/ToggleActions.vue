<template>
    <div :class="{opened: opened}" >
        <div class="dots-container">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>        

        <div class="actions-list">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
