<template>
  <IonTextarea :value="pageData" inputmode="email" :auto-grow="true" @input="$emit('update:pageData', $event.target.value)"></IonTextarea>
</template>

<script setup lang="ts">
import {IonTextarea} from "@ionic/vue";

defineEmits(['update:pageData'])
defineProps(['pageData']);
</script>
