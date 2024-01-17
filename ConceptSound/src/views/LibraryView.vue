<script setup lang="ts">
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/vue";
import {filterOutline} from "ionicons/icons";
import {computed, Ref, ref} from "vue";
import router from "@/views/Router";
import BookCard from "@/components/books/BookCard.vue"
import FloatingButton from "@/components/FloatingButton.vue";
import AddAlert from "@/components/AddAlert.vue";
import HashtagChips from "@/components/books/HashtagChips.vue";
import Modal from "@/components/Modal.vue";
import {Filters} from "@/helpers/Filters";
import {useLibraryService} from "@/service/LibraryService";
import {useBookService} from "@/service/BookService";

const store = useLibraryService();
store.initLibrary();
const areFiltersOpen: Ref<boolean> = ref(false);
const openFilters = () => areFiltersOpen.value = true;
const closeFilters = () => areFiltersOpen.value = false;

const filters = new Filters();

const filteredLibrary = computed(() => {
  return store.library.filter((book) => filters.matchesFilter(book));
});

async function openBook(book) {
  closeFilters();
  useBookService().initBook(book);
  router.push("/book").then().then(() => store.moveToTop(book));
}

</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar @click="openFilters">
        <ion-title>Biblioteka</ion-title>
        <ion-buttons slot="end">
          <ion-button :disabled="areFiltersOpen">
            <ion-icon :icon="filterOutline" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <floating-button id="addBook">
      </floating-button>
      <add-alert :trigger="'addBook'" @add="(bookTitle) => store.addBook(bookTitle)"></add-alert>
      <div v-for="book in filteredLibrary" :key="book.id">
        <book-card :book="book" @open-book="openBook(book)">
        </book-card>
      </div>
      <modal :is-open="areFiltersOpen" :on-dismiss="closeFilters">
        <ion-header>
          <ion-toolbar>
            <ion-title>Filtruj</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <IonInput label="Tytuł:" fill="outline" v-model="filters.titleFilter.value"></IonInput>
          <hashtag-chips :selected-tags="filters.tagFilter.value"
                         @enable-tag="(tag) => filters.enableTag(tag)"
                         @disable-tag="(tag) => filters.disableTag(tag)"></hashtag-chips>
        </ion-content>
      </modal>
    </ion-content>
  </ion-page>
</template>
<style scoped>
</style>