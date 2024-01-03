<script setup lang="ts">
import {
  IonButton,
  IonButtons,
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
import {library, saveLibrary, setupLibraryService, tags} from "@/service/LibraryService";
import {setupBookService} from "@/service/BookService";
import {computed, Ref, ref} from "vue";
import router from "@/views/Router";
import {BookCover} from "@/model/BookCover";
import FloatingButtonGroup from "@/components/FloatingButtonGroup.vue";
import FloatingButton from "@/components/FloatingButton.vue";
import AddAlert from "@/components/AddAlert.vue";
import HashtagChips from "@/components/HashtagChips.vue";
import InlineElements from "@/components/InlineElements.vue";
import Modal from "@/components/Modal.vue";
import HeaderToolbar from "@/components/HeaderToolbar.vue";

//initialization
setupLibraryService();

//modal
const isFilterModalOpen: Ref<boolean> = ref(false);
const openFilterModal = () => isFilterModalOpen.value = true;
const closeFilterModal = () => isFilterModalOpen.value = false;

//filtration
const titleFilter: Ref<string> = ref("");
const tagFilter: Ref<string[]> = ref([]);

const filteredLibrary = computed(() => {
  return library.value.filter((bookCover) => matchesFilter(bookCover));
})

function matchesFilter(bookCover: BookCover): boolean {
  return bookCover.title.toLowerCase().indexOf(titleFilter.value) != -1 && tagFilter.value.every((tag) => bookCover.tags.includes(tag));
}

function toggleTag(tag: string) {
  if (tagFilter.value.includes(tag)) {
    tagFilter.value.splice(tagFilter.value.indexOf(tag), 1);
  } else {
    tagFilter.value.push(tag);
  }
}

function renderDate(date: Date): string {
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth() + 1;

  return `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month}`;
}

//operations
function addBook(title: string) {
  library.value.unshift(new BookCover(title));
  saveLibrary();
}

function remBook(id: string) {
  library.value.splice(library.value.findIndex((bookCover: BookCover) => bookCover.id === id), 1)
  saveLibrary();
}

async function openBook(book) {
  closeFilterModal();
  await setupBookService(book);
  await router.push("/book");
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
      <floating-button-group>
        <floating-button id="addBook">
          <ion-icon :icon="bookOutline"></ion-icon>
        </floating-button>
      </floating-button-group>
      <add-alert :trigger="'addBook'" @add="(bookTitle) => addBook(bookTitle)"></add-alert>
      <div v-for="bookCover in filteredLibrary" :key="bookCover.id">
        <ion-card>
          <ion-card-content>
            <ion-card-subtitle>{{ renderDate(bookCover.modificationDate) }}</ion-card-subtitle>
            <inline-elements>
              <ion-card-title>{{ bookCover.title }}</ion-card-title>
              <div>
                <ion-button
                    fill="clear"
                    size="small"
                    shape="round"
                    @click="remBook(bookCover.id)"
                >
                  <ion-icon slot="icon-only" :icon="closeCircleOutline"></ion-icon>
                </ion-button>
                <ion-button
                    fill="clear"
                    size="small"
                    shape="round"
                    @click="openBook(bookCover)"
                >
                  <ion-icon slot="icon-only" :icon="chevronForwardOutline"></ion-icon>
                </ion-button>
              </div>
            </inline-elements>
            <ion-card-subtitle v-if="bookCover.tags.length > 0">{{
                "#" + bookCover.tags.join(" #")
              }}
            </ion-card-subtitle>
          </ion-card-content>
        </ion-card>
      </div>
      <modal :is-open="isFilterModalOpen" :on-dismiss="closeFilterModal">
        <ion-header>
          <ion-toolbar>
            <ion-title>Filtruj</ion-title>
            <slot></slot>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <IonInput label="Tytuł:" fill="outline" v-model="titleFilter"></IonInput>
          <hashtag-chips :all-tags="tags" :selected-tags="tagFilter"
                         @toggle-tag="(tag) => toggleTag(tag)"></hashtag-chips>
        </ion-content>
      </modal>
    </ion-content>
  </ion-page>
</template>