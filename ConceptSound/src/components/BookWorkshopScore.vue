<script setup lang="ts">
import {IonTextarea} from "@ionic/vue";
import {Ref, ref} from "vue";

defineProps(['pageData']);
const emit = defineEmits(['update:pageData', 'saveProgress'])

const changesCounter: Ref<number> = ref(0);

function updatePage(data: string) {
  changesCounter.value++;
  emit('update:pageData', data);
  saveProgress(3);
}

function saveProgress(requiredChanges: number) {
  if (changesCounter.value > requiredChanges) {
    emit("saveProgress");
    changesCounter.value = 0;
  }
}
</script>

<template>
  <ion-textarea v-bind:value="pageData" :auto-grow="true" @input="updatePage($event.target.value)"></ion-textarea>
</template>

