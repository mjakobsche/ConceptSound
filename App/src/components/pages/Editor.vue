<script setup lang="ts">
import {IonContent, IonHeader, IonInput, IonTitle, IonToolbar} from "@ionic/vue";
import {usePageService} from "@/service/PageService";

const pageService = usePageService();
</script>

<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>
        <ion-input placeholder="Nazwa" maxlength="12" autocapitalize="characters"
                   v-bind:value="pageService.editedPage.name"
                   @focusout="pageService.setPageName($event.target.value)"></ion-input>
      </ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <slot></slot>
  </ion-content>
</template>
