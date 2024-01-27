<script setup lang="ts">
import {IonModal} from "@ionic/vue";

defineProps(["isOpen", "onDismiss"])
</script>

<template>
  <ion-modal ref="modal" :handle="false" :initial-breakpoint="0.5" :breakpoints="[0, 0.35, 0.5, 1]" :backdropDismiss="false"
             :is-open="isOpen" :onDidDismiss="onDismiss" :backdropBreakpoint="0.5">
    <slot></slot>
  </ion-modal>
</template>