import Vue from "vue";
import { storiesOf } from "@storybook/vue";
import ColorPicker from "../../js/components/common/ColorPicker.vue";

Vue.component('color-picker', ColorPicker)

storiesOf("ColorPicker", module)
  .add("General",() => {
    return {
      data() {
        return {
          color: '#ffffff'
        }
      },
      template: '<color-picker v-model="color" />'
    }
  })