<template>
	<ion-card>
		<IonCardContent>
			<ion-card-subtitle>{{ renderDate(book.date) }}</ion-card-subtitle>
			<div class="bookMainPart">
				<ion-card-title>{{ book.title }}</ion-card-title>
				<div>
					<ion-button
						fill="clear"
						size="small"
						shape="round"
						@click="emit('rem')"
					>
						<ion-icon slot="icon-only" :icon="closeCircleOutline"></ion-icon>
					</ion-button>
					<ion-button
						fill="clear"
						size="small"
						shape="round"
						@click="emit('set')"
						router-link="/book"
					>
						<ion-icon slot="icon-only" :icon="chevronForwardOutline"></ion-icon>
					</ion-button>
				</div>
			</div>
		</IonCardContent>
	</ion-card>
</template>

<script setup lang="ts">
import { chevronForwardOutline, closeCircleOutline } from "ionicons/icons";
import { IonIcon, IonButton } from "@ionic/vue";
import {
	IonCard,
	IonCardTitle,
	IonCardSubtitle,
	IonCardContent,
} from "@ionic/vue";
import { useCurrentLibrary } from "@/stores/currentLibrary";
import { storeToRefs } from "pinia";
const emit = defineEmits(["rem", "set"]);
const props = defineProps({
	id: {
		required: true,
		type: Number,
	},
});
const libraryStore = useCurrentLibrary();
const { getBook } = storeToRefs(libraryStore);
const book = getBook.value(props.id);

function renderDate(date: Date): string {
	const day = date.getDate();
	const month = date.getMonth() + 1;

	return `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month}`;
}
</script>

<style scoped>
.bookMainPart {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
@/data/BookCover
