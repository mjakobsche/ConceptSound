<template>
  <ion-grid style="height: 100%">
    <ion-row justify-content-center align-items-center style="height: 100%; flex-direction: column">
        <ion-button v-if="recordingStatus != state.beforeStop" size="large" shape="round" fill="outline" @click="begin()">
          <ion-icon v-if="recordingStatus == state.beforeStart" slot="icon-only" :icon="micOutline"></ion-icon>
          <ion-icon v-if="recordingStatus == state.beforeRetry" slot="icon-only" :icon="refresh"></ion-icon>
        </ion-button>
        <ion-button v-if="recordingStatus == state.beforeStop" size="large" shape="round" fill="outline"
          @click="finish()">
          <ion-icon slot="icon-only" :icon="stop"></ion-icon>
        </ion-button>
    </ion-row>
  </ion-grid>
</template>

<script setup lang="ts">
import { IonButton, IonGrid, IonRow, IonCol } from "@ionic/vue";
import { micOutline, refresh, stop } from "ionicons/icons";
import { RecordingData, VoiceRecorder } from "capacitor-voice-recorder";
import { ref, Ref } from "vue";

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
      emit('update:pageData', JSON.stringify(recording.value));
    })
    .catch(error => console.log(error))
}
</script>
