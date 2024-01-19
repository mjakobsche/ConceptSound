<script setup lang="ts">
import ABCJS from "abcjs";
import {onMounted, watch} from "vue";

const props = defineProps({
  pageId: {
    type: String,
    required: true,
  },
  pageData: {
    required: true,
    type: String,
  }
});

const containerElementId = 'notation' + props.pageId;

onMounted(() => {
  renderMusicNotation();
  watch(props, () => {
    renderMusicNotation();
  })
})

function renderMusicNotation() {
  if (props.pageData) {
    setAbcJs(props.pageData)
  }
}

function setAbcJs(notation: string) {
  ABCJS.renderAbc(containerElementId, notation, {
    scale: 0.5,
    responsive: "resize",
    staffwidth: 300,
    wrap: {minSpacing: 1.8, maxSpacing: 2.7, preferredMeasuresPerLine: 2},
    foregroundColor: "#d5c4a1",
    selectionColor: "#b8bb26",
    selectTypes: false
  });
}
</script>

<template>
  <div v-if="pageData.length > 0" :id="containerElementId"></div>
</template>

