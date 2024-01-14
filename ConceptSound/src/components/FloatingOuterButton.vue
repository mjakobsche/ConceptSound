<script setup lang="ts">
import {IonFab, IonIcon} from "@ionic/vue";
import {addCircleOutline} from "ionicons/icons";
import FloatingButton from "@/components/FloatingInnerButton.vue";
</script>

<template>
  <ion-fab vertical="bottom" horizontal="end" slot="fixed">
    <floating-button size="small">
      <ion-icon :icon="addCircleOutline"></ion-icon>
    </floating-button>
    <slot></slot>
  </ion-fab>
</template>

<style scoped>
ion-fab-button{
  --color: #ebdbb2;
  --background: #d65d0e;
}
</style>