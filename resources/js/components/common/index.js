import Vue from "vue";

import TextInput from "./TextInput.vue"
import InputSelect from "./InputSelect.vue";
import DateInput from "./DateInput.vue";

import ColorInput from "./ColorInput.vue";
import TextComponent from "./Text.vue";
import RadioSelect from "./RadioSelect.vue";
import Switch from "./Switch.vue";



Vue.component('text-input', TextInput);
Vue.component('input-select', InputSelect);
Vue.component('date-input', DateInput);

Vue.component('big-text', TextComponent);
Vue.component('radio-select', RadioSelect);
Vue.component('switch-input', Switch);
Vue.component('color-input', ColorInput);