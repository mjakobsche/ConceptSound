<script setup lang="ts">
import {
  IonButton,
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
import {useStoreService} from "@/service/StoreService";
import {storeToRefs} from "pinia";

const store = useStoreService();
const {library, tags} = storeToRefs(store);
store.prepareLibrary();

const isFilterModalOpen: Ref<boolean> = ref(false);
const openFilterModal = () => isFilterModalOpen.value = true;
const closeFilterModal = () => isFilterModalOpen.value = false;

const titleFilter: Ref<string> = ref("");
const tagFilter: Ref<string[]> = ref([]);

const filteredLibrary = computed(() => {
  return store.library.filter((bookCover: BookCover) => matchesFilter(bookCover));
});

function matchesFilter(bookCover: BookCover): boolean {
  return bookCover.title.toLowerCase().indexOf(titleFilter.value) != -1 && tagFilter.value.every((tag) => bookCover.tags.includes(tag));
}

function enableTag(tag: string) {
  tagFilter.value.push(tag);
}

function disableTag(tag: string) {
  tagFilter.value.splice(tagFilter.value.indexOf(tag), 1);
}

function renderDate(date: Date): string {
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth() + 1;

  return `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month}`;
}

function addBook(title: string) {
  library.value.unshift(new BookCover(title));
  store.saveLibrary();
}

function removeBook(id: string) {
  library.value.splice(library.value.findIndex((bookCover: BookCover) => bookCover.id === id), 1)
  store.saveLibrary();
}

function openBook(book) {
  closeFilterModal();
  router.push("/book").then(() => store.prepareBook(book))
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
            <ion-card-subtitle>{{ renderDate(bookCover.lastUsed) }}</ion-card-subtitle>
            <inline-elements>
              <ion-card-title>{{ bookCover.title }}</ion-card-title>
              <div>
                <ion-button
                    fill="clear"
                    size="small"
                    shape="round"
                    @click="removeBook(bookCover.id)"
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
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <IonInput label="Tytuł:" fill="outline" v-model="titleFilter"></IonInput>
          <hashtag-chips :all-tags="tags" :selected-tags="tagFilter"
                         @enable-tag="(tag) => enableTag(tag)" @disable-tag="(tag) => disableTag(tag)"></hashtag-chips>
        </ion-content>
      </modal>
    </ion-content>
  </ion-page>
</template>