<template>
  <ion-page>
    <SideMenu :name="'Modyfikuj'">
      <BookMenuContents v-model:book-cover="bookCover" :tags="tags" @rem-tag="(tagName) => remTag(tagName)" @add-tag="(tagName) => addTag(tagName)"></BookMenuContents>
    </SideMenu>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ bookCover.title }}</ion-title>
        <ion-buttons slot="end">
          <ion-menu-button></ion-menu-button>
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
          <BookVPage :page="element" :editable="workshopIsOpen" @set-hidden="hidePage(element.id)"
                     @mod-page="openWorkshop(element)" @rem-page="remPage(element.id)">
            <component :is="'BookPage' + element.type" :data="element.data"></component>
          </BookVPage>
        </template>
      </Sortable>
      <ion-modal ref="modal" :initial-breakpoint="0.5" :breakpoints="[0.25, 0.5, 0.95]" :backdropDismiss="false"
                 :is-open="workshopIsOpen" :backdropBreakpoint="0.5">
        <BookVWorkshop v-model:pageName="workshopPage.name" @save-page="closeWorkshop()">
          <component :is="'BookWorkshop' + workshopPage.type" v-model:pageData="workshopPage.data"></component>
        </BookVWorkshop>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import BookAddPage from "@/components/BookAddPage.vue";
import BookVPage from "@/components/BookVPage.vue";
import {
  addPage,
  addTag,
  bookCover,
  bookPages,
  hidePage,
  modPage,
  remPage,
  remTag,
  swapPage,
} from "@/service/BookService";
import {tags} from "@/service/LibraryService";
import SortableJs from "sortablejs";
import {Sortable} from "sortablejs-vue3";
import BookVWorkshop from "@/components/BookVWorkshop.vue";
import {ref, Ref} from "vue";
import {BookPage} from "@/model/BookPage";
import SideMenu from "@/components/SideMenu.vue";
import BookMenuContents from "@/components/BookMenuContents.vue";

const workshopIsOpen = ref(false);
const workshopPage: Ref<BookPage> = ref(bookPages[0]);

function openWorkshop(page: BookPage) {
  workshopPage.value = page;
  workshopIsOpen.value = true;
}

function closeWorkshop() {
  workshopIsOpen.value = false;
  modPage(workshopPage.value)
}
</script>
