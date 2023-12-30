<script setup lang="ts">

import {IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonRouterOutlet} from "@ionic/vue";
defineProps(["name"]);
</script>

<template>
  <ion-menu side="end" contentId="menuContent">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{name}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <slot>
      </slot>
    </ion-content>
  </ion-menu>
  <ion-router-outlet id="menuContent"></ion-router-outlet>
</template>