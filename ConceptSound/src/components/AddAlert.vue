<script setup lang="ts">
import {IonAlert} from "@ionic/vue";

defineProps(["trigger"])
const emit = defineEmits(["add"])

const alertInputs = [{name: "value", placeholder: "Nazwa",}];
const alertButtons = [
  {
    text: "Dodaj",
    handler: (data) => {
      emit("add", data.value)
      data.value = "";
    },
  },
];
</script>

<template>
  <ion-alert :trigger="trigger" :inputs="alertInputs" :buttons="alertButtons">
  </ion-alert>
</template>