import Vue from "vue";

import PreviewSettings from "./pages/PreviewSettings.vue";
import EmbedWidgetEdit from "./embed/EmbedWidgetEdit.vue";
import EmbedStepEdit from "./embed/EmbedStepEdit.vue";
import CssCompiler from "./embed/CssCompiler.vue";

Vue.component('embed-widget-edit', EmbedWidgetEdit);
Vue.component('embed-step-edit', EmbedStepEdit);
Vue.component('preview-settings', PreviewSettings);
Vue.component('css-compiler', CssCompiler);