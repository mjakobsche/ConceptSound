<template>
  <suspense>
    <ion-app>
      <ion-router-outlet />
    </ion-app>
  </suspense>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { getCurrentInstance } from 'vue';
import { useSQLite } from 'vue-sqlite-hook';
const app = getCurrentInstance();
if (app != null) { 
  app.appContext.config.globalProperties.$sqlite = useSQLite();
}
</script>
