<template>
  <div v-for="resource in resources">
    <TextResource/>
  </div>
  <ion-fab vertical="bottom" horizontal="end" slot="fixed">
    <ion-fab-button size="small">
      <ion-icon :icon="addCircleOutline"></ion-icon>
    </ion-fab-button>

    <ion-fab-list side="start">
      <ion-fab-button @click="addResource('text')">
        <ion-icon :icon="languageOutline"></ion-icon>
      </ion-fab-button>
      <ion-fab-button>
        <ion-icon :icon="micOutline"></ion-icon>
      </ion-fab-button>
      <ion-fab-button>
        <ion-icon :icon="musicalNoteOutline"></ion-icon>
      </ion-fab-button>
      <ion-fab-button>
        <ion-icon :icon="documentOutline"></ion-icon>
      </ion-fab-button>
      <ion-fab-button>
        <ion-icon :icon="imageOutline"></ion-icon>
      </ion-fab-button>
    </ion-fab-list>
  </ion-fab>
</template>

<script setup lang="ts">
import { IonButton, IonIcon,IonFab, IonFabButton, IonFabList} from '@ionic/vue';
import { addCircleOutline, languageOutline, micOutline, musicalNoteOutline, documentOutline, imageOutline} from 'ionicons/icons';
import { ref, reactive } from 'vue'
import TextResource from '@/components/TextResource.vue';

let id = 0
let resources = ref([{}]);

function addResource(type: string) {
  switch (type){
    case "text": resources.value.push({ id: id++}); break;
  }
  
} 

</script>

<style scoped>
  ion-fab-button {
    --border-radius: 15px;
    --box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
    --color: black;
  }
</style>