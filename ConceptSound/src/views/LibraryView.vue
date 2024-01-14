<script setup lang="ts">
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/vue";
import {bookOutline, chevronForwardOutline, closeCircleOutline, filterOutline} from "ionicons/icons";
import {computed, onMounted, Ref, ref} from "vue";
import router from "@/views/Router";
import {Book} from "@/model/Book";
import FloatingButtonGroup from "@/components/FloatingOuterButton.vue";
import FloatingButton from "@/components/FloatingInnerButton.vue";
import AddAlert from "@/components/AddAlert.vue";
import HashtagChips from "@/components/HashtagChips.vue";
import InlineElements from "@/components/InlineElements.vue";
import Modal from "@/components/Modal.vue";
import HeaderToolbar from "@/components/HeaderToolbar.vue";
import CenteringGrid from "@/components/CenteringGrid.vue";
import {putToArray, ripFromArray} from "@/utils/ArrayHelper";
import {useBookService} from "@/service/BookService";
import {impact} from "@/composables/Impact";

const store = useBookService();
store.initLibrary();

const isFilterModalOpen: Ref<boolean> = ref(false);
const openFilterModal = () => isFilterModalOpen.value = true;
const closeFilterModal = () => isFilterModalOpen.value = false;

let removingBook = false;
const titleFilter: Ref<string> = ref("");
const tagFilter: Ref<string[]> = ref([]);

const filteredLibrary = computed(() => {
  return store.library.filter((book: Book) => matchesFilter(book));
});

function matchesFilter(bookCover: Book): boolean {
  return bookCover.title.toLowerCase().indexOf(titleFilter.value.toLowerCase()) != -1 && tagFilter.value.every((tag) => bookCover.tags.includes(tag));
}

function enableTag(tag: string) {
  putToArray(tagFilter.value, tag);
}

function disableTag(tag: string) {
  ripFromArray(tagFilter.value, tag)
}

function renderDate(date: Date): string {
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth() + 1;
  return `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month}`;
}

function removeBook(book: Book) {
  removingBook = true;
  impact();
  store.removeBook(book);
}

async function openBook(book) {
  if (!removingBook) {
    closeFilterModal();
    store.initBook(book);
    router.push("/book").then(() => store.moveToTop(book));
  } else {
    removingBook = false;
  }
}

</script>

<template>
  <ion-page>
    <ion-header>
      <header-toolbar :title="'Biblioteka'" @click="openFilterModal">
        <ion-button :disabled="isFilterModalOpen">
          <ion-icon :icon="filterOutline" slot="icon-only"></ion-icon>
        </ion-button>
      </header-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <floating-button-group id="addBook">
      </floating-button-group>
      <add-alert :trigger="'addBook'" @add="(bookTitle) => store.addBook(bookTitle)"></add-alert>
      <div v-for="book in filteredLibrary" :key="book.id">
        <ion-card @click="openBook(book)">
          <centering-grid v-if="book.cover.length > 0">
            <img :src="book.cover" alt="cover photo">
          </centering-grid>
          <ion-card-content>
            <ion-card-subtitle>{{ renderDate(book.modificationDate) }}</ion-card-subtitle>
            <inline-elements>
              <ion-card-title>{{ book.title }}</ion-card-title>
              <div>
                <ion-button
                    fill="clear"
                    size="small"
                    shape="round"
                    @click="removeBook(book)"
                >
                  <ion-icon slot="icon-only" :icon="closeCircleOutline"></ion-icon>
                </ion-button>
                <ion-button
                    fill="clear"
                    size="small"
                    shape="round"
                >
                  <ion-icon slot="icon-only" :icon="chevronForwardOutline"></ion-icon>
                </ion-button>
              </div>
            </inline-elements>
            <ion-card-subtitle v-if="book.tags.length > 0">{{
                "#" + book.tags.join(" #")
              }}
            </ion-card-subtitle>
          </ion-card-content>
        </ion-card>
      </div>
      <modal :is-open="isFilterModalOpen" :on-dismiss="closeFilterModal">
        <ion-header>
          <ion-toolbar>
            <ion-title>Filtruj</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <IonInput label="Tytuł:" fill="outline" v-model="titleFilter"></IonInput>
          <hashtag-chips :all-tags="store.tags" :selected-tags="tagFilter"
                         @enable-tag="(tag) => enableTag(tag)" @disable-tag="(tag) => disableTag(tag)"></hashtag-chips>
        </ion-content>
      </modal>
    </ion-content>
  </ion-page>
</template>
<style scoped>
img {
  object-fit: cover;
}
</style>