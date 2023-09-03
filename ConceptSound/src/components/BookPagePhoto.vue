<template>
  <img v-if="data.length > 0" :src="data" alt="selected photo">
  <ion-button v-else expand="full" size="default" fill="outline">Otwórz ekran wyboru zdjęć</ion-button>
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
