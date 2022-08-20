import Vue from "vue";

const RX_START_SLASH = /^\/?/;

class CustomRouter {
    constructor(routes, root) {
        this.routes = routes;
        this.root = root;
        this.state = {
            current: { component: '404' }
        };

        window.onpopstate = () => this.onPopState()
        this.getCurrentRoute()
    }

    getCurrentRoute() {
        const href = window.location.pathname.replace(this.root, '');

        this.routes.some(r => {
            if(href.match(r.pattern)) {
                this.state.current = r;
                return true;
            }
            return false;
        });
    }

    onPopState() {
        this.getCurrentRoute();
    }

    url(path) {
        const _path = path.replace(RX_START_SLASH, '');
        return `${this.root}/${_path}`.replace('//', '/');
    }

    pushState(data, title, url) {
        history.pushState(data, title, url);
        setTimeout(() => this.onPopState(), 0);
    }
}

const routes = [
    { pattern: /^\/?$/, component: 'home'  },
    // { pattern: /^\/?customer\/?$/, component: 'customer'  },
    { pattern: /^\/?appointments\/(\d+)\/list$/, component: 'appointments-list' },
    { pattern: /^\/?dashboard\/(\d+)$/, component: 'dashboard' },
    { pattern: /^\/?appointments\/(\d+)$/, component: 'appointment-form' },
    { pattern: /^\/?register\/?$/, component: 'service-provider' },
    { pattern: /^\/?login\/?$/, component: 'login' },
];

const root = '/';
const router = new CustomRouter(routes, root);


Vue.mixin({
    beforeCreate() {
        this.$router = router;
    }
})

export default router;