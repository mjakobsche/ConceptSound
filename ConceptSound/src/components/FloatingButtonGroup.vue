<script setup lang="ts">
import {IonFab, IonFabList, IonIcon} from "@ionic/vue";
import {addCircleOutline} from "ionicons/icons";
import FloatingButton from "@/components/FloatingButton.vue";
</script>

<template>
  <ion-fab vertical="bottom" horizontal="end" slot="fixed">
    <floating-button size="small">
      <ion-icon :icon="addCircleOutline"></ion-icon>
    </floating-button>
    <ion-fab-list side="top">
      <slot></slot>
    </ion-fab-list>
  </ion-fab>
</template>