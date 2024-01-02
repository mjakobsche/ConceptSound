<template>
  <IonTextarea v-bind:value="pageData" inputmode="email" :auto-grow="true" v-on:input="updatePage($event.target.value)"></IonTextarea>
</template>

<script setup lang="ts">
import {IonTextarea} from "@ionic/vue";
import {ref, Ref} from "vue";

defineProps(['pageData']);
const emit = defineEmits(['update:pageData', 'saveProgress'])

const changesCounter: Ref<number> = ref(0);

function updatePage(data: string){
  changesCounter.value++;
  emit('update:pageData', data);
  if(changesCounter.value > 10){
    emit("saveProgress");
    changesCounter.value = 0;
  }
}
</script>
