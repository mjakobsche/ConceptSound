<script setup lang="ts">
import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonInput,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/vue";
import {addCircleOutline, bookOutline, chevronForwardOutline, closeCircleOutline, filterOutline} from "ionicons/icons";
import {library, saveLibrary, setupLibraryService, tags} from "@/service/LibraryService";
import {setupBookService} from "@/service/BookService";
import {computed, Ref, ref} from "vue";
import router from "@/views/Router";
import {BookCover} from "@/model/BookCover";

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

let mode: "book" | "tag";
const alertInputs = [{name: "value", placeholder: "Nazwa"}];
const alertButtons = [
  {
    text: "Anuluj",
    handler: (data: { value: string }) => {
      data.value = "";
    },
  },
  {
    text: "Dodaj",
    handler: (data: { value: string }) => {
      const title = data.value;
      if (title.length != 0) {
        addBook(title)
      }
    },
  },
];

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
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button size="small">
          <ion-icon :icon="addCircleOutline"></ion-icon>
        </ion-fab-button>
        <ion-fab-list side="top">
          <ion-fab-button
              id="addBook"
              @click="mode = 'book';"
          >
            <ion-icon :icon="bookOutline"></ion-icon>
          </ion-fab-button>
        </ion-fab-list>
      </ion-fab>
      <ion-alert trigger="addBook" :inputs="alertInputs" :buttons="alertButtons">
      </ion-alert>
      <div v-for="bookCover in filteredLibrary" :key="bookCover.id">
        <ion-card>
          <IonCardContent>
            <ion-card-subtitle>{{ renderDate(bookCover.modificationDate) }}</ion-card-subtitle>
            <div class="bookMainPart">
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
            </div>
            <ion-card-subtitle v-if="bookCover.tags.length > 0">{{
                "#" + bookCover.tags.join(" #")
              }}
            </ion-card-subtitle>
          </IonCardContent>
        </ion-card>
      </div>
      <ion-modal ref="modal" :initial-breakpoint="0.5" :breakpoints="[0, 0.25, 0.5, 0.95]" :backdropDismiss="false"
                 :is-open="isFilterModalOpen" :onDidDismiss="closeFilterModal" :backdropBreakpoint="0.5">
        <ion-header>
          <ion-toolbar>
            <ion-title>Filtruj</ion-title>
            <slot></slot>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <IonInput label="Tytuł:" fill="outline" v-model="titleFilter"></IonInput>
          <div class="hashtagChips ion-margin-top">
            <div v-for="tag in tags" @click="toggleTag(tag)">
              <ion-chip :outline="true" :disabled="!tagFilter.includes(tag)">#{{ tag }}</ion-chip>
            </div>
          </div>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.hashtagChips {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}

.bookMainPart {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

ion-fab-button {
  --border-radius: 15px;
  --box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3),
  0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  --color: white;
}
</style>
