<template>
  <div :id="containerElementId"></div>
</template>

<script setup lang="ts">
import ABCJS from "abcjs";
import {onMounted, watch} from "vue";

const props = defineProps({
  data: {
    required: true,
    type: String,
  },
  pageId: {
    type: String,
    required: true,
  },
});

const containerElementId = 'notation' + props.pageId;

onMounted(() => {
  render();
})
watch(props, () => {
  render();
})

function render() {
  if (props.data) {
    ABCJS.renderAbc(containerElementId, props.data, {
      scale: 0.5,
      responsive: "resize",
      staffwidth: 300,
      wrap: {minSpacing: 1.8, maxSpacing: 2.7, preferredMeasuresPerLine: 2},
    });
  }
}
</script>
