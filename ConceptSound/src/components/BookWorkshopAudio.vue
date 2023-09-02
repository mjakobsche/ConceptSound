<template>
  <!--  <IonTextarea :value="pageData" @input="$emit('update:pageData', $event.target.value)"></IonTextarea>-->
  <ion-button fill="clear" @click="record()">
    <ion-icon slot="icon-only" :icon="micCircleOutline"></ion-icon>
  </ion-button>
  <ion-button fill="clear" @click="stop()">
    <ion-icon slot="icon-only" :icon="stopCircleOutline"></ion-icon>
  </ion-button>
</template>

<script setup lang="ts">
import {IonButton, IonIcon} from "@ionic/vue";
import {micCircleOutline, stopCircleOutline} from "ionicons/icons";
import {GenericResponse, RecordingData, VoiceRecorder} from "capacitor-voice-recorder";

defineEmits(['update:pageData'])
defineProps(['pageData']);

function record() {
  VoiceRecorder.startRecording()
      .then((result: GenericResponse) => console.log(result.value))
      .catch(error => console.log(error))
}

function stop() {
  VoiceRecorder.stopRecording()
      .then((result: RecordingData) => {
        const audioRef = new Audio(`data:${result.value.mimeType};base64,${result.value.recordDataBase64}`)
        audioRef.oncanplaythrough = () => audioRef.play()
        audioRef.load()
      })
      .catch(error => console.log(error))

}


</script>
