<script setup lang="ts">
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonMenu,
  IonRouterOutlet,
  IonTitle,
  IonToolbar
} from "@ionic/vue";
import CenteringGrid from "@/components/CenteringGrid.vue";
import {imageOutline, pricetagOutline} from "ionicons/icons";
import InlineElements from "@/components/InlineElements.vue";
import AddAlert from "@/components/AddAlert.vue";
import HashtagChips from "@/components/books/HashtagChips.vue";
import {useBookService} from "@/service/BookService";
import {pickImages} from "@/utils/PickImages";

const store = useBookService();

async function setCoverImage() {
  await store.setBookCover("");
  await store.setBookCover(await pickImages());
}

const hasCover = () => store.book.cover.length > 0;
</script>

<template>
  <ion-menu side="start" menuId="BookMenu" contentId="BookMenuContent">
    <ion-header>
      <ion-toolbar>
        <ion-title>Modyfikuj okładkę</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div @click="setCoverImage">
        <centering-grid>
          <img v-if="hasCover()" :src="store.book.cover" alt="Book cover photo">
          <ion-button v-else size="large" shape="round" fill="clear">
            <ion-icon slot="icon-only" :icon="imageOutline"></ion-icon>
          </ion-button>
        </centering-grid>
      </div>
      <inline-elements class="ion-margin-top">
        <ion-input label="Tytuł:" mode="md" fill="outline" label-placement="stacked" maxlength="50" v-model="store.book.title"
                   @focusout="store.setBookTitle($event.target.value)"></ion-input>
        <ion-button class="ion-margin-start" shape="round" id="addTag" fill="clear">
          <ion-icon slot="icon-only" :icon="pricetagOutline"></ion-icon>
        </ion-button>
        <add-alert :trigger="'addTag'" @add="(tagName) => store.addTag(tagName)"></add-alert>
      </inline-elements>
      <hashtag-chips :selected-tags="store.book.tags"
                     @enable-tag="(tag) => store.addTag(tag)"
                     @disable-tag="(tag) => store.removeTag(tag)"></hashtag-chips>
    </ion-content>
  </ion-menu>
  <ion-router-outlet id="BookMenuContent"></ion-router-outlet>
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