<template>
  <div style="height: 100%; width: 100%" id="player"></div>
</template>

<script setup lang="ts">
import {onMounted, Ref, ref, watch} from "vue";
import {RecordingData} from "capacitor-voice-recorder";
import WaveSurfer from "wavesurfer.js";

const props = defineProps({
  data: {
    type: String,
    required: true,
  },
});

let wavesurfer: WaveSurfer;
const recording: Ref<RecordingData> = ref({
  value: {
    recordDataBase64: "",
    msDuration: 0,
    mimeType: ""
  }
});
watch(() => props.data, async () => {
  updateRecording();
})
onMounted(() => {
  updateRecording();
})

function updateRecording() {
  if (props.data && props.data.length > 0) {
    recording.value = JSON.parse(props.data);
    setPlayer();
  }
}

function setPlayer() {
  console.log(recording.value.value.mimeType);

  if (wavesurfer) {
    wavesurfer.destroy();
  }
  wavesurfer = WaveSurfer.create({
    container: '#player',
    waveColor: '#428cff',
    progressColor: '#50c8ff',
    cursorWidth: 4,
    barWidth: 3,
    barGap: 5,
    barRadius: 20,
    barHeight: 0.5,
    media: new Audio(`data:${recording.value.value.mimeType};base64,${recording.value.value.recordDataBase64}`)
  })
  wavesurfer.on('interaction', () => {
    wavesurfer.play()
  })
}
</script>
