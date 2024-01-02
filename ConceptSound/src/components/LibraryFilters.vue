<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Filtruj</ion-title>
      <slot></slot>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <IonInput label="Tytuł:" fill="outline" :value="titleFilter"
              @input="$emit('update:titleFilter', $event.target.value)"></IonInput>
    <div class="hashtagChips ion-margin-top">
      <div v-for="tag in tags" @click="toggleTag(tag)">
        <ion-chip :outline="true" :disabled="!tagFilter.includes(tag)">#{{ tag }}</ion-chip>
      </div>
    </div>
  </ion-content>
</template>

<script setup lang="ts">
import {IonChip, IonInput, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/vue";

defineEmits(['update:titleFilter'])
const props = defineProps(['titleFilter', 'tagFilter', 'tags', 'name']);

function toggleTag(tag: string) {
  if (props.tagFilter.includes(tag)) {
    props.tagFilter.splice(props.tagFilter.indexOf(tag), 1);
  } else {
    props.tagFilter.push(tag);
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