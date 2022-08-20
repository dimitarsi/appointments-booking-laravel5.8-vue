import Vue from "vue";
import { storiesOf } from "@storybook/vue";
import TextInput from "../../js/components/common/TextInput.vue";

import TextInputWithLabel from "!text-loader?modules!./withLabel.md";

import '!css-loader?modules!../../../public/css/app.css';

Vue.component('text-input', TextInput)


storiesOf('TextInput', module)
    .add('with label', () => '<text-input value="Foobar" label="Foobar" />', { notes: { markdown: TextInputWithLabel }})
    .add('with error', () => ({
        data() {
            return {
                value: 'Foobar'
            };
        },
        component: {
            TextInput
        },
        methods: {
            validate(input) {
                if(input == 'Foobar') return null;
                return ['Input needs to equal \'Foobar\''];
            }
        },
        template: '<text-input v-model="value" :validate="validate" />'
    }))
    .add('as a component', () => ({
        component: {
            TextInput
        },
        template: '<text-input value="Foobar" />'
    }));