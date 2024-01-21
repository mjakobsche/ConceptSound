<script setup lang="ts">
import {IonFab, IonFabButton, IonIcon} from "@ionic/vue";
import {addCircleOutline} from "ionicons/icons";
</script>

<template>
  <ion-fab vertical="bottom" horizontal="end" slot="fixed">
    <ion-fab-button size="small">
      <ion-icon :icon="addCircleOutline"></ion-icon>
    </ion-fab-button>
    <slot></slot>
  </ion-fab>
</template>
