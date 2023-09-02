<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>
        <!--        todo -->
        <ion-input :value="props.page.name"></ion-input>
      </ion-title>
      <ion-buttons slot="end">
        <ion-button @click="emit('savePage', props.page
				)">zapisz
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <slot></slot>
  </ion-content>
</template>

<script setup lang="ts">
import {IonButton, IonButtons, IonContent, IonHeader, IonInput, IonTitle, IonToolbar,} from "@ionic/vue";
import {PropType} from "vue";
import {Page} from "@/model/Page";

const props = defineProps({
  page: {
    type: Object as PropType<Page>,
    required: true,
  },
});

const emit = defineEmits(["savePage"]);
</script>
