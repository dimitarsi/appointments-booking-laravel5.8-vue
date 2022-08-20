<template>
    <div class="color-picker" ref="container">
      <div class="color-preview">
        <div class="preview-color-box" :style="{backgroundColor: colorValue}" @click="toggleOpen">&nbsp;</div>
      </div>
      <div class="pick-color p-15 d-flex-col" v-show="state.open">
        <div class="d-flex">
          <text-input :value="value" @input="log" />
          <div class="color-preview" v-for="(sample, index) in state.sampleColors" :key="index">
            <div class="preview-color-box" :style="{backgroundColor: sample}" @click="setColor(sample)" :title="sample">&nbsp;</div>
          </div>
        </div>
        <canvas ref="canvas" @click="handleColorClick" width="294px" height="70px"></canvas>
      </div>
    </div>
</template>

<script>

import { chunk } from "lodash";
import { toHex } from "../../helpers/colors";

export default {
  props: ['value'],
  data() {
    return {
      state: {
        open: false,
        sampleColors: [],
      }
    }
  },
  mounted() {
    this.$onClickOutside(this.$refs.container, this.hideColorPicker);

    const ctx = this.$refs.canvas.getContext('2d');
    const i = new Image();
    i.onload = function() {
      ctx.drawImage(i, 0, 0);
    }

    i.src = "http://klendr.localhost/img/color-diagram.png";
    
    this.$ctx = ctx;
  },
  computed: {
    colorValue() {
      return this.value;
    }
  },
  methods: {
    log(event) {
      this.$emit('input', event);
    },
    colorInput() {
      return this.$refs['color-input'].value;
    },
    toggleOpen() {
      this.state.open = !this.state.open;
    },
    setColor(color) {
      this.$emit('input', color);
    },
    handleColorClick(event) {
      const canvas = this.$refs.canvas;
      const bounding = canvas.getBoundingClientRect();
      const offsetX = event.pageX - bounding.left;
      const offsetY = event.pageY - bounding.top;
      const imageData = this.$ctx.getImageData(Math.max(0, offsetX - 1), Math.max(offsetY - 1), 3, 3);
      const chunks = [ 
          [...imageData.data.slice(0, 3)].join(','), 
          [...imageData.data.slice(4, 7)].join(','), 
          [...imageData.data.slice(8, 11)].join(','),
          [...imageData.data.slice(16, 19)].join(','),
          [...imageData.data.slice(20, 23)].join(','),
        ];
      
      this.state.sampleColors = chunks.map(chunk => `rgb(${chunk})`);
    },
    hideColorPicker() {
      this.state.open = false;
    }
  }
}
</script>


<style>
  .p-15 { padding: 15px }
  .color-picker {
    position: relative;
    display: inline-block;
    background: #fff;
  }
  .color-preview {
    border: 1px solid #f1f1f1;
    padding: 3px;
    cursor: pointer;
    position: relative;
    z-index: 1;
  }
  .preview-color-box {
    width: 22px;
    height: 22px;
    display: block;
    box-shadow: inset 0 0 3px rgba(50, 50, 50, .1);
    position: relative;
    border: 2px solid rgba(241, 241, 241, 0);
    transition: .2s border-color;
  }
  .preview-color-box:hover {
    border-color: rgba(241, 241, 241, 1);
  }
  .pick-color {
    position: absolute;
    margin-top: 2px;
    top: 100%;
    left: 0;
    border: 1px solid #f1f1f1;
    background: #fff;
    z-index: 5;
  }
</style>
