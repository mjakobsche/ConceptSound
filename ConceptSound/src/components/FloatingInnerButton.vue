<script setup lang="ts">
import {IonFabButton} from "@ionic/vue";
</script>

<template>
  <ion-fab-button>
    <slot></slot>
  </ion-fab-button>
</template>

<style scoped>
ion-fab-button {
  --border-radius: 15px;
  --background: #282828;

}
</style>
