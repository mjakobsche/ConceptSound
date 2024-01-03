<script setup lang="ts">
import {IonTextarea} from "@ionic/vue";
import {ref, Ref} from "vue";

defineProps(['pageData']);
const emit = defineEmits(['update:pageData', 'saveProgress'])

const changesCounter: Ref<number> = ref(0);

function updatePage(data: string) {
  changesCounter.value++;
  emit('update:pageData', data);
  saveProgress(10);
}

function saveProgress(requiredChanges: number) {
  if (changesCounter.value > requiredChanges) {
    emit("saveProgress");
    changesCounter.value = 0;
  }
}
</script>

<template>
  <ion-textarea v-bind:value="pageData" inputmode="email" :auto-grow="true"
               @input="updatePage($event.target.value)"></ion-textarea>
</template>

