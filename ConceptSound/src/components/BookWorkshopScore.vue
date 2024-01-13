<script setup lang="ts">
import {IonTextarea} from "@ionic/vue";
import {Ref, ref} from "vue";

defineProps(['pageData']);
const emit = defineEmits(['update:pageData', 'saveChanges'])

const changesCounter: Ref<number> = ref(0);

function updatePage(data: string) {
  changesCounter.value++;
  emit('saveChanges', data);
}

</script>

<template>
  <ion-textarea v-bind:value="pageData" :fill="'outline'" :auto-grow="true"
                @input="updatePage($event.target.value)"></ion-textarea>
</template>

