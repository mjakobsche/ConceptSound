<script setup lang="ts">
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuToggle,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/vue";
import PageCard from "@/components/pages/PageCard.vue";
import {Sortable} from "sortablejs-vue3";
import {ref} from "vue";
import {menuOutline} from "ionicons/icons";
import FloatingOuterButton from "@/components/FloatingButton.vue";
import Modal from "@/components/Modal.vue";
import {useBookService} from "@/service/BookService";
import BookMenu from "@/components/books/BookMenu.vue";
import AddPageButtons from "@/components/pages/AddPageButtons.vue";
import Editor from "@/components/pages/Editor.vue";
import {usePageService} from "@/service/PageService";

const bookService = useBookService();
const pageService = usePageService();

const isEditorOpen = ref(false);
const openEditor = () => isEditorOpen.value = true;
const closeEditor = () => isEditorOpen.value = false;

const addPage = (pageType: string) => bookService.addPage(pageType).then(() => openEditor())

</script>
<template>
  <ion-page>
    <book-menu></book-menu>
    <ion-header>
      <ion-menu-toggle menu="BookMenu" :auto-hide="false">
        <ion-toolbar>
          <ion-title @click="closeEditor()">{{ bookService.book.title }}</ion-title>
          <ion-buttons slot="end">
            <ion-button>
              <ion-icon :icon="menuOutline" slot="icon-only"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-menu-toggle>
    </ion-header>
    <ion-content :fullscreen="true">
      <sortable :list="bookService.pages" item-key="id"
                :options="{
                  handle: '.handle',
                  draggable: '.element',
                }"
                @end="(event) => bookService.swapPage(event.oldIndex, event.newIndex)">
        <template #item="{ element }">
          <page-card :page="element" :is-editable="!isEditorOpen" @edit-page="openEditor()">
            <component :is="element?.type + `-page`" :pageId="element?.id" :pageData="element?.content"></component>
          </page-card>
        </template>
      </sortable>
      <floating-outer-button>
        <add-page-buttons @add-page="(pageType) => addPage(pageType)"></add-page-buttons>
      </floating-outer-button>
      <modal :is-open="isEditorOpen" :on-dismiss="closeEditor">
        <editor>
          <component :is="pageService.editedPage.type + '-editor'"
                     @save-changes="(data) => pageService.setPageData(data)"
                     v-bind:page-data="pageService.editedPage.content"></component>
        </editor>
      </modal>
    </ion-content>
  </ion-page>
</template>