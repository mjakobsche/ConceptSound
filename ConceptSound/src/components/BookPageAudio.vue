<template>
  <ion-button expand="full" size="default" fill="outline">Otwórz ekran nagrywania</ion-button>
</template>

<script setup lang="ts">
import {IonButton} from "@ionic/vue";

defineProps({
  data: {
    required: true,
    type: String,
  },
});
</script>
