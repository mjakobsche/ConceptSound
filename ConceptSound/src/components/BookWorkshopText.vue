<script setup lang="ts">
import {IonTextarea} from "@ionic/vue";

defineProps(['pageData']);
defineEmits(['saveChanges'])

</script>

<template>
  <ion-textarea v-bind:value="pageData" :autofocus="true" :fill="'outline'" inputmode="email" :auto-grow="true"
                @input="$emit('saveChanges', $event.target.value)"
  ></ion-textarea>
</template>

