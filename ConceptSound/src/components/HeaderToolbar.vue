<script setup lang="ts">
import {IonToolbar, IonTitle, IonButtons} from "@ionic/vue";

defineProps(["title"])
defineEmits(["click"])
</script>

<template>
  <ion-toolbar @click="$emit('click')">
    <ion-title>{{title}}</ion-title>
    <ion-buttons slot="end">
      <slot></slot>
    </ion-buttons>
  </ion-toolbar>
</template>