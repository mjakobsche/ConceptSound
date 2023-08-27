<template>
	<IonTextarea :value="pageData" @input="$emit('update:pageData', $event.target.value)"></IonTextarea>
</template>

<script setup lang="ts">
import { IonTextarea } from "@ionic/vue";
defineEmits(['update:pageData'])
defineProps(['pageData']);
</script>
