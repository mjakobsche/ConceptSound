<script setup lang="ts">
import {
  IonButton,
  IonContent,
  IonFabList,
  IonHeader,
  IonIcon,
  IonInput,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  useBackButton
} from "@ionic/vue";
import BookVPage from "@/components/BookVPage.vue";
import SortableJs from "sortablejs";
import {Sortable} from "sortablejs-vue3";
import {ref} from "vue";
import {
  imageOutline,
  languageOutline,
  menuOutline,
  micOutline,
  musicalNoteOutline,
  pricetagOutline
} from "ionicons/icons";
import FloatingOuterButton from "@/components/FloatingOuterButton.vue";
import FloatingInnerButton from "@/components/FloatingInnerButton.vue";
import AddAlert from "@/components/AddAlert.vue";
import HashtagChips from "@/components/HashtagChips.vue";
import InlineElements from "@/components/InlineElements.vue";
import Modal from "@/components/Modal.vue";
import HeaderToolbar from "@/components/HeaderToolbar.vue";
import CenteringGrid from "@/components/CenteringGrid.vue";
import {useImagePicker} from "@/composables/UseImagePicker";
import {useBookService} from "@/service/BookService";
import {Page} from "@/model/Page";
import router from "@/views/Router";

useBackButton(1, () => {
  if (isWorkshopModalOpen.value) {
    isWorkshopModalOpen.value = false;
  }
  router.back();
});

const store = useBookService();
const isWorkshopModalOpen = ref(false);
const openWorkshopModal = (page) => {
  isWorkshopModalOpen.value = true;
  store.editPage(page)
}

async function setCoverImage() {
  await store.setBookCover("");
  await store.setBookCover(await useImagePicker());
}

const closeWorkshopModal = () => isWorkshopModalOpen.value = false;

async function toggleVisibility(page: Page) {
  store.editPage(page)
  await store.togglePageVisibility();
}

function addPage(type: string) {
  store.addPage(type).then(() => {
    openWorkshopModal(store.pages[0])
  });
}

</script>
<template>
  <ion-page>
    <ion-menu side="start" menuId="BookMenu" contentId="BookMenuContent">
      <ion-header>
        <ion-toolbar>
          <ion-title>Modyfikuj okładkę</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <div>
          <centering-grid>
            <img v-if="store.book.cover.length > 0" @click="setCoverImage" :src="store.book.cover" alt="cover photo">
            <ion-button v-else size="large" shape="round" fill="clear" @click="setCoverImage">
              <ion-icon slot="icon-only" :icon="imageOutline"></ion-icon>
            </ion-button>
          </centering-grid>
        </div>
        <inline-elements class="ion-margin-top">
          <ion-input label="Tytuł:" fill="outline" label-placement="stacked" v-model="store.book.title"
                     @focusout="store.setBookTitle($event.target.value)"></ion-input>
          <ion-button id="addTag" fill="clear">
            <ion-icon slot="icon-only" :icon="pricetagOutline"></ion-icon>
          </ion-button>
          <add-alert :trigger="'addTag'" @add="(tagName) => store.addTag(tagName)"></add-alert>
        </inline-elements>
        <hashtag-chips :all-tags="store.tags" :selected-tags="store.book.tags"
                       @enable-tag="(tag) => store.addTag(tag)"
                       @disable-tag="(tag) => store.removeTag(tag)"></hashtag-chips>
      </ion-content>
    </ion-menu>
    <ion-router-outlet id="BookMenuContent"></ion-router-outlet>
    <ion-header>
      <ion-menu-toggle menu="BookMenu" :auto-hide="false">
        <header-toolbar :title="store.book.title" @click="closeWorkshopModal">
          <ion-button>
            <ion-icon :icon="menuOutline" slot="icon-only"></ion-icon>
          </ion-button>
        </header-toolbar>
      </ion-menu-toggle>
    </ion-header>
    <ion-content :fullscreen="true">
      <floating-outer-button>
        <ion-fab-list side="top">
          <floating-inner-button @click="addPage('Text')">
            <ion-icon :icon="languageOutline"></ion-icon>
          </floating-inner-button>
          <floating-inner-button @click="addPage('Score')">
            <ion-icon :icon="musicalNoteOutline"></ion-icon>
          </floating-inner-button>
          <floating-inner-button @click="addPage('Audio')">
            <ion-icon :icon="micOutline"></ion-icon>
          </floating-inner-button>
          <floating-inner-button @click="addPage('Photo')">
            <ion-icon :icon="imageOutline"></ion-icon>
          </floating-inner-button>
        </ion-fab-list>
      </floating-outer-button>
      <sortable :list="store.pages" item-key="id" :options="{
        handle: '.handle',
        draggable: '.element',
      }" @end="(event: SortableJs.SortableEvent) => { store.swapPage(event.oldIndex, event.newIndex) }">
        <template #item="{ element }">
          <BookVPage :page-name="element?.name" :is-page-visible="!element?.isVisible"
                     :has-content="element?.content.length != 0" :is-editable="!isWorkshopModalOpen"
                     @change-visibility="toggleVisibility(element)"
                     @edit-page="openWorkshopModal(element)" @remove-page="store.removePage(element)">
            <component :is="'BookPage' + element?.type" :pageId="element?.id" :pageData="element?.content"></component>
          </BookVPage>
        </template>
      </sortable>
      <modal :is-open="isWorkshopModalOpen" :on-dismiss="closeWorkshopModal">
        <ion-header>
          <ion-toolbar>
            <ion-title>
              <ion-input placeholder="Nazwa" maxlength="12" v-bind:value="store.editedPage.name"
                         @focusout="store.setPageName($event.target.value)"></ion-input>
            </ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <component :is="'BookWorkshop' + store.editedPage.type" @save-changes="(data) => store.setPageData(data)"
                     v-bind:page-data="store.editedPage.content"></component>
        </ion-content>
      </modal>
    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-menu {
  --min-width: 100%;
}

img {
  height: 30vmax;
  object-fit: cover;
}
</style>