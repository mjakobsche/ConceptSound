<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>
        <ion-input :value="pageName" @input="$emit('update:pageName', $event.target.value)"></ion-input>
      </ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <slot></slot>
  </ion-content>
</template>

<script setup lang="ts">
import {IonContent, IonHeader, IonInput, IonTitle, IonToolbar,} from "@ionic/vue";

defineProps(['pageName']);

defineEmits(["savePage", "update:pageName"]);
</script>
