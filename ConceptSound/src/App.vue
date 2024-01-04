<template>
  <suspense>
    <ion-app>
      <IonRouterOutlet></IonRouterOutlet>
    </ion-app>
  </suspense>
</template>

<script setup lang="ts">
import {IonApp, IonRouterOutlet, useBackButton, useIonRouter} from "@ionic/vue";
import {App} from "@capacitor/app";

const router = useIonRouter();
useBackButton(-1, () => {
  if (!router.canGoBack()) {
    App.exitApp();
  }
});
</script>