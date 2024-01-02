<template>
  <IonTextarea v-bind:value="pageData" :auto-grow="true" v-on:input="updatePage($event.target.value)"></IonTextarea>
</template>

<script setup lang="ts">
import {IonTextarea} from "@ionic/vue";
import {Ref, ref} from "vue";

defineProps(['pageData']);
const emit = defineEmits(['update:pageData', 'saveProgress'])

const changesCounter: Ref<number> = ref(0);

function updatePage(data: string){
  changesCounter.value++;
  emit('update:pageData', data);
  if(changesCounter.value > 3){
    emit("saveProgress");
    changesCounter.value = 0;
  }
}
</script>
