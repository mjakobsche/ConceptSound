<script setup lang="ts">
import {IonGrid, IonRow} from "@ionic/vue";
</script>

<template>
  <ion-grid class="gridElements">
    <ion-row justify-content-center align-items-center class="gridElements">
      <slot></slot>
    </ion-row>
  </ion-grid>
</template>

<style scoped>
.gridElements {
  height: 100%;
  flex-direction: column;
}
</style>