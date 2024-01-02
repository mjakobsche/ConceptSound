<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Biblioteka</ion-title>
        <ion-buttons slot="end">
            <ion-button id="openFilter">
              <ion-icon :icon="filterOutline" slot="icon-only"></ion-icon>
            </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Biblioteka</ion-title>
        </ion-toolbar>
      </ion-header>
      <LibraryAddBook @add-book="(title) => addBook(title)"></LibraryAddBook>
      <div v-for="bookCover in filteredLibrary" :key="bookCover.id">
        <LibraryBook :book="bookCover" @rem="remBook(bookCover.id)" @set="openBook(bookCover) ">
        </LibraryBook>
      </div>
      <ion-modal ref="modal" :initial-breakpoint="0.5" :breakpoints="[0, 0.25, 0.5, 0.95]" :backdropDismiss="true" trigger="openFilter"
                 :is-open="filtersModalIsOpen" :ion-modal-did-dismiss="filtersModalIsOpen = false" :backdropBreakpoint="1">
        <LibraryFilters v-model:book-title="filterCriteria.titlePart" :name="'Filtruj'" v-model:book-tags="filterCriteria.tags"
                        :global-tags="tags"></LibraryFilters>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

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
import {openBook} from "@/service/BookService";
import {computed, Ref, ref} from "vue";
import {BookCoverFilter} from "@/utils/BookCoverFilter";
import LibraryFilters from "@/components/LibraryFilters.vue";

const filterCriteria: Ref<BookCoverFilter> = ref(new BookCoverFilter());
const filteredLibrary = computed(() => {
  return library.value.filter((bookCover) => filterCriteria.value.matchesFilter(bookCover));
})


const filtersModalIsOpen = ref(false);
</script>

<style scoped>
ion-menu-button::part(icon) {
}
</style>
