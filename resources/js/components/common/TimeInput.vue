<template>
    <label>
        
    </label>
</template>
<script>
export default {
    props: {
        value: {
            type: [String, Number],
            required: true
        },
        disabled: {
            default: () => false
        }
    },
    computed: {
        suggestions() {
            
        },
        errors() {
            if(this.validate instanceof Function) {
                return this.validate(this.value);
            }
            return false;
        },
        phoneNumber() {
            return this.value
        },
        validation() {
            return this.errors.join(', ');
        }
    },
    methods: {
        setTime() {

        }
    }
}
</script>

