<template>
    <div class="list" :class="{'small-list': small}">
        <div class="inner-list" :style="{height: maxHeight}">
            <div 
                class="list-item nowrap"
                :class="{'item-selected' : selected == getValue(suggestion) }"
                v-for="(suggestion, index) in list" :key="index"
                @click="handleChange(suggestion, index)">
                <slot name="item"
                    :item="suggestion"
                    :selected="selected == getValue(suggestion)"
                    :text="getText(suggestion)"
                >
                    {{ getText(suggestion) }}
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default: () => []
        },
        selected: {
            default: ''
        },
        showList: {
            default: false
        },
        small: {
            type: Boolean,
            default :false
        },
        maxHeight: {
            default: 'auto'
        }
    },
    methods: {
        getText(suggestion) {
            if(suggestion.hasOwnProperty('text')) return suggestion.text;
            return suggestion;
        },
        getValue(suggestion) {
            if(suggestion.hasOwnProperty('value')) return suggestion.value;
            return suggestion;
        },
        handleChange(suggestion, index) {
            this.$emit('change', suggestion)
        }
    }
}
</script>
