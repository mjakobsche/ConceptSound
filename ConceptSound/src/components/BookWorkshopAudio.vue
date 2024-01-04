<script setup lang="ts">
import {IonButton, IonIcon} from "@ionic/vue";
import {micOutline, refresh, stop} from "ionicons/icons";
import {RecordingData, VoiceRecorder} from "capacitor-voice-recorder";
import {ref, Ref} from "vue";
import CenteringGrid from "@/components/CenteringGrid.vue";

const emit = defineEmits(['update:pageData', 'saveChanges'])
const props = defineProps({
  pageData: {
    type: String,
    required: true,
  },
});

enum RecordingState {
  beforeStart,
  beforeStop,
  beforeRetry
}

const recordingState: Ref<RecordingState> = ref(getDefaultRecordingState());

function getDefaultRecordingState() {
  return props.pageData && props.pageData.length > 0 ? RecordingState.beforeRetry : RecordingState.beforeStart
}

function startRecording() {
  VoiceRecorder.requestAudioRecordingPermission().then(result => {
    if (result.value) {
      recordingState.value = RecordingState.beforeStop;
      VoiceRecorder.startRecording()
    }
  })
}

function stopRecording() {
  VoiceRecorder.stopRecording().then((result: RecordingData) => {
    if (result.value) {
      recordingState.value = RecordingState.beforeRetry;
      emit('update:pageData', result.value.recordDataBase64);
      emit('saveChanges')
    }
  })
}
</script>

<template>
  <centering-grid>
    <ion-button v-if="recordingState != RecordingState.beforeStop" size="large" shape="round" fill="clear"
                @click="startRecording()">
      <ion-icon slot="icon-only"
                :icon="recordingState == RecordingState.beforeStart ? micOutline : refresh"></ion-icon>
    </ion-button>
    <ion-button v-else size="large" shape="round" fill="clear" @click="stopRecording()">
      <ion-icon slot="icon-only" :icon="stop"></ion-icon>
    </ion-button>
  </centering-grid>
</template>

