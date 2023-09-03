<template>
  <ion-button v-if="recordingStatus != state.beforeStop" size="large" shape="round" fill="outline" @click="begin()">
    <ion-icon v-if="recordingStatus == state.beforeStart" slot="icon-only" :icon="micOutline"></ion-icon>
    <ion-icon v-if="recordingStatus == state.beforeRetry" slot="icon-only" :icon="refresh"></ion-icon>
  </ion-button>
  <ion-button v-if="recordingStatus == state.beforeStop" size="large" shape="round" fill="outline" @click="finish()">
    <ion-icon slot="icon-only" :icon="stop"></ion-icon>
  </ion-button>
  <ion-button v-if="recordingStatus == state.beforeRetry" size="large" shape="round" fill="outline" @click="play()">
    <ion-icon slot="icon-only" :icon="playOutline"></ion-icon>
  </ion-button>
</template>

<script setup lang="ts">
import {IonButton, IonIcon} from "@ionic/vue";
import {micOutline, playOutline, refresh, stop} from "ionicons/icons";
import {RecordingData, VoiceRecorder} from "capacitor-voice-recorder";
import {ref, Ref} from "vue";

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

const recordingStatus: Ref<state> = ref(props.pageData.length > 0 ? state.beforeRetry : state.beforeStart);
const recording: Ref<RecordingData> = ref({
  value: {
    recordDataBase64: "",
    msDuration: 0,
    mimeType: ""
  }
});
if (recordingStatus.value == state.beforeRetry) {
  recording.value = ref(JSON.parse(props.pageData));
}


function begin() {
  recordingStatus.value = state.beforeStop;
  VoiceRecorder.startRecording()
      .catch(error => console.log(error))
}

function finish() {
  recordingStatus.value = state.beforeRetry;
  VoiceRecorder.stopRecording()
      .then((result: RecordingData) => {
        recording.value = result;
        emit('update:pageData', JSON.stringify(recording.value));
      })
      .catch(error => console.log(error))
}

function play() {
  const audio = recording.value;
  const audioRef = new Audio(`data:${audio.value.mimeType};base64,${audio.value.recordDataBase64}`);
  audioRef.oncanplaythrough = () => audioRef.play();
  audioRef.load();
}
</script>
