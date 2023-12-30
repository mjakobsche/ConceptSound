<template>
  <ion-page>
    <SideMenu :name="'Filtruj'">
      <LibraryMenuContents v-model:book-title="filterCriteria.titlePart" v-model:book-tags="filterCriteria.tags" :global-tags="tags"></LibraryMenuContents>
    </SideMenu>
    <ion-header>
      <ion-toolbar>
        <ion-title>Biblioteka</ion-title>
        <ion-buttons slot="end">
          <ion-menu-toggle :auto-hide="false">
            <ion-button>
              <ion-icon :icon="filterOutline" slot="icon-only"></ion-icon>
            </ion-button>
          </ion-menu-toggle>
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
        <LibraryBook :book="bookCover" @rem="remBook(bookCover.id)" @set="openBook(bookCover)">
        </LibraryBook>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonIcon, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuToggle, IonButton } from "@ionic/vue";
import { filterOutline } from "ionicons/icons";
import LibraryBook from "@/components/LibraryBook.vue";
import LibraryAddBook from "@/components/LibraryAddBook.vue";
import {addBook, library, remBook, tags} from "@/service/LibraryService";
import {openBook} from "@/service/BookService";
import SideMenu from "@/components/SideMenu.vue";
import {computed, Ref, ref} from "vue";
import {BookCoverFilter} from "@/utils/BookCoverFilter";
import LibraryMenuContents from "@/components/LibraryMenuContents.vue";
const filterCriteria: Ref<BookCoverFilter> = ref(new BookCoverFilter());
const filteredLibrary = computed(() => {
  return library.value.filter((bookCover) => filterCriteria.value.matchesFilter(bookCover));
})
</script>

<style scoped>
ion-menu-button::part(icon){
}
</style>
