<script setup lang="ts">

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonTitle,
  IonToolbar
} from "@ionic/vue";
import {checkmarkOutline} from "ionicons/icons";

defineProps(["name"]);
</script>

<template>
  <ion-menu side="end" contentId="menuContent">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ name }}</ion-title>
        <ion-buttons slot="end">
          <ion-menu-toggle :auto-hide="false">
            <ion-button>
              <ion-icon :icon="checkmarkOutline" slot="icon-only"></ion-icon>
            </ion-button>
          </ion-menu-toggle>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <slot>
      </slot>
    </ion-content>
  </ion-menu>
  <ion-router-outlet id="menuContent"></ion-router-outlet>
</template>

<style scoped>

ion-menu {
  --min-width: 100%;
}
</style>