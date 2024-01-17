<script setup lang="ts">
import {IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonIcon} from "@ionic/vue";
import CenteringGrid from "@/components/CenteringGrid.vue";
import InlineElements from "@/components/InlineElements.vue";
import {chevronForwardOutline, closeCircleOutline} from "ionicons/icons";
import {PropType} from "vue";
import {Book} from "@/model/Book";
import {Semaphore} from "@/utils/Semaphore";
import {useImpact} from "@/composables/UseImpact";
import {useBookService} from "@/service/BookService";
import {useLibraryService} from "@/service/LibraryService";

const props = defineProps({
  book: {
    type: Object as PropType<Book>,
    required: true,
  }
})
const emit = defineEmits(["openBook"])

const semaphore = new Semaphore();
const libraryService = useLibraryService();

function renderDate(date: Date): string {
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth() + 1;
  return `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month}`;
}

function removeBook() {
  semaphore.closeSemaphore();
  useImpact();
  libraryService.removeBook(props.book as Book);
}

async function openBook() {
  await semaphore.execute(() => {
    emit("openBook");
  })
}
</script>

<template>
  <ion-card @click="openBook">
    <centering-grid v-if="book.cover.length > 0">
      <img :src="book.cover" alt="cover photo">
    </centering-grid>
    <ion-card-content>
      <ion-card-subtitle>{{ renderDate(book.modificationDate) }}</ion-card-subtitle>
      <inline-elements>
        <ion-card-title>{{ book.title }}</ion-card-title>
        <div>
          <ion-button
              fill="clear"
              size="small"
              shape="round"
              @click="removeBook()"
          >
            <ion-icon slot="icon-only" :icon="closeCircleOutline"></ion-icon>
          </ion-button>
          <ion-button
              fill="clear"
              size="small"
              shape="round"
          >
            <ion-icon slot="icon-only" :icon="chevronForwardOutline"></ion-icon>
          </ion-button>
        </div>
      </inline-elements>
      <ion-card-subtitle v-if="book.tags.length > 0">{{
          "#" + book.tags.join(" #")
        }}
      </ion-card-subtitle>
    </ion-card-content>
  </ion-card>
</template>

<style scoped>
img {
  object-fit: cover;
}

ion-card-title {
  --color: #ebdbb2;
}

ion-card-subtitle {
  --color: #a89984;
}
</style>