<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Biblioteka</ion-title>
        </ion-toolbar>
      </ion-header>
      <LibraryAddBook v-if="BTTN" @add-book="(title) => addBook(title)"></LibraryAddBook>
      <div v-for="book in library" :key="book.id">
        <LibraryBook
            :book="book"
            @rem="remBook(book.id)"
            @set="openBook(book.id)"
        >
        </LibraryBook>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar,} from "@ionic/vue";
import LibraryBook from "@/components/LibraryBook.vue";
import LibraryAddBook from "@/components/LibraryAddBook.vue";
import {addBook, library, openBook, remBook} from "@/service/LibraryService";
import {Ref, ref} from "vue";

const BTTN: Ref<boolean> = ref(false);

isStoragePersisted();

async function persist() {
  return await navigator.storage && navigator.storage.persist &&
      navigator.storage.persist();
}

async function isStoragePersisted() {
  return await navigator.storage && navigator.storage.persisted &&
      navigator.storage.persisted();
}

isStoragePersisted().then(async isPersisted => {
  if (isPersisted) {
    console.log(":) Storage is successfully persisted.");
    BTTN.value = true;
  } else {
    console.log(":( Storage is not persisted.");
    console.log("Trying to persist..:");
    if (await persist()) {
      console.log(":) We successfully turned the storage to be persisted.");
      BTTN.value = true;
    } else {
      console.log(":( Failed to make storage persisted");
    }
  }
})

</script>
