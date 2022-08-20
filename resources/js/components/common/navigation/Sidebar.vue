<template>
    <transition name="sidebar">
        <div class="sidebar" v-if="state.visible" id="sidebar">
            <div class="sidebar-overflow">
                <transition name="fade" mode="in-out" tag="div">
                    <div class="sidebar-nav-items" v-show="'menu' === state.which">
                        <slot name="menu"></slot>
                    </div>
                </transition>
                <transition name="fade" mode="in-out" tag="div">
                    <div class="sidebar-nav-items" v-show="'submenu' === state.which">
                        <slot name="submenu"></slot>
                    </div>
                </transition>
                <transition name="fade" mode="in-out" tag="div">
                    <div class="sidebar-nav-items" v-show="'filter' === state.which">
                        <slot name="filter"></slot>
                    </div>
                </transition>
            </div>
            <transition name="cover">
                <div class="sidebar-cover" v-show="state.visible" @click="closeSidebar"></div>
            </transition>
        </div>
    </transition>
</template>
<script>
export default {
    data() {
        return {
            state: {
                visible: false,
                which: 'none'
            },
            menus: ['filter', 'menu', 'submenu']
        }
    },
    mounted() {
        window.addEventListener('hashchange', e => {
            this.checkHash();
        });

        window.addEventListener('click', e => {

            if(e.target.href === location.href || e.target.parentNode.href === location.href) {
                e.preventDefault();
                this.closeSidebar();
            }
        });

        document.body.addEventListener('keyup', e => {
            if(e.key === 'Escape' && this.state.visible) this.closeSidebar();
        })

        this.checkHash();
    },
    methods: {
        checkHash() {
            this.state.which = location.hash.replace('#', '');
            this.state.visible = this.menus.indexOf(this.state.which) > -1;
        },
        openMenu() {
            this.state.visible = true;
        },
        closeMenu() {
            this.state.visible = false;
        },
        closeSidebar() {
            location.hash = '';
        }
    }
}
</script>