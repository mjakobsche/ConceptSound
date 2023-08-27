<template>
  <ion-fab vertical="bottom" horizontal="end" slot="fixed">
    <ion-fab-button size="small">
      <ion-icon :icon="addCircleOutline"></ion-icon>
    </ion-fab-button>
    <ion-fab-list side="top">
      <ion-fab-button
          id="addBook"
          @click="mode = 'book';"
      >
        <ion-icon :icon="bookOutline"></ion-icon>
      </ion-fab-button>
    </ion-fab-list>
  </ion-fab>
  <ion-alert trigger="addBook" :inputs="alertInputs" :buttons="alertButtons">
  </ion-alert>
</template>

<script setup lang="ts">
import {addCircleOutline, bookOutline} from "ionicons/icons";
import {IonAlert, IonFab, IonFabButton, IonFabList, IonIcon,} from "@ionic/vue";

const emit = defineEmits(["addBook"]);

let mode: "book" | "tag";
const alertInputs = [{name: "value", placeholder: "Nazwa"}];
const alertButtons = [
  {
    text: "Anuluj",
    handler: (data: { value: string }) => {
      data.value = "";
    },
  },
  {
    text: "Dodaj",
    handler: (data: { value: string }) => {
      const title = data.value;
      if (title.length != 0) {
        emit("addBook", title);
      }
    },
  },
];
</script>

<style scoped>
ion-fab-button {
  --border-radius: 15px;
  --box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3),
  0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  --color: white;
}
</style>
