import Vue from "vue";

const subscribers = new WeakMap();
const keys = [];

function checkParents(target, ref) {
    if(!target) return true;
    if(target == ref) return false;
    return checkParents(target.parentNode, ref);
}

function handleClick(event) {
    keys.forEach((sub, index) => {
        if(checkParents(event.target, sub) ) {
            const callback = subscribers.get(sub);
            callback(event);
        }
    });
}

export default {
    install() {
        document.body.parentNode.addEventListener('click', handleClick);

        Vue.prototype.$onClickOutside = function $onClickoutside(ref, callback) {
            keys.push(ref);
            subscribers.set(ref, callback);
        }
    }
}