<script setup lang="ts">
import {IonFabButton, IonIcon, IonFabList} from "@ionic/vue";
import {imageOutline, languageOutline, micOutline, musicalNoteOutline} from "ionicons/icons";

const emit = defineEmits(["addPage"])
const addPage = (pageType: string) => emit("addPage", pageType);
</script>

<template>
  <ion-fab-list side="start">
    <ion-fab-button @click="addPage('text')">
      <ion-icon :icon="languageOutline"></ion-icon>
    </ion-fab-button>
    <ion-fab-button @click="addPage('score')">
      <ion-icon :icon="musicalNoteOutline"></ion-icon>
    </ion-fab-button>
    <ion-fab-button @click="addPage('audio')">
      <ion-icon :icon="micOutline"></ion-icon>
    </ion-fab-button>
    <ion-fab-button @click="addPage('photo')">
      <ion-icon :icon="imageOutline"></ion-icon>
    </ion-fab-button>
  </ion-fab-list>
</template>

<style scoped>
ion-fab-button {
  --border-radius: 15px;
  --background: #282828;
}
</style>
