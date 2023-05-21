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
        <TextResource/>
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

import { Ref } from 'vue';

interface Resource {
  id: number;
  type?: string;
  content?: object;
}

let resources: Ref<Resource[]> = ref([]);
let id: number = 1;

function addResource(type: string) {
  switch (type) {
    case "text":
      resources.value.push({ id: id++, type: "text", content: {}});
      break;
  }
}
</script>
