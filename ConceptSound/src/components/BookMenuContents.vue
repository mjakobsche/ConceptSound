<template>
  <ion-menu side="start" menuId="BookMenu" contentId="BookMenuContent">
    <ion-header>
      <ion-toolbar>
        <ion-title>Modyfikuj</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-router-outlet id="LibraryMenu"></ion-router-outlet>
      <IonInput label="Tytuł:" fill="outline" :value="bookCover.title"
                @focusout="$emit('update:bookTitle', $event.target.value)"></IonInput>
      <div class="ion-margin-top textFieldWithButton">
        <IonInput label="Dodaj nowy hashtag:" fill="outline" @focusout="toggleTag(tag, !bookCover.tags.includes(tag))"
                  v-model="tag"></IonInput>
      </div>
      <div class="ion-margin-top hashtagChips">
        <div v-for="globalTag in tags" @click="toggleTag(globalTag, !bookCover.tags.includes(globalTag))">
          <ion-chip :outline="true" :disabled="!bookCover.tags.includes(globalTag)">#{{ globalTag }}</ion-chip>
        </div>
      </div>
    </ion-content>
  </ion-menu>
  <ion-router-outlet id="BookMenuContent"></ion-router-outlet>
</template>

<script setup lang="ts">
import {IonChip, IonInput, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonRouterOutlet} from "@ionic/vue";
import {ref} from "vue";
import {addTag, bookCover} from "@/service/BookService";

const emits = defineEmits(['update:bookTitle', 'addTag', 'remTag'])
defineProps(['bookTitle', 'bookTags', 'tags', 'name']);
const tag = ref("");

function toggleTag(selectedTag: string, on: boolean) {
  if (selectedTag.length > 0) {
    on ? emits('addTag', selectedTag) : emits('remTag', selectedTag)
    tag.value = ""
  }
}
</script>

<style scoped>
.hashtagChips {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
</style>