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

let isPressed = false;
let pressStartTime: number;
const LONG_PRESS_THRESHOLD: number = 500;

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
  isPressed = true;
  pressStartTime = Date.now();
  setTimeout(impact, LONG_PRESS_THRESHOLD);
};

const onEnd = () => {
  if (Date.now() - pressStartTime < LONG_PRESS_THRESHOLD) {
    emit("changeVisibility");
  } else {
    emit('removePage');
  }
  isPressed = false;
}

const impact = async () => {
  if(isPressed){
    await Haptics.impact({ style: ImpactStyle.Medium });
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