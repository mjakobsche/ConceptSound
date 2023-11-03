<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ book.cover.title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <BookAddPage @add-page="(type) => addPage(type)" />
      <Sortable :list="book.pages" item-key="id" :options="{
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
import { IonContent, IonHeader, IonModal, IonPage, IonTitle, IonToolbar, } from "@ionic/vue";
import BookAddPage from "@/components/BookAddPage.vue";
import BookVPage from "@/components/BookVPage.vue";
import { addPage, book, hidePage, modPage, remPage, swapPage, } from "@/service/BookService";
import SortableJs from "sortablejs";
import { Sortable } from "sortablejs-vue3";
import BookVWorkshop from "@/components/BookVWorkshop.vue";
import { ref, Ref } from "vue";
import { Page } from "@/model/Page";

const workshopIsOpen = ref(false);
const workshopPage: Ref<Page> = ref(book.value.pages[0]);

function openWorkshop(page: Page) {
  workshopPage.value = page;
  workshopIsOpen.value = true;
}

function closeWorkshop() {
  workshopIsOpen.value = false;
  modPage(workshopPage.value)
}
</script>
