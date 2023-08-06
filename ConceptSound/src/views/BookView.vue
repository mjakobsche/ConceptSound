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
				:options="{
					handle: '.handle',
					draggable: '.element',
				}"
				@end="(event: SortableJs.SortableEvent) => {bookStore.swapPage(event.oldIndex, event.newIndex)} "
			>
				<template #item="{ element }">
					<BookVPage
						:page="element"
						:editable="workshopIsOpen"
						@set-hidden="bookStore.hidePage(element.id)"
						@mod-page="openWorkshop(element)"
						@rem-page="bookStore.remPage(element.id)"
					>
						<component
							:is="'BookPage' + element.type"
							:data="element.data"
						></component>
					</BookVPage>
				</template>
			</Sortable>
			<ion-modal
				ref="modal"
				:initial-breakpoint="0.95"
				:breakpoints="[0.5, 0.95]"
				:backdropDismiss="false"
				:is-open="workshopIsOpen"
				:backdropBreakpoint="0.5"
			>
				<BookVWorkshop
					:page-name="workshopPage.name"
					@save-page="workshopIsOpen = false"
				>
					<component
						:is="'BookWorkshop' + workshopPage.type"
						:page-data="workshopPage.data"
					></component>
				</BookVWorkshop>
			</ion-modal>
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
	IonModal,
} from "@ionic/vue";
import BookAddPage from "@/components/BookAddPage.vue";
import BookVPage from "@/components/BookVPage.vue";
import { storeToRefs } from "pinia";
import { useCurrentBook } from "@/stores/currentBook";
import SortableJs from "sortablejs";
import { Sortable } from "sortablejs-vue3";
import BookVWorkshop from "@/components/BookVWorkshop.vue";
import { ref, Ref } from "vue";
import { Page } from "@/data/Page";
import { emptyPage } from "@/errors/emptyPage";
const bookStore = useCurrentBook();
const { book } = storeToRefs(bookStore);
const workshopIsOpen = ref(false);
const workshopPage: Ref<Page> = ref(emptyPage);

function openWorkshop(page: Page) {
	workshopPage.value = page;
	workshopIsOpen.value = true;
}
</script>
@/stores/Book
