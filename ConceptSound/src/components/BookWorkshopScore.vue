<script setup lang="ts">
import {IonTextarea} from "@ionic/vue";
import {Ref, ref} from "vue";

defineProps(['pageData']);
const emit = defineEmits(['update:pageData', 'saveChanges'])

const changesCounter: Ref<number> = ref(0);

function updatePage(data: string) {
  changesCounter.value++;
  emit('update:pageData', data);
  saveChanges(3);
}

function saveChanges(requiredChanges: number) {
  if (changesCounter.value > requiredChanges) {
    emit("saveChanges");
    changesCounter.value = 0;
  }
}
</script>

<template>
  <ion-textarea v-bind:value="pageData" :auto-grow="true" @focusout="$emit('saveChanges')"
                @input="updatePage($event.target.value)"></ion-textarea>
</template>

