<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-title>Biblioteka</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Biblioteka</ion-title>
				</ion-toolbar>
			</ion-header>
			<ion-list>
				<LibraryBook v-for="book in Books" :book-data="book"></LibraryBook>
			</ion-list>
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonList,
} from "@ionic/vue";
import ListBooks from "@/data/ListBooks";
import LibraryBook from "@/components/LibraryBook.vue";
let Books = ref(ListBooks);
</script>

<style scoped>
/* #container {
	text-align: center;

	position: absolute;
	left: 0;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
} */
</style>
