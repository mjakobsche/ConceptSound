<script setup lang="ts">
import {IonToolbar, IonTitle, IonButtons} from "@ionic/vue";

defineProps(["title"])
</script>

<template>
  <ion-toolbar>
    <ion-title>{{title}}</ion-title>
    <ion-buttons slot="end">
      <slot></slot>
    </ion-buttons>
  </ion-toolbar>
</template>