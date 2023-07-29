<template>{{ data }}</template>

<script setup lang="ts">
import { IonInput } from "@ionic/vue";
const props = defineProps({
	data: {
		required: true,
		type: String,
	},
});
</script>
