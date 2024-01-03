<script setup lang="ts">
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonMenu,
  IonMenuToggle,
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
  imageOutline,
  languageOutline,
  menuOutline,
  micOutline,
  musicalNoteOutline,
  pricetagOutline
} from "ionicons/icons";
import FloatingAddButton from "@/components/FloatingButtonGroup.vue";
import FloatingButton from "@/components/FloatingButton.vue";
import AddAlert from "@/components/AddAlert.vue";
import HashtagChips from "@/components/HashtagChips.vue";
import InlineElements from "@/components/InlineElements.vue";
import Modal from "@/components/Modal.vue";
import HeaderToolbar from "@/components/HeaderToolbar.vue";

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
        <inline-elements>
          <ion-input label="Tytuł:" fill="outline" label-placement="stacked" v-model="bookCover.title"
          ></ion-input>
          <ion-button id="addTag" fill="clear">
            <ion-icon slot="icon-only" :icon="pricetagOutline"></ion-icon>
          </ion-button>
          <add-alert :trigger="'addTag'" @add="(tagName) => addTag(tagName)"></add-alert>
        </inline-elements>
        <hashtag-chips :all-tags="tags" :selected-tags="bookCover.tags"
                       @toggle-tag="(tag) => toggleTag(tag)"></hashtag-chips>
      </ion-content>
    </ion-menu>
    <ion-router-outlet id="BookMenuContent"></ion-router-outlet>
    <ion-header>
      <ion-menu-toggle menu="BookMenu" :auto-hide="false">
      <header-toolbar :title="bookCover.title" @click="">
        <ion-button>
          <ion-icon :icon="menuOutline" slot="icon-only"></ion-icon>
        </ion-button>
      </header-toolbar>
      </ion-menu-toggle>
    </ion-header>
    <ion-content :fullscreen="true">
      <floating-add-button>
        <floating-button @click="addPage('Text')">
          <ion-icon :icon="languageOutline"></ion-icon>
        </floating-button>
        <floating-button>
          <floating-button @click="addPage('Score')">
            <ion-icon :icon="musicalNoteOutline"></ion-icon>
          </floating-button>
        </floating-button>
        <floating-button>
          <floating-button @click="addPage('Audio')">
            <ion-icon :icon="micOutline"></ion-icon>
          </floating-button>
        </floating-button>
        <floating-button>
          <floating-button @click="addPage('Photo')">
            <ion-icon :icon="imageOutline"></ion-icon>
          </floating-button>
        </floating-button>
      </floating-add-button>
      <sortable :list="bookPages" item-key="id" :options="{
        handle: '.handle',
        draggable: '.element',
      }" @end="(event: SortableJs.SortableEvent) => { swapPage(event.oldIndex, event.newIndex) }">
        <template #item="{ element }">
          <BookVPage :page-name="element?.name" :is-page-visible="!element?.hidden" :is-editable="isWorkshopModalOpen"
                     @change-visibility="hidePage(element?.id)"
                     @edit-page="openWorkshopModal(element)" @remove-page="remPage(element?.id)">
            <component :is="'BookPage' + element?.type" :pageId="element?.id" :pageData="element?.data"></component>
          </BookVPage>
        </template>
      </sortable>
      <modal :is-open="isWorkshopModalOpen" :on-dismiss="closeWorkshopModal">
        <ion-header>
          <ion-toolbar>
            <ion-title>
              <ion-input v-model="workshopPage.name"></ion-input>
            </ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <component :is="'BookWorkshop' + workshopPage.type" :save-progress="savePages"
                     v-model:page-data="workshopPage.data"></component>
        </ion-content>
      </modal>
    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-menu {
  --min-width: 100%;
}
</style>