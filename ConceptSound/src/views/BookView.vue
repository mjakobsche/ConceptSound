<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>{{ book.title }}</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<BookAddPage @add-page="(type) => bookStore.addPage(type)" />
			<Sortable
				:list="book.content"
				item-key="id"
				:options="{ handle: '.handle' }"
			>
				<template #item="{ element }">
					<BookVPage :id="element.id">
						<component :is="'BookPage' + element.type"></component>
					</BookVPage>
				</template>
			</Sortable>
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
import BookAddPage from "@/components/BookAddPage.vue";
import BookVPage from "@/components/BookVPage.vue";
import { storeToRefs } from "pinia";
import { useCurrentBook } from "@/stores/currentBook";
import { Sortable } from "sortablejs-vue3";

const bookStore = useCurrentBook();
const { book } = storeToRefs(bookStore);
</script>
@/stores/Book
