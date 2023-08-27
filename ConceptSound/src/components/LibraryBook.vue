<template>
  <ion-card>
    <IonCardContent>
      <ion-card-subtitle>{{ renderDate(book.date) }}</ion-card-subtitle>
      <div class="bookMainPart">
        <ion-card-title>{{ book.title }}</ion-card-title>
        <div>
          <ion-button
              fill="clear"
              size="small"
              shape="round"
              @click="emit('rem', book.id)"
          >
            <ion-icon slot="icon-only" :icon="closeCircleOutline"></ion-icon>
          </ion-button>
          <ion-button
              fill="clear"
              size="small"
              shape="round"
              @click="emit('set')"
              router-link="/book"
          >
            <ion-icon slot="icon-only" :icon="chevronForwardOutline"></ion-icon>
          </ion-button>
        </div>
      </div>
    </IonCardContent>
  </ion-card>
</template>

<script setup lang="ts">
import {chevronForwardOutline, closeCircleOutline} from "ionicons/icons";
import {IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonIcon} from "@ionic/vue";
import {PropType} from "vue";
import {Cover} from "@/model/Cover";

const emit = defineEmits(["rem", "set"]);
defineProps({
  book: {
    required: true,
    type: Object as PropType<Cover>,
  },
});

function renderDate(date: Date): string {
  const day = date.getDate();
  const month = date.getMonth() + 1;

  return `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month}`;
}
</script>

<style scoped>
.bookMainPart {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
@/data/BookCover @/model/BookCover
