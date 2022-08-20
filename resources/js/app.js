import "./bootstrap";
import Vue from "vue";

import store from "./store";

import "./store/interceptor";
import "./components/pages";

import "./components";

import clickOutside from "./plugins/clickOutside";

Vue.use(clickOutside);

if(document.querySelector('#vueapp')) {
    new Vue({
        el: "#vueapp",
        store
    });
}