<script setup lang="ts">
import {IonTextarea} from "@ionic/vue";
import {ref, Ref} from "vue";

defineProps(['pageData']);
const emit = defineEmits(['update:pageData', 'saveChanges'])

const changesCounter: Ref<number> = ref(0);

function autoSaveProgress(data: string) {
  if (changesCounter.value++ == 5) {
    emit('saveChanges', data);
    changesCounter.value = 0;
  }
}

</script>

<template>
  <ion-textarea v-bind:value="pageData" :autofocus="true" :fill="'outline'" inputmode="email" :auto-grow="true"
                @input="autoSaveProgress($event.target.value)"
                @focusout="$emit('saveChanges', $event.target.value)"></ion-textarea>
</template>

