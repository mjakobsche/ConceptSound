<script setup lang="ts">
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon} from "@ionic/vue";
import {onMounted, ref} from "vue";
import {addOutline, eyeOffOutline, eyeOutline, reorderThreeOutline, reorderTwoOutline} from "ionicons/icons";
import {LongPressGesture} from "@/utils/LongPressGesture";
import {Semaphore} from "@/utils/Semaphore";
import InlineElements from "@/components/InlineElements.vue";

const props = defineProps({
  pageName: {
    type: String,
    required: true,
  },
  isPageVisible: {
    type: Boolean,
    required: true,
  },
  isEditable: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["changeVisibility", "editPage", "removePage"]);

const hidden = ref();
const semaphore = new Semaphore();

onMounted(() => {
  new LongPressGesture(hidden.value.$el,
      () => {
        emit("changeVisibility")
      },
      () => {
        emit("removePage")
      })
});

function editBook() {
  if (props.isEditable && props.isPageVisible) {
    semaphore.execute(() => emit("editPage"))
  }
}

</script>

<template>
  <div id="container" class="element">
    <ion-card>
      <ion-card-header @click="editBook()">
        <inline-elements>
          <ion-card-title>
            <ion-button fill="outline" size="small" shape="round" color="medium" class="handle"
                        @click="semaphore.closeSemaphore()">
              {{ pageName }}
              <ion-icon :slot="pageName.length > 0 ? 'start' : 'icon-only'" :icon="reorderTwoOutline"></ion-icon>
            </ion-button>
          </ion-card-title>
          <div>
            <ion-button fill="clear" size="small" shape="round" ref="hidden" :disabled="!isEditable"
                        @click="semaphore.closeSemaphore()">
              <ion-icon slot="icon-only" :icon="isPageVisible ? eyeOutline : eyeOffOutline"></ion-icon>
            </ion-button>
            <ion-button fill="clear" size="small" shape="round" :disabled="!isEditable">
              <ion-icon slot="icon-only" :icon="addOutline"></ion-icon>
            </ion-button>
          </div>
        </inline-elements>
      </ion-card-header>
      <ion-card-content v-if="isPageVisible">
        <slot></slot>
      </ion-card-content>
    </ion-card>
  </div>
</template>