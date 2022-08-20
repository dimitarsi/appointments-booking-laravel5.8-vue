<template>
    <div :class="{'show-list': state.showList, 'small-list': small, 'f-nowrap': nowrap}" class="input-select d-flex flex-cols input-list" ref="container">
        <span v-if="$slots.label" class="select-label">
            <slot name="label"></slot>
        </span>
        <div class="rel bg-white">
            <div class="rel" :class="{'z-1001': state.showList}"  v-if="allowInput">
                <text-input
                    :value="displayText"
                    :small="small"
                    :transparent="true"
                    @input="suggest($event)"
                    @focus="showSuggestions"
                    @change="change($event)" 
                />
                <caret-up class="absolute" @click="showSuggestions" />
            </div>
            <template v-else>
                <div @click="showSuggestions" class="px-10 py-5 fz-11 rel" :class="{'z-1001': state.showList}">
                    {{displayText || 'Избери'}}
                    <caret-up />
                </div>
            </template>

            <select-list 
                :list="suggestions"
                :selected="value"
                :small="small"
                :max-height="maxHeight"
                @change="handleSuggestion"
            />
        </div>
    </div>
</template>
<script>
import CaretUp from "./InputSelect/CaretUp.vue";
import SelectList from "./InputSelect/SelectList.vue";

function trimEnd(txt, count) {
    return txt.slice(0, count) + (txt.length > count ? '...' : '');
}

export default {
    props: {
        nowrap: {
            type: [Boolean],
            default: true
        },
        small: {
            type: [Boolean],
            default: false
        },
        value: {
            type: [Number, String, undefined],
            default: ''
        },
        allowInput: {
            default: true
        },
        suggestions: {
            type: [Array],
            default: () => []
        },
        small: {
            type: Boolean,
            default: false
        },
        maxHeight: {
            default: '240px'
        },
        trim: {
            default: 0
        }
    },
    components: {
        'caret-up': CaretUp,
        'select-list': SelectList
    },
    mounted() {
        this.$onClickOutside(this.$refs.container, this.hideSuggestions);
    },
    data() {
        return {
            state: {
                showList: false
            }
        }
    },
    computed: {
        displayText() {
            if(this.suggestions.length === 0) return this.value;
            const suggestion = this.suggestions.filter(s => s === this.value || (typeof s.text !== undefined && s.value === this.value));

            if(suggestion.length === 0) return  this.trim ? trimEnd(this.value, this.trim) : this.value;
            const s = suggestion[0];

            if(typeof s['text']  !== 'undefined') {
                return this.trim ? trimEnd(s['text'], this.trim) : s['text'];
            }

            return this.trim ? trimEnd(s, this.trim) : s;
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
        suggest(data) {
            this.hideSuggestions();
            this.$emit('input', this.getValue(data));
        },
        showSuggestions() {
            this.state.showList = !this.state.showList;
        },
        hideSuggestions() {
            this.state.showList = false;
        },
        change(data) {
            this.$emit('change', this.getValue(data));
            this.hideSuggestions();
        },
        handleSuggestion(data) {
            this.$emit('input', this.getValue(data));
            this.$emit('change', this.getValue(data));
            this.hideSuggestions();
        }
    }
}
</script>