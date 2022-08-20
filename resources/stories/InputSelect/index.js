import { storiesOf } from "@storybook/vue";
import Vue from "vue";
import TextInput from "../../js/components/common/TextInput.vue";
import InputSelect from "../../js/components/common/InputSelect.vue";

import clickOutside from "../../js/plugins/clickOutside";

Vue.use(clickOutside);

Vue.component("input-select", InputSelect);
Vue.component('text-input', TextInput);


storiesOf("InputSelect", module)
    .add("General", () => {
        return {
            data() {
                return {
                    suggestions: ['Foo Bar', 'Bar Baz'],
                    style: {
                        width: '500px',
                        height: '500px',
                        border: '2px solid #000',
                        background: '#f1f1f1'
                    },
                    inputVal: 'Foobar'
                }
            },
            template: "<div :style='style'><input-select v-model='inputVal' :suggestions='suggestions' /></div>"
        }
    });