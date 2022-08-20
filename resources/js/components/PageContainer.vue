<template>
    <transition name="subpage">
        <div class="subpage vh-100 w-300" v-if="state.visible" id="subpage">
            <customers 
                v-if="state.which == 'customers'" 
            />
            <employees-page v-if="state.which == 'employees'" />
            <!-- <widget-settings v-if="state.which == 'theme'" /> -->
            <services-page v-if="state.which == 'services'" />
            <worktime-settings v-if="state.which == 'worktime'" />
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
            pages: [
                'services',
                'customers',
                'employees',
                'worktime',
                'theme'
            ]
        }
    },
    mounted() {
        window.addEventListener('hashchange', e => {
            this.checkHash();
        });
        
        document.body.addEventListener('keyup', e => {
            if(e.key === 'Escape' && this.state.visible) this.closeSidebar();
        })

        this.checkHash();
    },
    methods: {
        checkHash() {
            this.state.which = location.hash.replace('#', '')
                                            .replace(/\?.+/, '');
                                            
            this.state.visible = this.pages.indexOf(this.state.which) > -1;
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