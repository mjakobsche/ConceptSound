<template>
  <ion-button v-if="recordingStatus != state.beforeStop" size="large" shape="round" fill="outline" @click="begin()">
    <ion-icon v-if="recordingStatus == state.beforeStart" slot="icon-only" :icon="micOutline"></ion-icon>
    <ion-icon v-if="recordingStatus == state.beforeRetry" slot="icon-only" :icon="refresh"></ion-icon>
  </ion-button>
  <ion-button v-if="recordingStatus == state.beforeStop" size="large" shape="round" fill="outline" @click="finish()">
    <ion-icon slot="icon-only" :icon="stop"></ion-icon>
  </ion-button>
  <div id="player"></div>
</template>

<script setup lang="ts">
import {IonButton, IonIcon} from "@ionic/vue";
import {micOutline, refresh, stop} from "ionicons/icons";
import {RecordingData, VoiceRecorder} from "capacitor-voice-recorder";
import {onMounted, ref, Ref} from "vue";
import WaveSurfer from "wavesurfer.js";

const emit = defineEmits(['update:pageData'])
const props = defineProps({
  pageData: {
    type: String,
    required: true,
  },
});

enum state {
  beforeStart,
  beforeStop,
  beforeRetry
}

let wavesurfer: WaveSurfer;
const recordingStatus: Ref<state> = ref(props.pageData.length > 0 ? state.beforeRetry : state.beforeStart);
const recording: Ref<RecordingData> = ref({
  value: {
    recordDataBase64: "",
    msDuration: 0,
    mimeType: ""
  }
});


onMounted(() => {
  if (recordingStatus.value == state.beforeRetry) {
    recording.value = JSON.parse(props.pageData);
    setPlayer();
  }
})


function begin() {
  VoiceRecorder.requestAudioRecordingPermission().then(result => {
    if (result.value) {
      recordingStatus.value = state.beforeStop;
      VoiceRecorder.startRecording()
    }
  })
}

function finish() {
  recordingStatus.value = state.beforeRetry;
  VoiceRecorder.stopRecording()
      .then((result: RecordingData) => {
        recording.value = result;
        setPlayer();
        emit('update:pageData', JSON.stringify(recording.value));
      })
      .catch(error => console.log(error))
}

function setPlayer() {
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