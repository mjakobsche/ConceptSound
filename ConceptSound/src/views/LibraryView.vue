<script setup lang="ts">
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/vue";
import {filterOutline} from "ionicons/icons";
import LibraryBook from "@/components/LibraryBook.vue";
import LibraryAddBook from "@/components/LibraryAddBook.vue";
import {addBook, library, remBook, tags} from "@/service/LibraryService";
import {setupBookService} from "@/service/BookService";
import {computed, Ref, ref} from "vue";
import LibraryFilters from "@/components/LibraryFilters.vue";
import router from "@/views/Router";
import {BookCover} from "@/model/BookCover";

const isFilterModalOpen: Ref<boolean> = ref(false);
const openFilterModal = () => isFilterModalOpen.value = true;
const closeFilterModal = () => isFilterModalOpen.value = false;

const titleFilter: Ref<string> = ref("");
const tagFilter: Ref<string[]> = ref([]);

function matchesFilter(bookCover: BookCover): boolean {
  return bookCover.title.toLowerCase().indexOf(titleFilter.value) != -1 && tagFilter.value.every((tag) => bookCover.tags.includes(tag));
}

const filteredLibrary = computed(() => {
  return library.value.filter((bookCover) => matchesFilter(bookCover));
})

async function openBook(book) {
  closeFilterModal();
  await setupBookService(book);
  await router.push("/book");
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar @click="openFilterModal">
        <ion-title>Biblioteka</ion-title>
        <ion-buttons slot="end">
          <ion-button :disabled="isFilterModalOpen">
            <ion-icon :icon="filterOutline" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <LibraryAddBook @add-book="(title) => addBook(title)"></LibraryAddBook>
      <div v-for="bookCover in filteredLibrary" :key="bookCover.id">
        <LibraryBook :book="bookCover" @rem="remBook(bookCover.id)" @set="openBook(bookCover) ">
        </LibraryBook>
      </div>
      <ion-modal ref="modal" :initial-breakpoint="0.5" :breakpoints="[0, 0.25, 0.5, 0.95]" :backdropDismiss="false"
                 :is-open="isFilterModalOpen" :onDidDismiss="closeFilterModal" :backdropBreakpoint="0.5">
        <LibraryFilters v-model:title-filter="titleFilter"
                        v-model:tag-filter="tagFilter"
                        :tags="tags">
        </LibraryFilters>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>