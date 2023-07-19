<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>{{ book.name }}</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<BookAddPage @add-page="(pageType) => addPage(pageType)" />
			<Sortable
				:list="book.content"
				item-key="id"
				:options="{ handle: '.handle' }"
			>
				<template #item="{ element }">
					<BookVPage>
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
import { getBook, modBook } from "@/data/ServiceLibrary";
import { Sortable } from "sortablejs-vue3";

const store = useCurrentBook();
const { bookId } = storeToRefs(store);

const book = getBook(bookId.value);

function addPage(type: string) {
	let args = [type, ""];
	if (type == "Score") {
		args[1] = "X:1\nK:D\n";
	}
	modBook(bookId.value, "add", args);
}
</script>
