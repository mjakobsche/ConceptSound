<template>
	<ion-card>
		<IonCardContent>
			<ion-card-subtitle>{{ renderDate(props.book.date) }}</ion-card-subtitle>
			<div class="bookMainPart">
				<ion-card-title>{{ props.book.name }}</ion-card-title>
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
import type { PropType } from "vue";
import { Book } from "@/data/Book";
const emit = defineEmits(["rem", "set"]);
const props = defineProps({
	book: {
		type: Object as PropType<Book>,
		required: true,
	},
});

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
