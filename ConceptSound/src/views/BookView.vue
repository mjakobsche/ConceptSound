<script setup lang="ts">
import {
  IonButton,
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
import SortableJs from "sortablejs";
import {Sortable} from "sortablejs-vue3";
import {onMounted, ref, toRaw} from "vue";
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
import CenteringGrid from "@/components/CenteringGrid.vue";
import {getImageFromFilePicker} from "@/composables/ImagePicker";
import {useBookService} from "@/service/BookService";
import {Page} from "@/model/Page";

const store = useBookService();
const isWorkshopModalOpen = ref(false);

const openWorkshopModal = (page) => {
  isWorkshopModalOpen.value = true;
  store.editPage(page)
}

async function setCoverImage() {
  await store.setBookCover("");
  await store.setBookCover(await getImageFromFilePicker());
}

const closeWorkshopModal = () => isWorkshopModalOpen.value = false;

async function toggleVisibility(page: Page){
  store.editPage(page)
  await store.togglePageVisibility();
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
          <ion-input label="Tytuł:" fill="outline" label-placement="stacked" v-model="store.book.title" @input="store.setBookTitle($event.target.value)"></ion-input>
          <ion-button id="addTag" fill="clear">
            <ion-icon slot="icon-only" :icon="pricetagOutline"></ion-icon>
          </ion-button>
          <add-alert :trigger="'addTag'" @add="(tagName) => store.addTag(tagName)"></add-alert>
        </inline-elements>
        <hashtag-chips :all-tags="store.tags" :selected-tags="store.book.tags"
                       @enable-tag="(tag) => store.addTag(tag)" @disable-tag="(tag) => store.removeTag(tag)"></hashtag-chips>
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
      <floating-add-button>
        <floating-button @click="store.addPage('Text')">
          <ion-icon :icon="languageOutline"></ion-icon>
        </floating-button>
        <floating-button>
          <floating-button @click="store.addPage('Score')">
            <ion-icon :icon="musicalNoteOutline"></ion-icon>
          </floating-button>
        </floating-button>
        <floating-button>
          <floating-button @click="store.addPage('Audio')">
            <ion-icon :icon="micOutline"></ion-icon>
          </floating-button>
        </floating-button>
        <floating-button>
          <floating-button @click="store.addPage('Photo')">
            <ion-icon :icon="imageOutline"></ion-icon>
          </floating-button>
        </floating-button>
      </floating-add-button>
      <sortable :list="store.pages" item-key="id" :options="{
        handle: '.handle',
        draggable: '.element',
      }" @end="(event: SortableJs.SortableEvent) => { store.swapPage(event.oldIndex, event.newIndex) }">
        <template #item="{ element }">
          <BookVPage :page-name="element?.name" :is-page-visible="!element?.hidden" :is-editable="isWorkshopModalOpen"
                     @change-visibility="toggleVisibility(element)"
                     @edit-page="openWorkshopModal(element)" @remove-page="store.removePage(element)">
            <component :is="'BookPage' + element?.type" :pageId="element?.id" :pageData="element?.data"></component>
          </BookVPage>
        </template>
      </sortable>
      <modal :is-open="isWorkshopModalOpen" :on-dismiss="closeWorkshopModal">
                <ion-header>
                  <ion-toolbar>
                    <ion-title>
                      <ion-input v-bind:value="store.editedPage.name" @input="store.setPageName($event.target.value)"></ion-input>
                    </ion-title>
                  </ion-toolbar>
                </ion-header>
                <ion-content class="ion-padding">
                  <component :is="'BookWorkshop' + store.editedPage.type" @save-changes="(data) => store.setPageData(data)"
                             v-bind:page-data="store.editedPage.data"></component>
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