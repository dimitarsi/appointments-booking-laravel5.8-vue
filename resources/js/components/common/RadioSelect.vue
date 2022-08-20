<template>
    <div class="input-select radio-select">
        <select-list 
            :list="suggestions"
            :selected="value"
            @change="handleSuggestion"
        >
            <template v-slot:item="item">
                <!-- <div class="radio" :class="{ selected: item.selected }">
                    {{ item.text }}
                </div> -->
                <radio-option :selected="item.selected" /> {{ item.text }}
            </template>
        </select-list>
    </div>
</template>
<script>
import SelectList from "./InputSelect/SelectList.vue";
import Radio from "./InputSelect/Radio.vue";

export default {
    props: {
        value: {
            type: [Number, String],
            required: true
        },
        suggestions: {
            type: [Array],
            default: () => []
        }
    },
    components: {
        'select-list': SelectList,
        'radio-option': Radio
    },
    computed: {
        displayText() {
            if(this.suggestions.length === 0) return this.value;
            const suggestion = this.suggestions.filter(s => s === this.value || (typeof s.text !== undefined && s.value === this.value));

            if(suggestion.length === 0) return this.value;
            const s = suggestion[0];

            if(typeof s['text']  !== 'undefined') {
                return s['text'];
            }

            return s;
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
        handleSuggestion(data) {
            this.$emit('change', this.getValue(data));
        }
    }
}
</script>