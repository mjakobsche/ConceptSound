<script setup lang="ts">
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuToggle,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/vue";
import BookAddPage from "@/components/BookAddPage.vue";
import BookVPage from "@/components/BookVPage.vue";
import {
  addPage,
  addTag,
  bookCover,
  bookPages,
  hidePage,
  remPage,
  remTag,
  savePages,
  swapPage,
} from "@/service/BookService";
import {tags} from "@/service/LibraryService";
import SortableJs from "sortablejs";
import {Sortable} from "sortablejs-vue3";
import BookVWorkshop from "@/components/BookVWorkshop.vue";
import {ref, Ref} from "vue";
import {BookPage} from "@/model/BookPage";
import BookMenuContents from "@/components/BookMenuContents.vue";
import {menuOutline} from "ionicons/icons";

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

</script>
<template>
  <ion-page>
    <BookMenuContents v-model:book-title="bookCover.title" v-model:book-tags="bookCover.tags"
                      :tags="tags" @rem-tag="(tagName) => remTag(tagName)"
                      @add-tag="(tagName) => addTag(tagName)"></BookMenuContents>
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
      <BookAddPage @add-page="(type) => addPage(type)"/>
      <Sortable :list="bookPages" item-key="id" :options="{
        handle: '.handle',
        draggable: '.element',
      }" @end="(event: SortableJs.SortableEvent) => { swapPage(event.oldIndex, event.newIndex) }">
        <template #item="{ element }">
          <BookVPage :page="element" :editable="isWorkshopModalOpen" @set-hidden="hidePage(element?.id)"
                     @mod-page="openWorkshopModal(element)" @rem-page="remPage(element?.id)">
            <component :is="'BookPage' + element?.type" :data="element?.data"></component>
          </BookVPage>
        </template>
      </Sortable>
      <ion-modal ref="modal" :initial-breakpoint="0.5" :breakpoints="[0, 0.25, 0.5, 0.95]" :backdropDismiss="false"
                 :is-open="isWorkshopModalOpen" :onDidDismiss="closeWorkshopModal" :backdropBreakpoint="0.5">
        <BookVWorkshop v-model:pageName="workshopPage.name">
          <component :is="'BookWorkshop' + workshopPage.type" :saveProgress="savePages" v-model:pageData="workshopPage.data"></component>
        </BookVWorkshop>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>
