<template>
    <div class="textarea-wrapper">
        <div class="textarea">
            <textarea
                :value="valueTrimmed"
                class="form-control"
                :placeholder="placeholder"
                @change="$emit('change', $event.target.value)"
                @input="$emit('input', $event.target.value)"
            >
            </textarea>
        </div>
        <div class="counter" v-if="max > 0"> Символи: {{valueTrimmed.length}}/{{max}}</div>
    </div>
</template>
<script>
export default {
    props: {
        value: {
            default: ''
        },
        max: {
            type: [Number, String],
            default: 0
        },
        placeholder: {
            default: "ABCD..."
        }
    },
    computed: {
        valueTrimmed() {
            if(parseFloat(this.max) <= 0) return this.value;
            return  (this.value+'').slice(0, parseFloat(this.max));
        }
    }
}
</script>
