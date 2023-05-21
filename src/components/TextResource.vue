<template>
    <div id="container">
        <ion-card>
            <ion-card-header>
                <div class="input-container">
                    <ion-card-title>
                        <ion-input placeholder="Tekst" id="title"></ion-input>
                    </ion-card-title>
                    
                    <ion-button v-if="viewType != View.Hidden" fill="clear" size="small" shape="round" @click="emit('delResource')">
                        <ion-icon slot="icon-only" :icon="trashBinOutline"></ion-icon>
                    </ion-button>
                    <ion-button v-if="viewType != View.Hidden" fill="clear" size="small" shape="round">
                        <ion-icon slot="icon-only" :icon="createOutline"></ion-icon>
                    </ion-button>
                    <ion-button fill="clear" size="small" shape="round" @click="changeView()">
                        <ion-icon slot="icon-only" :icon="eyeOutline"></ion-icon>
                    </ion-button>
                </div>
            </ion-card-header>

            <ion-card-content v-if="viewType != View.Hidden">
                <ion-item>
                    <ion-textarea :auto-grow="true"></ion-textarea>
                </ion-item>
            </ion-card-content>

        </ion-card>
    </div>
  </template>
  
<script setup lang="ts">
    import {IonButton, IonInput, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonTextarea} from '@ionic/vue';
    import {trashBinOutline, eyeOutline, createOutline} from 'ionicons/icons';
    import { ref } from 'vue';
    const emit = defineEmits(['delResource'])
    
    enum View {
        Hidden,
        ContentOnly,
        Full
    }

    const viewType = ref(View.ContentOnly);

    function changeView() {
        switch (viewType.value) {
            case View.ContentOnly:
            viewType.value = View.Hidden;
            break;
            default:
            viewType.value = View.ContentOnly;
            break;
        }
    }
</script>

<style scoped>

.input-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>