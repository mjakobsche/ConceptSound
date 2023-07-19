<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Biblioteka</ion-title>
				</ion-toolbar>
			</ion-header>
			<LibraryAddBook @add-book="(name) => modLibrary('add', name)">
			</LibraryAddBook>
			<div v-for="book in library">
				<LibraryBook
					:book="book"
					@rem="modLibrary('rem', book.id.toString())"
					@set="store.setName(book.name)">
				</LibraryBook>
			</div>
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
} from "@ionic/vue";
import LibraryBook from "@/components/LibraryBook.vue";
import LibraryAddBook from "@/components/LibraryAddBook.vue";
import { getLibrary, modLibrary } from "@/data/ServiceLibrary";
import { useCurrentMusicBook } from "@/stores/currentMusicBook";
const store = useCurrentMusicBook();
const library = getLibrary();
</script>

<style scoped>
.musicBoxMainBody {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
