<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>{{ book.title }}</ion-title>
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
					<BookVPage :page="element" @hide-page="hidePage(element.id)">
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
import { Page } from "@/data/Page";

const store = useCurrentBook();
const { bookId } = storeToRefs(store);

const book = getBook(bookId.value);

function addPage(type: string) {
	let page: Page = {
		id: book.content.length,
		type: type,
		name: "",
		data: type == "score" ? "X:1\nK:D\n" : "",
		hidden: false,
	};
	modBook(bookId.value, "add", page);
}

function hidePage(id: number) {
	let page: Page = book.content[id];
	page.hidden = !page.hidden;
	modBook(bookId.value, "swap", page);
}

function remPage(id: number) {
	let page: Page = book.content[id];
	modBook(bookId.value, "rem", page);
}
</script>
