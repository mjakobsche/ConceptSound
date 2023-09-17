<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Biblioteka</ion-title>
        </ion-toolbar>
      </ion-header>
      <LibraryAddBook @add-book="(title) => addBook(title)"></LibraryAddBook>
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
import {getCurrentInstance} from "vue";
import {SQLiteHook} from "vue-sqlite-hook";

const sqlite: SQLiteHook = getCurrentInstance().appContext.config.globalProperties.$sqlite;
const res: any = await sqlite.echo("Hello from echo");
console.log(res);
</script>
