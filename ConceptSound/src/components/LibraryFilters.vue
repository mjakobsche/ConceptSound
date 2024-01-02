<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Filtruj</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <IonInput label="Tytuł:" fill="outline" :value="bookTitle"
              @input="$emit('update:bookTitle', $event.target.value)"></IonInput>
    <div class="hashtagChips ion-margin-top">
      <div v-for="globalTag in globalTags" @click="toggleTag(globalTag)">
        <ion-chip :outline="true" :disabled="!bookTags.includes(globalTag)">#{{ globalTag }}</ion-chip>
      </div>
    </div>
  </ion-content>
</template>

<script setup lang="ts">
import {IonChip, IonInput, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/vue";

defineEmits(['update:bookTitle', 'update:bookTags'])
const props = defineProps(['bookTitle', 'bookTags', 'globalTags', 'name']);

function toggleTag(tag: string) {
  if (props.bookTags.includes(tag)) {
    props.bookTags.splice(props.bookTags.indexOf(tag), 1);
  } else {
    props.bookTags.push(tag);
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