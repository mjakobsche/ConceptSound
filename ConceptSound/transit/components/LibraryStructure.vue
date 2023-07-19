<template>
	<LibraryCreateElement @new-music-book="(name) => addMusicBook(name)">
	</LibraryCreateElement>
	<ion-card v-for="musicBook in musicBooks">
		<IonCardContent>
			<ion-card-subtitle>{{
				getDayAndMonth(musicBook.date)
			}}</ion-card-subtitle>
			<div class="musicBoxMainBody">
				<ion-card-title>{{ musicBook.name }}</ion-card-title>
				<LibraryEditElement
					@open="store.setName(musicBook.name)"
					@remove="removeMusicBook(musicBook.id)"></LibraryEditElement>
			</div>
		</IonCardContent>
	</ion-card>
</template>

<script setup lang="ts">
import LibraryCreateElement from "./LibraryCreateElement.vue";
import LibraryEditElement from "./LibraryEditElement.vue";
import { Ref, ref } from "vue";
import { useCurrentMusicBook } from "@/stores/currentMusicBook";
import {
	IonCard,
	IonCardContent,
	IonCardSubtitle,
	IonCardTitle,
} from "@ionic/vue";
const store = useCurrentMusicBook();
type MusicBook = {
	id: number;
	name: string;
	date: Date;
};

let musicBookCounter = 0;
let musicBooks: Ref<MusicBook[]> = ref([
	{ id: musicBookCounter++, name: "Seven Odes to Belobog", date: new Date() },
	{ id: musicBookCounter++, name: "Scherzo", date: new Date() },
]);

function addMusicBook(name: string) {
	musicBooks.value.push({
		id: musicBookCounter,
		name: name,
		date: new Date(),
	});

	musicBookCounter++;
}

function removeMusicBook(id: number) {
	musicBooks.value = musicBooks.value.filter((t) => t.id !== id);
}

function getDayAndMonth(date: Date): string {
	const day = date.getDate();
	const month = date.getMonth() + 1;

	return `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month}`;
}

function sort() {
	musicBooks.value = musicBooks.value.sort(
		(a, b) => b.date.getTime() - a.date.getTime()
	);
}
</script>

<style scoped>
.musicBoxMainBody {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
