<template>
	<ion-item button detail lines="full">
		<ion-label>
			<p>{{ props.bookData.altered }}</p>
			<h2>{{ props.bookData.name }}</h2>
		</ion-label>
	</ion-item>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import Book from "@/model/Book";
import { IonItem, IonLabel } from "@ionic/vue";
let props = defineProps({
	bookData: {
		type: Object as PropType<Book>,
		required: true,
	},
});
</script>

<style scoped></style>
