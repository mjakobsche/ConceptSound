<template>
	<IonTextarea :value="props.pageData"></IonTextarea>
</template>

<script setup lang="ts">
import { IonTextarea } from "@ionic/vue";
const props = defineProps({
	pageData: {
		type: String,
		required: true,
	},
});
</script>
