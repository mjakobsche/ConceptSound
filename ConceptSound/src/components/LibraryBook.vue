<template>
	<ion-card>
		<IonCardContent>
			<ion-card-subtitle>{{ renderDate(bookCover.date) }}</ion-card-subtitle>
			<div class="bookMainPart">
				<ion-card-title>{{ bookCover.title }}</ion-card-title>
				<div>
					<ion-button
						fill="clear"
						size="small"
						shape="round"
						@click="emit('rem', bookCover.id)"
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
import { PropType } from "vue";
import { BookCover } from "@/data/BookCover";

const emit = defineEmits(["rem", "set"]);
const props = defineProps({
	bookCover: {
		required: true,
		type: Object as PropType<BookCover>,
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
