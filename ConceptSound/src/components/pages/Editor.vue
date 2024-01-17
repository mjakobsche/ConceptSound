<script setup lang="ts">
import {IonHeader, IonToolbar, IonTitle, IonInput, IonContent} from "@ionic/vue";
import {useBookService} from "@/service/BookService";
const store = useBookService();
</script>

<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>
        <ion-input placeholder="Nazwa" maxlength="12" autocapitalize="characters"
                   v-bind:value="store.editedPage.name"
                   @focusout="store.setPageName($event.target.value)"></ion-input>
      </ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <slot></slot>
  </ion-content>
</template>

<style scoped>

</style>