<template>
  <div v-show="false">
        .kl-container-outer,
        .kl-container-head,
        .kl-container-body,
        .kl-field-row,
        .kl-field-row-send {
            transition: .3s all;
        }

        .kl-container-outer {    
            width: {{ css.container.width }};
            border-radius: {{ css.container.borderRadius }};
            box-shadow: {{ css.container.boxShadow }} {{ boxShadowRGBA }};
        }
        .kl-container-head {
            font-size: {{ css.title.fontSize }};
            color: {{ css.title.color }};
            background: {{ css.title.background }};
            padding: {{ css.title.padding }};
            border: {{ css.container.border }};
            border-bottom: {{ css.title.borderBottom }};
            border-radius: {{ borderRadiusHead }};
            box-sizing: border-box;
        }
        .kl-container-body {
            padding: {{ css.container.padding }};
            color: {{ css.text.color }};
            font-size: {{ css.text.fontSize }};
            width: 100%;
            border-radius: {{ borderRadiusContainer }};
            border: {{ css.container.border }};
            border-top: 0 none;
            box-sizing: border-box;
            background: {{ css.text.background }};
        }
        .kl-field-row {
            padding-bottom: {{ fieldRowPadding }};
        }
        .kl-field-row-send {
            padding-top: {{ fieldRowPadding }};
        }
  </div>
</template>

<script>
import { hexToRgb } from "../../helpers/colors";

function updateDynamicCss(pseudoStyle) {
    try {
        const dynamicStyle = document.querySelector('#dynamic-style');
        dynamicStyle.innerText = pseudoStyle.innerText;
    } catch(exp) {
        throw exp;
    }
}


export default {
    props: ['css'],
    // computed: {
    //     ...mapState('settings', {
    //     text: state => state.text,
    //     secondary: state => state.secondary,
    //     primary: state => state.primary,
    //     icon: state => state.icon
    //     })
    // },
    computed: {
        fieldRowPadding() {
            const size = (this.css.container.padding.split(' ')[0] || '0').match(/[-_a-zA-Z]*(\d+)(px|\%|em)?/);
    
            const amount = parseFloat(size[1]);
            const units = size[2] || 'px';
            if(amount == 0) return '5px';
            return Math.ceil(amount * .5) + units;
        },
        boxShadowRGBA() {
            const rgb = hexToRgb(this.css.container.boxShadowColor);
            rgb.push(this.css.container.boxShadowAlpha);

            return `rgba(${rgb.join(',')})`;
        },
        borderRadiusHead() {
            const radius = this.css.container.borderRadius.split(' ');
            if(radius.length == 1) {
                return `${radius[0]} ${radius[0]} 0 0`
            }
            if(radius.length == 2) {
                return `${radius[0]} ${radius[0]} 0 0`
            }

            return `${radius[0]} ${radius[1]} 0 0`
        },
        borderRadiusContainer() {
            const radius = this.css.container.borderRadius.split(' ');
            if(radius.length == 1) {
                return `0 0 ${radius[0]} ${radius[0]}`
            }
            if(radius.length == 2) {
                return `0 0 ${radius[1]} ${radius[1]}`
            }

            return `0 0 ${radius[2]} ${radius[3]}`
        }
    },
    // mounted() {
    //     updateDynamicCss(this.$refs.pseudoStyle);
    // },
    // updated() {
    //     updateDynamicCss(this.$refs.pseudoStyle);
    // },
}
</script>
