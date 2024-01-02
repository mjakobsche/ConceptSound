<script setup lang="ts">
import {
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonInput,
  IonMenu,
  IonMenuToggle,
  IonModal,
  IonPage,
  IonRouterOutlet,
  IonTitle,
  IonToolbar
} from "@ionic/vue";
import BookVPage from "@/components/BookVPage.vue";
import {bookCover, bookPages, savePages,} from "@/service/BookService";
import {saveLibrary, tags} from "@/service/LibraryService";
import SortableJs from "sortablejs";
import {Sortable} from "sortablejs-vue3";
import {ref, Ref} from "vue";
import {BookPage} from "@/model/BookPage";
import {
  addCircleOutline,
  imageOutline,
  languageOutline,
  menuOutline,
  micOutline,
  musicalNoteOutline
} from "ionicons/icons";

const isWorkshopModalOpen = ref(false);
const workshopPage: Ref<BookPage> = ref(bookPages[0]);

const openWorkshopModal = (page) => {
  isWorkshopModalOpen.value = true;
  workshopPage.value = page;
}

const closeWorkshopModal = () => {
  isWorkshopModalOpen.value = false;
  savePages();
};

function addTag(tag: string): void {
  if (findTagIndex(tag) === -1) {
    bookCover.value.tags.unshift(tag);
    saveLibrary();
  }
}

function findTagIndex(tag: string): number {
  return bookCover.value.tags.indexOf(tag);
}

function addPage(type: string): void {
  putPage(new BookPage(type), 0);
  savePages();
}

function hidePage(id: string): void {
  const pageNumber: number = findPageNumber(id);
  const page: BookPage = ripPage(pageNumber);
  page.hidden = !page.hidden;
  putPage(page, pageNumber);
  savePages();
}

function remPage(id: string): void {
  ripPage(findPageNumber(id));
  savePages();
}

function swapPage(from = 0, to = 0): void {
  putPage(ripPage(from), to);
  savePages();
}

function findPageNumber(id: string): number {
  return bookPages.value.findIndex((bookPage: BookPage) => bookPage.id == id);
}

function ripPage(pageNumber: number): BookPage {
  return bookPages.value.splice(pageNumber, 1)[0];
}

function putPage(page: BookPage, pageNumber: number): void {
  bookPages.value.splice(pageNumber, 0, page);
}

const newTag = ref("");

function toggleTag(selectedTag: string) {
  const tagIndex = findTagIndex(selectedTag);
  if (tagIndex === -1) {
    addTag(selectedTag)
    newTag.value = ""
  } else {
    bookCover.value.tags.splice(tagIndex, 1);
    saveLibrary();
  }
}

const test = () => console.log("test");
</script>
<template>
  <ion-page>
    <ion-menu side="start" menuId="BookMenu" contentId="BookMenuContent">
      <ion-header>
        <ion-toolbar>
          <ion-title>Modyfikuj</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <IonInput label="Tytuł:" fill="outline" label-placement="stacked" v-model="bookCover.title"
        ></IonInput>
        <div class="ion-margin-top textFieldWithButton">
          <!--          todo: add new tag-->
        </div>
        <div class="ion-margin-top hashtagChips">
          <div v-for="tag in tags" @click="toggleTag(tag)">
            <ion-chip :outline="true" :disabled="!bookCover.tags.includes(tag)">#{{ tag }}</ion-chip>
          </div>
        </div>
      </ion-content>
    </ion-menu>
    <ion-router-outlet id="BookMenuContent"></ion-router-outlet>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ bookCover.title }}</ion-title>
        <ion-buttons slot="end">
          <ion-menu-toggle menu="BookMenu" :auto-hide="false">
            <ion-button>
              <ion-icon :icon="menuOutline" slot="icon-only"></ion-icon>
            </ion-button>
          </ion-menu-toggle>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button size="small">
          <ion-icon :icon="addCircleOutline"></ion-icon>
        </ion-fab-button>
        <ion-fab-list side="top">
          <ion-fab-button @click="addPage('Text')">
            <ion-icon :icon="languageOutline"></ion-icon>
          </ion-fab-button>
          <ion-fab-button @click="addPage('Score')">
            <ion-icon :icon="musicalNoteOutline"></ion-icon>
          </ion-fab-button>
          <ion-fab-button @click="addPage('Audio')">
            <ion-icon :icon="micOutline"></ion-icon>
          </ion-fab-button>
          <ion-fab-button @click="addPage('Photo')">
            <ion-icon :icon="imageOutline"></ion-icon>
          </ion-fab-button>
        </ion-fab-list>
      </ion-fab>
      <Sortable :list="bookPages" item-key="id" :options="{
        handle: '.handle',
        draggable: '.element',
      }" @end="(event: SortableJs.SortableEvent) => { swapPage(event.oldIndex, event.newIndex) }">
        <template #item="{ element }">
          <BookVPage :page="element" :editable="isWorkshopModalOpen" @set-hidden="hidePage(element?.id)"
                     @mod-page="openWorkshopModal(element)" @rem-page="remPage(element?.id)">
            <component :is="'BookPage' + element?.type" :pageId="element?.id" :data="element?.data"></component>
          </BookVPage>
        </template>
      </Sortable>
      <ion-modal ref="modal" :initial-breakpoint="0.5" :breakpoints="[0, 0.25, 0.5, 0.95]" :backdropDismiss="false"
                 :is-open="isWorkshopModalOpen" :onDidDismiss="closeWorkshopModal" :backdropBreakpoint="0.5">
        <ion-header>
          <ion-toolbar>
            <ion-title>
              <ion-input v-model="workshopPage.name"></ion-input>
            </ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <component :is="'BookWorkshop' + workshopPage.type" :saveProgress="savePages"
                     v-model:pageData="workshopPage.data"></component>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<style scoped>

ion-fab-button {
  --border-radius: 15px;
  --box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3),
  0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  --color: white;
}

.input-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

ion-menu {
  --min-width: 90%;
}
</style>
