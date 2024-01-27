<script setup lang="ts">
import {onMounted, watch} from "vue";
import WaveSurfer from "wavesurfer.js";

const props = defineProps({
  pageId: {
    type: String,
    required: true,
  },
  pageData: {
    type: String,
    required: true,
  },
});

const containerElementId = 'player' + props.pageId;
let wavesurfer: WaveSurfer;

onMounted(() => {
  updateRecording();
  watch(props, () => {
    updateRecording();
  })
})

function updateRecording() {
  if (props.pageData && props.pageData.length > 0) {
    setPlayer(props.pageData);
  }
}

function setPlayer(audio: string) {
  if (wavesurfer) {
    wavesurfer.destroy();
  }
  wavesurfer = WaveSurfer.create({
    container: '#' + containerElementId,
    waveColor: '#98971a',
    progressColor: '#b8bb26',
    cursorWidth: 4,
    barWidth: 3,
    barGap: 5,
    barRadius: 20,
    barHeight: 0.5,
    media: new Audio(`data:audio/webm;codecs=opus;base64,${audio}`)
  })
  wavesurfer.on('seeking', () => {
    wavesurfer.play()
  })
}
</script>

<template>
  <div style="height: 100%; width: 100%" :id="containerElementId"></div>
</template>

