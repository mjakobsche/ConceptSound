<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Biblioteka</ion-title>
				</ion-toolbar>
			</ion-header>
			<LibraryAddBook @add-book="(title) => libraryStore.addBook(title)">
			</LibraryAddBook>
			<div v-for="book in library">
				<LibraryBook
					:book="book"
					@rem="libraryStore.remBook(book.id)"
					@set="bookStore.loadBook(book.id)"
				>
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
import { useCurrentBook } from "@/stores/currentBook";
import { useCurrentLibrary } from "@/stores/currentLibrary";
import { storeToRefs } from "pinia";
const bookStore = useCurrentBook();
const libraryStore = useCurrentLibrary();
const { library } = storeToRefs(libraryStore);
</script>
@/data/TranslationService @/stores/Book
