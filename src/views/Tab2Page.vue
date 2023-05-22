<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Utwór</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 2</ion-title>
        </ion-toolbar>
      </ion-header>

      <div v-for="resource in resources">
        <TextResource v-if="resource.type == 'text'" @del-resource="() => removeResource(resource.id)" :content="resource.content"/>
        <NoteResource v-if="resource.type == 'note'" @del-resource="() => removeResource(resource.id)" :content="resource.content"/>  
      </div>
      <AddButton @new-resource="(type) => addResource(type)"/>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import {
  IonPage,
  IonHeader,
  IonFab,
  IonFabButton,
  IonIcon,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/vue';
import AddButton from '@/components/AddButton.vue';
import TextResource from '@/components/TextResource.vue';
import NoteResource from '@/components/NoteResource.vue';

import { Ref } from 'vue';


interface Resource {
  id: number;
  type: string;
  content: string;
}
let resources: Ref<Resource[]> = ref([]);
let id: number = 1;
let text: string = "Hej, hej, hej sokoły//żywo, skocznie\nOmijajcie góry, lasy, pola, doły\nDzwoń, dzwoń, dzwoń dzwoneczku\nMój stepowy skowroneczku\nHej, hej, hej sokoły\nOmijajcie góry, lasy, pola, doły\nDzwoń, dzwoń, dzwoń dzwoneczku\nMój stepowy, \ndzwoń, dzwoń, dzwoń //znacznie wolniej "
let note: string = "X:1\nK:D\nDD AA|BBA2|DD AA|BBA2||\n";
function addResource(type: string) {
  switch (type) {
    case "text":
      resources.value.push({ id: id++,  type: "text", content: text});
      break;
    case "note":
      resources.value.push({ id: id++,  type: "note", content: note});
      break;
  }
}

function removeResource(id: number){
  console.log(id)
  resources.value = resources.value.filter((t) => t.id !== id)
}
</script>
