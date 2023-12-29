<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Biblioteka</ion-title>
        </ion-toolbar>
      </ion-header>
      <LibraryAddBook @add-book="(title) => addBook(title)"></LibraryAddBook>
      <div v-for="bookCover in library" :key="bookCover.id">
        <LibraryBook :book="bookCover" @rem="remBook(bookCover.id)" @set="openBook(bookCover)">
        </LibraryBook>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, } from "@ionic/vue";
import LibraryBook from "@/components/LibraryBook.vue";
import LibraryAddBook from "@/components/LibraryAddBook.vue";
import { addBook, library, remBook } from "@/service/LibraryService";
import {openBook} from "@/service/BookService";
</script>
