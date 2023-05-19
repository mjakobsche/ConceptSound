<template>
    <div id="container">
        <ion-card>
            <ion-card-header>
                <ion-card-title><ion-input placeholder="Tekst" id="title"></ion-input></ion-card-title>
            </ion-card-header>

            <ion-card-content>
                <ion-item>
                    <ion-textarea :auto-grow="true"></ion-textarea>
                </ion-item>
            </ion-card-content>
        </ion-card>
    </div>
  </template>
  
<script setup lang="ts">
    import {IonInput, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonTextarea} from '@ionic/vue';
</script>

<style scoped>
</style>