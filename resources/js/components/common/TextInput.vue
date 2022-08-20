<template>
    <label class="d-flex d-flex-cols">
        <div v-if="errors">{{ errors }}</div>
        <div class="label-text mr-10" v-if="$slots.label">
            <slot name="label"></slot>
        </div>
        <div class="text-input" :class="{'bg-none': transparent, 'flex-autogrow': autogrow }">
            <span class="badge badge-prefix" v-if="$slots.prefix">
                <slot name="prefix"></slot>
            </span>
            <input 
                :type="type"
                :value="phoneNumber" 
                :disabled="disabled"
                :style="width"
                :placeholder="placeholder"
                class="form-control"
                @keyup="$emit('input', $event.target.value)"
                @focus="$emit('focus', $event)"
                @change="$emit('change', $event.target.value)"
            />
            <span class="badge badge-sufix" v-if="$slots.sufix">
                <slot name="sufix"></slot>
            </span>
        </div>
    </label>
</template>
<script>
export default {
    props: {
        autogrow: {
            default: true
        },
        value: {
            type: [String, Number, undefined],
            default: ''
        },
        disabled: {
            default: () => false
        },
        validate: {
            type: [Function],
            required: false
        },
        small: {
            type: Boolean,
            default: false
        },
        transparent: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: ''
        }
    },
    computed: {
        errors() {
            // if(this.value.length > 0 && this.value.indexOf(0) !== 0) {
            //     return "Input should start with 0";
            // }
            if(this.validate instanceof Function) {
                return this.validate(this.value);
            }
            return false;
        },
        phoneNumber() {
            return this.value;
        },
        validation() {
            return this.errors.join(', ');
        },
        width() {
            return {
                'width': this.small ? '60px' : 'auto'
            };
        }
    }
}
</script>

