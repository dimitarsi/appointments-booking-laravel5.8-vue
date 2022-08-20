import Vue from "vue";

export default {
    install() {
        Vue.prototype.$temporary = function(props, time) {
            const old = {};
            for(let p of props) {
                old = this[p];
                this[p] = props[p];
            }
            setTimeout(() => {
                for(let p of old) {
                    this[p] = old[p];
                }
            }, time);
        }
    }
}