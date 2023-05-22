<template>
    <div id="container">
        <ion-card>
            <ion-card-header>
                <div class="input-container">
                    <ion-card-title>
                        <ion-input placeholder="Nuty" id="title"></ion-input>
                    </ion-card-title>
                    
                    <ion-button v-if="viewType == ResourceState.Default" fill="clear" size="small" shape="round" @click="changeView('removal')">
                        <ion-icon slot="icon-only" :icon="trashBinOutline"></ion-icon>
                    </ion-button>
                    <ion-button v-if="viewType != ResourceState.Hidden" fill="clear" size="small" shape="round"  @click="changeView('editing')">
                        <ion-icon slot="icon-only" :icon="createOutline"></ion-icon>
                    </ion-button>
                    <ion-button v-if="viewType !=  ResourceState.Edited" fill="clear" size="small" shape="round" @click="changeView('visibility')">
                        <ion-icon slot="icon-only" :icon="eyeOutline"></ion-icon>
                    </ion-button>
                </div>
            </ion-card-header>

            <ion-card-content v-if="viewType != ResourceState.Hidden">
                <ion-item v-if="viewType == ResourceState.Edited">
                    <ion-textarea :auto-grow="true" v-model="text"></ion-textarea>
                </ion-item>
                <div v-else>
                    <div v-show="false">{{ ABCJS.renderAbc('notation', text, { scale: 0.5, responsive: "resize", staffwidth: 300, wrap: { minSpacing: 1.8, maxSpacing: 2.7, preferredMeasuresPerLine: 2 } }) }}</div>
                    <div id="notation"></div>
                </div>
                
            </ion-card-content>

        </ion-card>
    </div>
  </template>
  
<script setup lang="ts">
import TextResourceDraggable from './TextResourceDraggable.vue';
    import {IonButton, IonInput, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonTextarea} from '@ionic/vue';
    import {trashBinOutline, eyeOutline, createOutline} from 'ionicons/icons';
    import { ref, computed, watch } from 'vue';
    import { Sortable } from "sortablejs-vue3";
    import ABCJS from "abcjs";
    const emit = defineEmits(['delResource'])
    const props = defineProps({
        content: String,
    })
    const text = ref((props.content ? props.content : ""))

    enum ResourceState {
        Default,
        Hidden,
        Edited,
        Removed,
    }
    const viewType = ref(ResourceState.Default);


    function changeView(state: string) {
        switch (state) {
            case "visibility":
            viewType.value = (viewType.value == 0) ? ResourceState.Hidden : ResourceState.Default ;
            break;
            case "editing":
            viewType.value = (viewType.value == 0) ? ResourceState.Edited : ResourceState.Default ;
            break;
            case "removal":
            viewType.value = ResourceState.Removed;
            emit('delResource');
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