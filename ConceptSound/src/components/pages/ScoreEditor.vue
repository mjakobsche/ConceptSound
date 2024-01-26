<script setup lang="ts">
import {IonTextarea} from "@ionic/vue";

defineProps(['pageData']);
defineEmits(['saveChanges'])
</script>

<template>
  <ion-textarea v-bind:value="pageData" mode="md" :auto-grow="true" :autofocus="true" :fill="'outline'"
                @input="$emit('saveChanges', $event.target.value)"></ion-textarea>
</template>

