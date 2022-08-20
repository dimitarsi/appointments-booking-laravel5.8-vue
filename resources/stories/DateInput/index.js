import Vue from "vue";
import { storiesOf } from "@storybook/vue";
import DateInput from "../../js/components/common/DateInput.vue";

Vue.component("date-input", DateInput);

storiesOf("DateInput", module)
    .add("Date Only", () => {
        return {
            data() {
                return { current: new Date() };
            },
            template: "<date-input v-model='current' />"
        }
    })
    .add("With Time", () => {
        return {
            data() {
                return { state: { current: new Date() }};
            },
            methods: {
                handleChange(event) {
                    Vue.set(this.state, 'current', event);
                }
            },
            template: `
            <div>
                {{ state.current.toString() }}
                <date-input v-model="state.current" from='8:30' to='18:30' show-time />
            </div>`
        }
    })