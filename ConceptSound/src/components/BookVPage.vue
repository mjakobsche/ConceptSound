<script setup lang="ts">
import {createGesture, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon,} from "@ionic/vue";
import {onMounted, ref} from "vue";
import {addOutline, eyeOutline} from "ionicons/icons";
import InlineElements from "@/components/InlineElements.vue";
import {Haptics, ImpactStyle} from "@capacitor/haptics";

defineProps({
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

let pressStarted = 0;
const LONG_PRESS_THRESHOLD = 500;

const hidden = ref();
onMounted(() => {
  const gesture = createGesture({
    el: hidden.value.$el,
    threshold: 0,
    onStart,
    onEnd,
    gestureName: "long-press",
  });
  gesture.enable();
});

const onStart = () => {
  pressStarted = Date.now();
};

const onEnd = () => {
  if (Date.now() - pressStarted > LONG_PRESS_THRESHOLD) {
    Haptics.impact({ style: ImpactStyle.Medium }).then(() => emit('removePage'));
  } else {
    emit("changeVisibility")
  }
}

</script>

<template>
  <div id="container" class="element">
    <ion-card>
      <ion-card-header class="handle">
        <inline-elements>
          <ion-card-title>
            {{ pageName }}
          </ion-card-title>
          <div>
            <ion-button fill="clear" size="small" shape="round" @click="emit('editPage')" :disabled="isEditable">
              <ion-icon slot="icon-only" :icon="addOutline"></ion-icon>
            </ion-button>
            <ion-button fill="clear" size="small" shape="round" ref="hidden">
              <ion-icon slot="icon-only" :icon="eyeOutline"></ion-icon>
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